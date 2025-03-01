import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-grpc';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { Resource } from '@opentelemetry/resources';
import { SimpleLogRecordProcessor } from '@opentelemetry/sdk-logs';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { msname } from '../config/app/banner';

const collectorHost = process.env.OTEL_EXPORTER_OTLP_HOST || 'otel-collector';
const collectorPort = process.env.OTEL_EXPORTER_OTLP_PORT || '4317';
const collectorEndpoint = `http://${collectorHost}:${collectorPort}`;

// 📌 Habilita logs internos de OpenTelemetry (para debugging)
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.NONE);

// 📌 Configurar el recurso con el nombre correcto del servicio
const resource = new Resource({
  [ATTR_SERVICE_NAME]: msname
});

// 📌 Exportadores para enviar datos al OpenTelemetry Collector
const traceExporter = new OTLPTraceExporter({ url: collectorEndpoint });
const metricExporter = new OTLPMetricExporter({ url: collectorEndpoint });
const logExporter = new OTLPLogExporter({ url: collectorEndpoint });
// const consoleExporter = new ConsoleSpanExporter();

// 📌 Configuración del SDK de OpenTelemetry
const sdk = new NodeSDK({
  resource,
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()],
  logRecordProcessors: [new SimpleLogRecordProcessor(logExporter)],
  metricReader: new PeriodicExportingMetricReader({ exporter: metricExporter }),
  spanProcessors: [new SimpleSpanProcessor(traceExporter)]
});

// 📌 Inicia OpenTelemetry
try {
  sdk.start();
  console.log('✅ OpenTelemetry iniciado');
} catch (error) {
  console.error('❌ Error al iniciar OpenTelemetry:', error);
}

// 📌 Cierra OpenTelemetry cuando la app se apaga
process.on('SIGTERM', async () => {
  await sdk.shutdown();
  console.log('🛑 OpenTelemetry apagado');
});

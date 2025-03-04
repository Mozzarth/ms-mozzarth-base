import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { Resource } from '@opentelemetry/resources';
import { SimpleLogRecordProcessor } from '@opentelemetry/sdk-logs';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { msname } from '../config/app/banner';

const collectorHost = process.env.OTEL_EXPORTER_OTLP_HOST;
const collectorPort = process.env.OTEL_EXPORTER_OTLP_PORT;

const collectorEndpointLog = `http://${collectorHost}:${collectorPort}`;
console.log('🚀 Endpoint del OpenTelemetry Collector:', collectorEndpointLog);

// 📌 Habilita logs internos de OpenTelemetry (para debugging)
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.NONE);

// 📌 Configurar el recurso con el nombre correcto del servicio
const resource = new Resource({
  [ATTR_SERVICE_NAME]: msname
});

// 📌 Exportadores para enviar datos al OpenTelemetry Collector
const consoleExporter = new ConsoleSpanExporter();
const logExporter = new OTLPLogExporter({ url: `${collectorEndpointLog}/v1/logs` });
const traceExporter = new OTLPTraceExporter({ url: `${collectorEndpointLog}/v1/traces` });
const metricExporter = new OTLPMetricExporter({ url: `${collectorEndpointLog}/v1/metrics` });

// 📌 Configuración del SDK de OpenTelemetry
const sdk = new NodeSDK({
  serviceName: msname,
  resource,
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()],
  logRecordProcessors: [new SimpleLogRecordProcessor(logExporter)],
  metricReader: new PeriodicExportingMetricReader({ exporter: metricExporter, exportIntervalMillis: 1000 }),
  spanProcessors: [new SimpleSpanProcessor(traceExporter), new SimpleSpanProcessor(consoleExporter)]
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
  process.exit(0);
});

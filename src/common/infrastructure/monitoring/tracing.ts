import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { MeterProvider, PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { Resource } from '@opentelemetry/resources';
import { SimpleLogRecordProcessor } from '@opentelemetry/sdk-logs';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { msname } from '../config/app/banner';
import { HostMetrics } from '@opentelemetry/host-metrics';

export function initializeOpenTelemetry() {
  const collectorHost = process.env.OTEL_EXPORTER_OTLP_HOST;
  const collectorPort = process.env.OTEL_EXPORTER_OTLP_PORT;

  const collectorEndpointLog = `http://${collectorHost}:${collectorPort}`;

  // 📌 Habilita logs internos de OpenTelemetry (para debugging)
  diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.NONE);

  // 📌 Configurar el recurso con el nombre correcto del servicio
  const resource = new Resource({
    [ATTR_SERVICE_NAME]: msname
  });

  // 📌 Exportadores para enviar datos al OpenTelemetry Collector
  // const consoleExporter = new ConsoleSpanExporter();
  const logExporter = new OTLPLogExporter({ url: `${collectorEndpointLog}/v1/logs` });
  const traceExporter = new OTLPTraceExporter({ url: `${collectorEndpointLog}/v1/traces` });
  const metricExporter = new OTLPMetricExporter({ url: `${collectorEndpointLog}/v1/metrics` });

  // 📌 Configurar el proveedor de métricas
  const meterProvider = new MeterProvider({
    resource,
    readers: [
      new PeriodicExportingMetricReader({
        exporter: metricExporter,
        exportIntervalMillis: 1000
      })
    ]
  });

  // 📌 Habilitar métricas de sistema (CPU, memoria, etc.)
  new HostMetrics({ name: msname, meterProvider }).start();

  // 📌 Configuración del SDK de OpenTelemetry
  const sdk = new NodeSDK({
    serviceName: msname,
    resource,
    traceExporter,
    instrumentations: [getNodeAutoInstrumentations()],
    logRecordProcessors: [new SimpleLogRecordProcessor(logExporter)],
    metricReader: new PeriodicExportingMetricReader({ exporter: metricExporter, exportIntervalMillis: 1000 }),
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
    process.exit(0);
  });
}

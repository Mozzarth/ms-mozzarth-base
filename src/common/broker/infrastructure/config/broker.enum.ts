import { msname } from 'src/common/infrastructure/config/app/banner';

export enum BROKER {
  NAME = msname,
  HEARTBEAT_INTERVAL = 500,
  SERVICE = 'KAFKA_SERVICE',
  CLIENT_ID = `${msname}-client`,
  CONSUMER_GROUP_ID = `${msname}-consumer-group`
}

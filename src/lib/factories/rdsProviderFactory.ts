import { RdsProvider } from '../providers/rdsProvider';

export const createRdsProvider =
  (config, logger): RdsProvider => {
    return new RdsProvider(config, logger);
  };

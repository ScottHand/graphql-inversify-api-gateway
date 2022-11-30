import { Logger } from "../logger/logger";
import { FeatureFlag } from "../lib/interfaces/featureFlag";
import { RESTDataSource } from 'apollo-datasource-rest';
import { exception } from "../lib/decorators/exceptionDecorator";
import { InfrastructureError } from "../lib/errors/infrastructureError";
import { AppConfigProvider } from "../lib/providers/appConfigProvider";
import { inject } from "inversify";
import { TYPE } from "../config";

export class AppConfigService extends RESTDataSource {
  constructor(@inject(TYPE.Logger) private logger: Logger,
              @inject(TYPE.AppConfigProvider) private readonly appConfigProvider: AppConfigProvider) {
    super();
  }

  @exception(InfrastructureError)
  async getConfigurationBooleanValue(keyName: string, defaultValue: boolean = false): Promise<boolean> {
    let result = defaultValue;
    try {
      const valueByKey = await this.getConfigurationValueByKey(keyName);
      if((valueByKey) && (valueByKey.DataType === 'BOOLEAN') && typeof valueByKey.Value === 'boolean') {
        result = valueByKey.Value;
      }
    } catch ( error ) {
      this.logger.error(AppConfigService.name, this.getConfigurationBooleanValue.name, error);
    }
    return result;
  }

  @exception(InfrastructureError)
  async getConfigurationStringValue(keyName: string, defaultValue: string = null): Promise<string> {
    let result = defaultValue;
    try {
      const valueByKey = await this.getConfigurationValueByKey(keyName);
      if((valueByKey) && (valueByKey.DataType === 'STRING') && typeof valueByKey.Value === 'string') {
        result = valueByKey.Value;
      }
    } catch (error) {
      this.logger.error(AppConfigService.name, this.getConfigurationStringValue.name, error);
    }
    return result;
  }

  @exception(InfrastructureError)
  async getConfigurationNumberValue(keyName: string, defaultValue: number = null): Promise<number> {
    let result = defaultValue;
    try {
      const valueByKey = await this.getConfigurationValueByKey(keyName);
      if((valueByKey) && (valueByKey.DataType === 'NUMBER') && typeof valueByKey.Value === 'number') {
        result = valueByKey.Value;
      }
    } catch (error) {
      this.logger.error(AppConfigService.name, this.getConfigurationNumberValue.name, error);
    }
    return result;
  }

  private async getConfigurationValueByKey(keyName: string): Promise<FeatureFlag> {
    const response = await this.appConfigProvider.getConfigurationData();
    return response.find(item => item.Name === keyName);
  }
}

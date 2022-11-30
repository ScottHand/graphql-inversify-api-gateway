import { Logger } from "../logger";
import { FeatureFlag } from "../interfaces/featureFlag";
import { AppConfigParameters } from "../interfaces/appConfigParameters";
import { RESTDataSource } from 'apollo-datasource-rest';
import { exception } from "../decorators/exceptionDecorator";
import { InternalServerError } from "../errors/internalServerError";
import { TYPE } from "../../config";
import { inject } from "inversify";


export class AppConfigProvider extends RESTDataSource {
  private readonly path: string;

  constructor( @inject(TYPE.Logger) private readonly logger: Logger,
  @inject(TYPE.AppConfigParameters) private readonly appConfigParameters: AppConfigParameters) {
    super();
    this.baseURL = `http://localhost:2772/`;
    // @ts-ignore
    this.initialize({});
    this.path = `applications/${ appConfigParameters.ApplicationId }/environments/${ appConfigParameters.EnvironmentId }/configurations/${ appConfigParameters.ConfigurationProfileId }`;
  }

  async resolveURL(request) {
    const result = super.resolveURL(request);
    this.logger.log(AppConfigProvider.name, this.getConfigurationData.name, `AppConfig Request URL: `, result);
    return result;
  }

  @exception(InternalServerError)
  async getConfigurationData(): Promise<FeatureFlag[]> {
    let result = [];
    try {
      const response = await this.get(this.path);
      this.logger.log(AppConfigProvider.name, this.getConfigurationData.name, `AppConfig GetConfiguration response `, result);
      result = JSON.parse(response);
    } catch (error) {
      this.logger.error(AppConfigProvider.name, this.getConfigurationData.name, error);
    }
    return result;
  }
}

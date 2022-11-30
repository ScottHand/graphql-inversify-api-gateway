import { AppConfigParameters } from "../interfaces/appConfigParameters";
import { Logger } from "../logger";
import { AppConfigProvider } from "../providers/appConfigProvider";

export const createAppConfigProvider = (logger: Logger, appConfigParameters: AppConfigParameters): AppConfigProvider => {
    return new AppConfigProvider(logger, appConfigParameters);
}
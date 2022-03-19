import { SecretsManager, AWSError } from 'aws-sdk';
import { Logger } from '../../../src/lib/logger';
import { SecretsManagerProvider } from '../../../src/lib/providers/secretsManagerProvider';
import { InfrastructureError } from '../../../src/lib/errors/infrastructureError';
import { type } from 'os';

jest.mock('../../../src/lib/logger');
jest.mock('aws-sdk');

const mockLogger = new Logger();
const mockSecretsManager = new SecretsManager();

const mockedGetSecretStingResponse = { Name: 'blah', SecretString: JSON.stringify( { secret: 'secret'}), VersionId: '1' };
mockSecretsManager.getSecretValue = jest.fn().mockImplementation((params, callback) => callback(null, mockedGetSecretStingResponse));
const secretManagerProvider = new SecretsManagerProvider(mockLogger, mockSecretsManager);

describe.only('SecretsManagerProvider', () => {
  describe('getSecrets', () => {
    it('should return SecretString value when valid request', async () => {
      const result = await secretManagerProvider.getSecrets('id');

      expect(mockSecretsManager.getSecretValue).toHaveBeenCalledTimes(1);
      expect(result).toEqual(JSON.parse(mockedGetSecretStingResponse.SecretString));
    });

    it('should return InfrastructureError when AWSError occurs', async () => {
      const awsError = {message: 'secret not found'} as AWSError;
      mockSecretsManager.getSecretValue = jest.fn().mockImplementation((params, callback) => callback(awsError, null));

      const expectedErrorParameters = {
        className: 'SecretsManagerProvider',
        method: 'getSecrets',
        error: new InfrastructureError(`Get secrets failed. Params: ${JSON.stringify({'SecretId':'id'})}`, awsError)
      }

      try {
        await secretManagerProvider.getSecrets('id');
      } catch (error) {
        expect(error).toBeInstanceOf(InfrastructureError);
        expect(mockLogger.error).toHaveBeenCalledWith(expectedErrorParameters.className,
          expectedErrorParameters.method,
          expectedErrorParameters.error);
      }
    });
  });
});


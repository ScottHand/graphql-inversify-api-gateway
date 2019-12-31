import { EntityManager, EntityMetadata, Repository } from 'typeorm';
import { exception } from '../lib/decorators/exceptionDecorator';
import { DomainError } from '../lib/errors/domainError';

export class BaseRepository<T> extends Repository<T> {
  constructor(public manager: EntityManager, public metadata: EntityMetadata) {
    super();
  }

  @exception(DomainError)
  async checkConnection() {
    if (!this.manager.connection.isConnected) {
      await this.manager.connection.connect();
    }
  }
}

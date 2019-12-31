import { Connection } from 'typeorm';

export const createRepository = <T>(
  connection: Connection,
  t: new (...args: any[]) => T
) => {
  return connection.getCustomRepository<T>(t);
};

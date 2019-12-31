import 'reflect-metadata';

import { Container } from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';
import { bindings } from './bindings';

export function createContainer() {
  const c = new Container();

  c.load(buildProviderModule());
  c.load(bindings);

  return c;
}

export const container = createContainer();

import 'reflect-metadata';

import { Container } from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';
import { bindings } from './bindings';
import '../services';

export function createContainer() {
  const c = new Container();

  c.load(bindings);
  c.load(buildProviderModule());

  return c;
}

export const container = createContainer();

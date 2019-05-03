import { Newable } from './interfaces/Newable';

export function copyObject<U, V>(Destination: Newable<U>, source: V): U {
  const copied = new Destination();
  Object.keys(copied).forEach(key => (copied[key] = source[key]));

  return copied;
}

interface EntityConstructor<T, R> {
  new (data: T): R;
}

export function getEntityByModel<T, R>(data: T | R, entity: EntityConstructor<T, R>): R {
  return data instanceof entity ? data : new entity(data as T);
}

export function getEntityByModelOptional<T, R>(data: T | R | undefined, entity: EntityConstructor<T, R>): R | null {
  if (data === undefined || data === null) {
    return null;
  }
  return data instanceof entity ? data : new entity(data as T);
}

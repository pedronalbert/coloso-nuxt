import { has, merge, each, isArray, isUndefined, isNull, isFinite, isEmpty } from 'lodash';

export default function denormalize(id, entityName, entities) {
  let rootId = id;

  if (isUndefined(rootId) || isNull(rootId)) {
    return null;
  }

  if (isFinite(rootId)) {
    rootId = rootId.toString();
  }

  const denormalized = {
    id: rootId,
  };

  const rootEntity = entities[entityName][rootId];

  if (isEmpty(rootEntity)) {
    return null;
  }

  if (has(rootEntity, 'attributes')) {
    merge(denormalized, rootEntity.attributes);
  }

  if (has(rootEntity, 'relationships')) {
    const relationships = rootEntity.relationships;

    each(relationships, (relObj, relKey) => {
      if (isArray(relObj)) {
        denormalized[relKey] = relObj.map(({ data }) => denormalize(data.id, data.type, entities));
      } else {
        denormalized[relKey] = denormalize(relObj.data.id, relObj.data.type, entities);
      }
    });
  }

  return denormalized;
}

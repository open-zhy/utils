import merge from 'lodash.merge';

export const loadJsonValue = <T extends Record<string, unknown>>(key: string, defaultValue?: T): T => {
  const textJson = localStorage.getItem(key);
  if (!textJson) {
    return defaultValue as T;
  }

  try {
    return merge({}, defaultValue || {}, JSON.parse(textJson)) as T;
  } catch (e) {
    return defaultValue as T;
  }
};

export const storeJsonValue = <T extends Record<string, unknown>>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

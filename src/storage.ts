import merge from 'lodash.merge';

/**
 * Load a json value from localstorage
 * 
 * @param key 
 * @param defaultValue 
 * @returns 
 */
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

/**
 * Save a json data into localstorage
 * 
 * @param key 
 * @param value 
 */
export const storeJsonValue = <T extends Record<string, unknown>>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

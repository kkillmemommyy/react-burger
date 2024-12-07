type Keys = 'refreshToken';

export const localStorageGetItem = (key: Keys) => localStorage.getItem(key);

export const localStorageSetItem = (key: Keys, value: string) => {
  localStorage.setItem(key, value);
};

export const localStorageRemoveItem = (key: Keys) => localStorage.removeItem(key);

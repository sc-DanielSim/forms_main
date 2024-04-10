import { useEffect, useState } from 'react';

const useLocalStorage = (key: string, defaultValue: string) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    let currentValue;
    try {
      currentValue = JSON.parse(localStorage.getItem(key) || String(defaultValue));
    } catch (error) {
      currentValue = defaultValue;
    }
    setValue(currentValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const setNewValue = (value: string) => {
    localStorage.setItem(key, JSON.stringify(value));
    setValue(value);
  };

  return [value, setNewValue] as const;
};

export default useLocalStorage;

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

export const useDebouncedValue = (input: string = '', time: number = 500) => {

  const [debounceValue, setdebounceValue] = useState(input);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setdebounceValue(input);
    }, time);

    return () => {
      clearTimeout(timeout);
    };
  }, [input]);

  return debounceValue;
};

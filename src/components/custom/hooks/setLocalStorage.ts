import { useEffect, useState } from "react";

const useLocalStorage = (key: string, init: any) => {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);
    if (data != null) return JSON.parse(data);
    if (typeof init == typeof Function) return init();
    return init;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(init));
  }, [key, value, init]);

  return [value, setValue];
};

export default useLocalStorage;

const saveToLocalStorage = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch (err) {
    console.error("Error saving to localStorage", err);
  }
};

const getFromLocalStorage = (key: string) => {
  try {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data) as string;
    }
  } catch (err) {
    console.error("Error getting data from localStorage", err);
    return null;
  }
};

export { saveToLocalStorage, getFromLocalStorage };

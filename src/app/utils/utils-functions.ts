export const formatPrice = (price: number | string) => {
  if (typeof price === 'string') {
    return price.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }
  if (typeof price === 'number') {
    return String(price).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }
};

export const entityObj = <T>(obj: T):T => {
  const cleanedObj = {} as T;
  //@ts-ignore
  Object.keys(obj).forEach(key => {
    //@ts-ignore
    const value = obj[key];
    if (value !== '' && value !== null && value !== undefined) {
      //@ts-ignore
      cleanedObj[key] = value;
    }
  });

  return cleanedObj;
}
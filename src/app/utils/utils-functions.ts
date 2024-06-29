export const formatPrice = (price: number | string) => {
  if (typeof price === 'string') {
    return price.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }
  if (typeof price === 'number') {
    return String(price).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }
};
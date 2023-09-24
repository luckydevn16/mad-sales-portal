export const formatPrice = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(value);
};

export const formatNumber = (value: number) => {
  return new Intl.NumberFormat("en-US").format(value);
};

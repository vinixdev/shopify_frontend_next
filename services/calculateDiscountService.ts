export const calculateDiscountedPrice = (
  price: number,
  amount: number
): number => {
  return price * (amount / 100);
};

export const calculateRemainPriceWithDiscount = (
  price: number,
  amount: number
): number => {
  return price - calculateDiscountedPrice(price, amount);
};

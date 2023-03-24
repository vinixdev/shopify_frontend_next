export const toPersianCurrency = (price: number) => {
  const toPersianFormat = new Intl.NumberFormat("fa", {
    style: "currency",
    currency: "IRR",
  }).format(price);

  return toPersianFormat.replace("ریال ", "").replace("٫۰۰", "");
};

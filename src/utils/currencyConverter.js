const exchangeRates = {
  INR: 1,
  USD: 87.35,
  EUR: 101.84,
  GBP: 117.66,
  JPY: 0.59,
  CNY: 12.17,
};

export function convertCurrency(amountInINR, targetCurrency) {
  if (targetCurrency === "INR") return amountInINR;

  return amountInINR / exchangeRates[targetCurrency];
}
import { convertCurrency } from "./currencyConverter";

const currencyLocales = {
  INR: "en-IN",
  USD: "en-US",
  EUR: "de-DE",
  GBP: "en-GB",
  JPY: "ja-JP",
  CNY: "zh-CN",
};

export function formatCurrency(
  amount,
  currency = "INR"
) {
  const converted = convertCurrency(amount, currency);

  return new Intl.NumberFormat(
    currencyLocales[currency],
    {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  ).format(converted);
}
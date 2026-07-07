// Shamiri stub: upstream moved multi-currency billing to its private EE repo,
// but public billing components still import this module. This deployment
// never bills users, so USD-only static data is sufficient to compile.
export type Currency = "usd" | "eur" | "gbp";

export const CURRENCIES: Currency[] = ["usd", "eur", "gbp"];

export const DEFAULT_CURRENCY: Currency = "usd";

export const CURRENCY_LABEL: Record<Currency, string> = {
  usd: "USD",
  eur: "EUR",
  gbp: "GBP",
};

export const CURRENCY_SYMBOL: Record<Currency, string> = {
  usd: "$",
  eur: "€",
  gbp: "£",
};

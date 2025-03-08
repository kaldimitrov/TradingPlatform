import { CurrencyPrice } from "./currency-price.mode";

export interface CryptoHolding {
  currency: CurrencyPrice;
  quantity: number;
  avgPurchasePrice: number;
}

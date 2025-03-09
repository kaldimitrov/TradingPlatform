import { TransactionType } from "@/enums/transaction-type.enum";
import { CurrencyPrice } from "./currency-price.mode";

export interface Transaction {
  id: string;
  currency: CurrencyPrice;
  quantity: number;
  amount: number;
  type: TransactionType;
  timestamp: string;
  profit: number;
}

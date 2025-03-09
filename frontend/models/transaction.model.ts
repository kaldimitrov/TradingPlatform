import { TransactionType } from "@/enums/transaction-type.enum";
import { CurrencyPrice } from "./currency-price.mode";

export interface Transaction {
  id: string;
  currency: CurrencyPrice;
  quantity: string;
  amount: string;
  type: TransactionType;
  timestamp: string;
}

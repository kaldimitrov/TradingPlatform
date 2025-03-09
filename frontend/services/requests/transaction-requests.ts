import httpService from "../http.service";
import { Transaction } from "@/models/transaction.model";

export function getTransactions(): Promise<Transaction[]> {
  return httpService.get("/transactions").then((response) => {
    return response.data;
  });
}

import { CryptoHolding } from "@/models/crypto-holding.model";
import httpService from "../http.service";

export function getHoldings(): Promise<CryptoHolding[]> {
  return httpService.get("/crypto/holdings").then((response) => {
    return response.data;
  });
}

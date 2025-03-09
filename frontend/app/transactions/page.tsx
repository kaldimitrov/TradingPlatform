'use client';
import Layout from "@/components/layout/Layout";
import { CryptoHolding } from "@/models/crypto-holding.model";
import { useState } from "react";

const holdings: CryptoHolding[] = [
  {
    currency: {
      symbol: "BTC",
      name: "Bitcoin",
      price: 50000,
      changePct: -2.5,
      volume: 1000000,
    },
    quantity: 0.5,
    avgPurchasePrice: 45000,
  },
  {
    currency: {
      symbol: "ETH",
      name: "Ethereum",
      price: 4000,
      changePct: 3.2,
      volume: 500000,
    },
    quantity: 2,
    avgPurchasePrice: 3500,
  },
];

export default function Transactions() {
  const [cryptoHoldings, setCryptoHoldings] = useState(holdings);

  return (
    <Layout breadcrumbTitle="Wallet Assets">
      <div>
        <section className="wallet buy-crypto flat-tabs">
          <div className="container">
            <div className="row">
              <div className="col-xl-3 col-md-12">
                <ul className="menu-tab">
                  <li className="active">
                    <h6 className="fs-16">Assets Overview</h6>
                  </li>
                  <li>
                    <h6 className="fs-16"><a href="/transactions">Transactions</a></h6>
                  </li>
                  <li>
                    <h6 className="fs-16"><a href="/exchange">Exchange</a></h6>
                  </li>
                </ul>
              </div>
              <div className="col-xl-9 col-md-12">
                <div className="content-tab">
                  <div className="content-inner" style={{ display: "block" }}>
                    <div className="coin-list-wallet">
                      <table className="table">
                        <thead>
                          <tr>
                            <th className="left" scope="col">Asset</th>
                            <th className="left" scope="col">Quantity</th>
                            <th className="left" scope="col">Avg. Purchase Price</th>
                            <th className="left" scope="col">Current Price</th>
                            <th className="left" scope="col">Profit/Loss</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cryptoHoldings.length === 0 ? (
                            <tr>
                              <td colSpan={5} className="text-center" style={{opacity: 0.7}}>
                                You don't have any assets in your wallet. Head over to the <a href="/exchange">exchange tab</a> to get started.
                              </td>
                            </tr>
                          ) : (
                            cryptoHoldings.map((holding, index) => {
                              const {
                                currency: { symbol, name, price },
                                quantity,
                                avgPurchasePrice,
                              } = holding;
                              const profitLoss = ((price - avgPurchasePrice) / avgPurchasePrice) * 100;
                              const profitLossClass = profitLoss < 0 ? "down" : "up";

                              return (
                                <tr key={index}>
                                  <td className="asset">
                                    <span className={`icon-${symbol.toLowerCase()}`}>
                                      <img
                                        src={require(`cryptocurrency-icons/svg/color/${symbol.toLowerCase()}.svg`).default.src}
                                        height={24}
                                        width={24}
                                        alt={`${symbol} logo`}
                                      />
                                    </span>
                                    <p>
                                      <span className="bold">{symbol}</span>
                                      <span className="unit">{name}</span>
                                    </p>
                                  </td>
                                  <td className="color-success left v-align-middle">
                                    <span className="bold">
                                      {quantity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 18 })} {symbol}
                                    </span>
                                  </td>
                                  <td className="left v-align-middle">
                                    <span className="bold">
                                      ${avgPurchasePrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </span>
                                  </td>
                                  <td className="left v-align-middle">
                                    <span className="bold">
                                      ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </span>
                                  </td>
                                  <td className={`${profitLossClass} left v-align-middle`}>
                                    {profitLoss > 0 && '+'}
                                    {profitLoss.toFixed(2)}%
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

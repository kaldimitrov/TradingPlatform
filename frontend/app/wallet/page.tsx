'use client';
import Layout from "@/components/layout/Layout";
import { ToastMessages } from "@/enums/toast-messages.enum";
import { CryptoHolding } from "@/models/crypto-holding.model";
import { getHoldings } from "@/services/requests/crypto-requests";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Wallet() {
  const [cryptoHoldings, setCryptoHoldings] = useState([] as CryptoHolding[]);
    useEffect(() => {
        const fetchAccount = async () => {
            try {
                setCryptoHoldings(await getHoldings());
            } catch (error) {
                if (toast.isActive(ToastMessages.ERROR_FETCHING_WALLET_ASSETS)) {
                    return;
                }
                toast.error(ToastMessages.ERROR_FETCHING_WALLET_ASSETS, { toastId: ToastMessages.ERROR_FETCHING_WALLET_ASSETS });
            }
        };

        fetchAccount();
    }, []);

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
                            <th className="center" scope="col">Quantity</th>
                            <th className="center" scope="col">Avg. Purchase Price</th>
                            <th className="center" scope="col">Current Price</th>
                            <th className="center" scope="col">Profit/Loss</th>
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
                                  <td className="color-success center v-align-middle">
                                    <span className="bold">
                                      {quantity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 18 })} {symbol}
                                    </span>
                                  </td>
                                  <td className="center v-align-middle">
                                    <span className="bold">
                                      ${avgPurchasePrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </span>
                                  </td>
                                  <td className="center v-align-middle">
                                    <span className="bold">
                                      ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </span>
                                  </td>
                                    <td className={`${profitLossClass} center v-align-middle`}>
                                    {avgPurchasePrice === 0 ? '-' : (
                                      <>
                                      {profitLoss > 0 && '+'}
                                      {profitLoss.toFixed(2)}%
                                      </>
                                    )}
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

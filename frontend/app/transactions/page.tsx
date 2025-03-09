'use client';
import Layout from "@/components/layout/Layout";
import { ToastMessages } from "@/enums/toast-messages.enum";
import { TransactionType } from "@/enums/transaction-type.enum";
import { Transaction } from "@/models/transaction.model";
import { getTransactions } from "@/services/requests/transaction-requests";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Transactions() {
  const [transactions, setTransactions] = useState([] as Transaction[]);
      useEffect(() => {
          const fetchTransactions = async () => {
              try {
                setTransactions(await getTransactions());
              } catch (error) {
                  if (toast.isActive(ToastMessages.ERROR_FETCHING_TRANSACTIONS)) {
                      return;
                  }
                  toast.error(ToastMessages.ERROR_FETCHING_TRANSACTIONS, { toastId: ToastMessages.ERROR_FETCHING_TRANSACTIONS });
              }
          };
  
          fetchTransactions();
      }, []);

  return (
    <Layout breadcrumbTitle="Transactions">
      <div>
        <section className="wallet buy-crypto flat-tabs">
          <div className="container">
            <div className="row">
              <div className="col-xl-3 col-md-12">
                <ul className="menu-tab">
                  <li>
                    <h6 className="fs-16"><a href="/wallet">Assets Overview</a></h6>
                  </li>
                  <li className="active">
                    <h6 className="fs-16">Transactions</h6>
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
                            <th className="center" scope="col">Crypto Price</th>
                            <th className="center" scope="col">Profit</th>
                            <th className="center" scope="col">Date</th>
                            <th className="center" scope="col">Transaction Type</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.length === 0 ? (
                            <tr>
                              <td colSpan={5} className="text-center" style={{opacity: 0.7}}>
                                You don't have any transactions yet. Head over to the <a href="/exchange">exchange tab</a> to get started.
                              </td>
                            </tr>
                          ) : (
                            transactions.map((transaction, index) => {
                              const {
                                currency: { symbol, name },
                                quantity,
                                amount,
                                type,
                                timestamp,
                                profit
                              } = transaction;
                              const profitLossClass = profit < 0 ? "down" : "up";
                              const typeClass = type === TransactionType.BUY ? "badge-green" : "badge-red";
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
                                      ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 18 })}
                                    </span>
                                  </td>
                                    <td className="center v-align-middle">
                                    <span className={"bold " + profitLossClass}>
                                      {type === TransactionType.SELL ? `$${profit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 18 })}` : '-'}
                                    </span>
                                    </td>
                                  <td className="center v-align-middle">
                                    <span className="bold">
                                        {new Date(timestamp).toLocaleString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                  </td>
                                  <td className={"center v-align-middle "}>
                                    <span className={"bold " + typeClass}>
                                      {type}
                                    </span>
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

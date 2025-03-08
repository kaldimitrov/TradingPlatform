import Link from 'next/link';
import ChatList from '../chart/ChatList';
import IconStar from '../elements/IconStar';
import { ChartColor } from '../../enums/chart-color.enum';
import { CurrencyPrice } from '@/models/currency-price.mode';

export default function Coinlist() {
    const currencyData: CurrencyPrice[] = [
        {
          currency: 'Bitcoin',
          symbol: 'BTC',
          price: 56623.54,
          changePct: 1.45,
          volume: 880423640582,
        },
        {
          currency: 'Ethereum',
          symbol: 'ETH',
          price: 1800.23,
          changePct: -5.12,
          volume: 380423640582,
        },
      ];
      
  return (
    <section className="coin-list">
      <div className="container box">
        <div className="row">
          <div className="col-md-12">
            <div className="block-text">
              <h3 className="heading">Market Update</h3>
            </div>
            <div className="coin-list__main">
              <div className="flat-tabs">
                <div className="content-tab crypto__main">
                  <div className="content-inner" style={{ display: 'block' }}>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col" />
                          <th scope="col">#</th>
                          <th scope="col">Name</th>
                          <th scope="col">Last Price</th>
                          <th scope="col">24h %</th>
                          <th scope="col">Volume</th>
                          <th scope="col">Last 7 Days</th>
                          <th scope="col" />
                        </tr>
                      </thead>
                      <tbody>
                        {currencyData.map((currency, index) => {
                          const changeClass = currency.changePct < 0 ? 'down' : 'up';
                          const chartColor = currency.changePct < 0 ? ChartColor.RED : ChartColor.GREEN;

                          return (
                            <tr key={currency.symbol}>
                              <th scope="row">
                                <IconStar />
                              </th>
                              <td>{index + 1}</td>
                              <td>
                                <Link href="#">
                                  <span className={`icon-${currency.symbol.toLowerCase()}`}>
                                    <img
                                      src={require(`cryptocurrency-icons/svg/color/${currency.symbol.toLowerCase()}.svg`).default.src}
                                      height={24}
                                      width={24}
                                      alt={`${currency.currency} logo`}
                                    />
                                  </span>
                                  <span>{currency.currency}</span>
                                  <span className="unit">{currency.symbol.toUpperCase()}</span>
                                </Link>
                              </td>
                              <td className="boild">${currency.price.toLocaleString()}</td>
                              <td className={changeClass}>
                                {currency.changePct > 0 && '+'}
                                {currency.changePct}%
                              </td>
                              <td className="boild">${currency.volume.toLocaleString()}</td>
                              <td>
                                <ChatList color={chartColor} />
                              </td>
                              <td>
                                <Link href="#" className="btn">
                                  Trade
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

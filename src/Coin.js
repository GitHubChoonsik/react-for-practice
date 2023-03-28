import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState(10);
  const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState(1);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setSymbol(json[0].symbol);
        setPrice(json[0].quotes.USD.price);
        setLoading(false);
      });
  }, []);
  const onChangeMoney = (event) => setMoney(event.target.value);
  const onChangeSelect = (event) => {
    let index = event.target.selectedIndex;
    let coin = coins[index];
    setSymbol(coin.symbol);
    setPrice(coin.quotes.USD.price);
  };
  return (
    <div>
      <h1>The Coins! {loading ? null : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <div>
            I have{" "}
            <input value={money} onChange={onChangeMoney} type="number" /> USD
          </div>
          <div>
            I can buy <strong>{money / price}</strong> {symbol}!!
          </div>
          <select onChange={onChangeSelect}>
            {coins.map((coin) => (
              <option key={coin.id}>
                {coin.name} ({coin.symbol}): {coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default App;

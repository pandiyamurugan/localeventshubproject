import Skeleton from "./Skeleton";

export default function CoinTable({ coins, loading }) {
  return (
    <div className="card shadow">

      <div className="table-responsive">

        <table className="table">

          <thead>
            <tr>
              <th>#</th>
              <th>Coin</th>
              <th>Price</th>
              <th>Market Cap</th>
              <th>24h</th>
            </tr>
          </thead>

          <tbody>

            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td colSpan="5"><Skeleton /></td>
                </tr>
              ))
            ) : (
              coins.map((c, i) => (
                <tr key={c.id}>
                  <td>{i + 1}</td>
                  <td>{c.name}</td>
                  <td>${c.current_price}</td>
                  <td>${c.market_cap}</td>
                  <td>{c.price_change_percentage_24h.toFixed(2)}%</td>
                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}
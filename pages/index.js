import { useState } from 'react';

export default function Home() {
  const [bets, setBets] = useState([]);
  const [player, setPlayer] = useState('');
  const [surface, setSurface] = useState('');
  const [odds, setOdds] = useState('');
  const [stake, setStake] = useState('');
  const [result, setResult] = useState('');
  const [prob, setProb] = useState('');
  
  const addBet = () => {
    const profit = result === 'win' ? (odds - 1) * stake : -stake;
    setBets([...bets, { player, surface, odds, stake, result, profit }]);
    setPlayer(''); setSurface(''); setOdds(''); setStake(''); setResult('');
  };

  const roi = bets.length ? (bets.reduce((acc, b) => acc + b.profit, 0) / bets.reduce((acc, b) => acc + +b.stake, 0) * 100).toFixed(2) : 0;
  const value = prob && odds ? ((prob / 100 * odds - 1) * 100).toFixed(2) : null;

  return (
    <div style={{ padding: 20 }}>
      <h1>Tennis Betting Tracker</h1>
      <input placeholder="Player" value={player} onChange={e => setPlayer(e.target.value)} />
      <input placeholder="Surface" value={surface} onChange={e => setSurface(e.target.value)} />
      <input placeholder="Odds" type="number" value={odds} onChange={e => setOdds(e.target.value)} />
      <input placeholder="Stake" type="number" value={stake} onChange={e => setStake(e.target.value)} />
      <select value={result} onChange={e => setResult(e.target.value)}>
        <option value="">Result</option>
        <option value="win">Win</option>
        <option value="loss">Loss</option>
      </select>
      <button onClick={addBet}>Add Bet</button>

      <h2>ROI: {roi}%</h2>
      <table border="1" cellPadding="5" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Player</th><th>Surface</th><th>Odds</th><th>Stake</th><th>Result</th><th>Profit</th>
          </tr>
        </thead>
        <tbody>
          {bets.map((bet, i) => (
            <tr key={i}>
              <td>{bet.player}</td><td>{bet.surface}</td><td>{bet.odds}</td><td>{bet.stake}</td><td>{bet.result}</td><td>{bet.profit.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginTop: 40 }}>🎯 Value Bet Calculator</h2>
      <input placeholder="Your estimated probability (%)" type="number" value={prob} onChange={e => setProb(e.target.value)} />
      <input placeholder="Odds" type="number" value={odds} onChange={e => setOdds(e.target.value)} />
      {value !== null && (
        <p>
          Value: <strong>{value}%</strong>{' '}
          {value > 0 ? '✔️ Value bet!' : '❌ Όχι value'}
        </p>
      )}
    </div>
  );
}

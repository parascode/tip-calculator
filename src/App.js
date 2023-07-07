import { useState } from "react";
import "./styles.css";

export default function App() {
  const [billAmount, setBillAmount] = useState(0);
  const [tip1, setTip1] = useState(0);
  const [tip2, setTip2] = useState(0);
  function handleResetAmount() {
    setBillAmount(0);
    setTip1(0);
    setTip2(0);
  }
  let totalTip = 0;
  if (billAmount > 0) {
    totalTip = (billAmount * ((tip1 + tip2) / 200)).toFixed(2);
  }
  return (
    <div>
      <Bill billAmount={billAmount} setBillAmount={setBillAmount} />
      <Service tip={tip1} setTip={setTip1}>
        How did you like the service?
      </Service>
      <Service tip={tip2} setTip={setTip2}>
        How did your friend like the service?
      </Service>
      {billAmount ? (
        <div>
          <Message billAmount={billAmount} totalTip={totalTip} />
          <Reset onReset={handleResetAmount} />
        </div>
      ) : null}
    </div>
  );
}
function Bill({ billAmount, setBillAmount }) {
  function handleBillChange(amount) {
    setBillAmount(amount);
  }
  return (
    <div>
      How much was the bill?
      <input
        type="number"
        placeholder="Bill Value"
        value={billAmount}
        onChange={(e) => handleBillChange(Number(e.target.value))}
      />
    </div>
  );
}
function Service({ children, tip, setTip }) {
  return (
    <div>
      {children}
      <select value={tip} onChange={(e) => setTip(Number(e.target.value))}>
        <option value={0}>Dissatisfied (0%)</option>
        <option value={5}>It was okay (5%)</option>
        <option value={10}>It was good (10%)</option>
        <option value={20}>Absolutely Amazing!! (20%)</option>
      </select>
    </div>
  );
}
function Message({ billAmount, totalTip }) {
  return (
    <h3>
      You pay ${billAmount + totalTip} (${billAmount} + ${totalTip} tip)
    </h3>
  );
}
function Reset({ onReset }) {
  return <button onClick={onReset}>Reset</button>;
}

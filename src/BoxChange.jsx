import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./box.css";

const ApiKey = "cb2c38b8abab617e9b911d8b";

function BoxChange() {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const show = useSelector((state) => state.bank.isshow);
  const bank = useSelector((state) => state.bank.bank);
  const [outinputmony, setOutInputMony] = useState(100);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (!bank || !selectedCurrency || outinputmony <= 0) return;
      try {
        const res = await fetch(
          `https://v6.exchangerate-api.com/v6/${ApiKey}/pair/${bank}/${selectedCurrency}/${outinputmony}`
        );
        const data = await res.json();
        console.log(data);
        setConvertedAmount(data.conversion_result);
      } catch (err) {
        console.log("خطا در دریافت اطلاعات:", err);
      }
    }
    fetchData();
  }, [bank, outinputmony, selectedCurrency]);

  return (
    <div className="bank-container">
      <section className="Bank"></section>

      {show && (
        <section className="CurrencyBox">
          <h3>انتخاب ارز</h3>
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
          >
            <option value="USD">دلار آمریکا (USD)</option>
            <option value="EUR">یورو (EUR)</option>
            <option value="GBP">پوند انگلیس (GBP)</option>
            <option value="JPY">ین ژاپن (JPY)</option>
            <option value="CHF">فرانک سوئیس (CHF)</option>
          </select>

          {convertedAmount !== null && (
            <p>
              مقدار تبدیل‌شده: {convertedAmount} {selectedCurrency}
            </p>
          )}
        </section>
      )}
    </div>
  );
}

export default BoxChange;

import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import {
  afzayesh,
  kahesh,
  payloan,
  loans,
  setShow,
  close,
  children,
  Affection,
} from "./Store";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BoxChange from "./BoxChange";
import Children from "./Children";

function Bank() {
  const [money, setMoney] = useState(0);
  const [harvesting, setHarvesting] = useState(0);
  const [loan, setLoan] = useState(0);
  const [sel, setSel] = useState(false);
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userAge, setUserAge] = useState(0);
  const [userLocation, setUserLocation] = useState("Outside");
  const [changepoints, setChangePoints] = useState(50);
  const [isfalse, setisFalse] = useState(false);

  const bank = useSelector((state) => state.bank.bank);
  const show = useSelector((state) => state.bank.isshow);
  const isChildren = useSelector((state) => state.bank.children);

  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(afzayesh(Number(money)));
    toast.success("Amount increased successfully!");
  };
  const handleDecrease = () => {
    dispatch(kahesh(Number(harvesting)));
    toast.success("Amount decreased successfully!");
  };
  const handleLoan = () => {
    dispatch(loans(Number(loan)));
  };
  const handlePay = () => {
    dispatch(payloan());
  };
  const handleClose = () => {
    dispatch(close());
  };

  const handlePoints = () => {
    dispatch(Affection(changepoints));
    toast.success("Points added successfully!");
  };

  useEffect(() => {
    if (userAge >= 10 && userAge < 16) {
      dispatch(children(true));
    } else {
      dispatch(children(false));
    }
  }, [userAge, dispatch]);

  useEffect(() => {
    if (userLocation === "Outside" || userAge <= 17) {
      setSel(true);
    } else {
      setSel(false);
    }
  }, [userLocation, userAge]);

  function handleSubmit() {
    if (userName && userLastName && userAge && userLocation) {
      toast.success("User added successfully!");
      dispatch(setShow(true));
      setisFalse(true);
    } else {
      toast.error("Please fill in all fields!");
      dispatch(setShow(false));
      setUserName("");
      setUserLastName("");
      setUserAge(0);
      setUserLocation("Outside");
    }
  }

  return (
    <>
      <div className="OutPut">
        <h2>{bank}</h2>
      </div>
      {isChildren && (
        <Children handlePoints={handlePoints} changepoints={changepoints} />
      )}

      <section className="Bank">
        <BoxChange />

        <div
          className={isfalse ? "Header-Input-user" : "Header-Input-user-full"}
        >
          <input
            type="text"
            placeholder="UserName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="text"
            placeholder="UserLastName"
            value={userLastName}
            onChange={(e) => setUserLastName(e.target.value)}
          />
          <input
            type="number"
            placeholder="UserAge"
            value={userAge}
            onChange={(e) => setUserAge(Number(e.target.value))}
          />
          <select
            className="Select-User"
            value={userLocation}
            onChange={(e) => setUserLocation(e.target.value)}
          >
            <option value="Outside">Outside the country</option>
            <option value="Inside">Inside the country</option>
          </select>
          <button onClick={handleSubmit}>Submit</button>
        </div>

        <div className={`Body-Bank-user ${show ? "open" : ""}`}>
          {show ? (
            <>
              <div className="Body-Input-User">
                <input
                  value={money}
                  onChange={(e) => setMoney(Number(e.target.value))}
                  className="Input"
                  type="number"
                  placeholder="Money"
                />
                <input
                  onClick={handleIncrease}
                  type="button"
                  className="Iput-Val"
                  disabled={!money}
                />
              </div>
              <div className="Body-Input-User">
                <input
                  value={harvesting}
                  onChange={(e) => setHarvesting(Number(e.target.value))}
                  className="Input"
                  type="number"
                  placeholder="Harvesting money"
                />
                <input
                  onClick={handleDecrease}
                  type="button"
                  className="Iput-Val"
                  disabled={!harvesting}
                />
              </div>
              <div className="Body-Input-User">
                <input
                  value={loan}
                  onChange={(e) => setLoan(Number(e.target.value))}
                  className="Input"
                  type="number"
                  placeholder="Loan"
                  disabled={sel}
                />
                <input
                  onClick={handleLoan}
                  type="button"
                  className="Iput-Val"
                  disabled={sel}
                />
              </div>
              <button
                className={sel ? "Op" : ""}
                disabled={sel}
                onClick={handlePay}
              >
                Pay Loan
              </button>
              <button onClick={handleClose}>Close</button>
            </>
          ) : (
            <p>
              Form is currently closed. Please fill in the details to open it.
            </p>
          )}
        </div>
      </section>
    </>
  );
}

export default Bank;

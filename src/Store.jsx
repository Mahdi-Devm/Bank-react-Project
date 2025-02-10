import { configureStore, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const initialState = {
  bank: 0,
  Athletes: 0,
  loan: 0,
  isshow: false,
  children: false,
  Affection: 0,
};
const bankSlice = createSlice({
  name: "Bank",
  initialState,
  reducers: {
    afzayesh: (state, action) => {
      state.bank = state.bank + action.payload;
      state.isshow = true;
      toast.success("Amount increased successfully!");
    },
    kahesh: (state, action) => {
      state.bank = state.bank - action.payload;
      state.isshow = true;
      toast.success("Amount decreased successfully!");
    },
    loans: (state, action) => {
      if (state.bank < action.payload) {
        toast.error(`You need ${action.payload - state.bank} more!`);
      } else {
        state.loan += action.payload;
        state.bank += action.payload;
        state.isshow = true;
        toast.success("Loan added successfully!");
      }
    },
    payloan: (state) => {
      if (state.bank >= state.loan) {
        state.bank -= state.loan;
        state.loan = 0;
        toast.success("Loan paid successfully!");
      } else {
        toast.error("You have insufficient funds to pay the loan!");
      }
    },
    setShow: (state, action) => {
      state.isshow = action.payload;
    },
    close: (state) => {
      if (state.bank === 0 && state.loan === 0) {
        state.isshow = false;
      } else {
        toast.error("You have money or a loan in your account!");
      }
    },
    children: (state, action) => {
      state.children = action.payload;
    },
    Affection: (state, action) => {
      state.Affection = action.payload;
      state.bank += state.Affection;
    },
  },
});

const store = configureStore({ reducer: { bank: bankSlice.reducer } });
export const {
  Affection,
  afzayesh,
  kahesh,
  loans,
  payloan,
  setShow,
  close,
  children,
} = bankSlice.actions;

export default store;

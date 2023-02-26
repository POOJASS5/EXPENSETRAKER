import { createSlice } from "@reduxjs/toolkit";

const initialState = { expenses: [], totalAmount: 0 };

const expenseSlice = createSlice({
  name: "expenses",
  initialState: initialState,
  reducers: {
    addExpense(state, action) {
      state.expenses = [...state.expenses, ...action.payload.expenses];
      state.totalAmount =
        Number(state.totalAmount) + Number(action.payload.totalAmount);
    },
    removeExpense(state, action) {
      state.expenses = action.payload.expenses;
      state.totalAmount = action.payload.totalAmount;
    },
  },
});
export const expenseAction = expenseSlice.actions;
export default expenseSlice.reducer;
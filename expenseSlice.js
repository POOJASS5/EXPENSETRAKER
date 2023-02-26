import { createSlice } from "@reduxjs/toolkit";

const initialState = { expenses: [] };

const expenseSlice = createSlice({
  name: "expenses",
  initialState: initialState,
  reducers: {
    addExpense(state, action) {
      const updatedExpense = [...state.expenses, ...action.payload];
      state.expenses = updatedExpense;
    },
    removeExpense(state, action) {
      state.expenses = action.payload;
    },
  },
});

export const expenseAction = expenseSlice.actions;
export default expenseSlice.reducer;
import React, { useState, useRef } from "react";

import classes from "./Expenses.module.css";
import ExpenseItems from "../components/ExpenseItems";

const Expenses = () => {
  const [expenseList, setExpenseList] = useState([]);

  const amountRef = useRef();
  const typeRef = useRef();
  const descriptionRef = useRef();

  const addExpenseHandler = (event) => {
    event.preventDefault();
    setExpenseList((preState) => {
      const updatedList = [
        ...preState,
        {
          amount: amountRef.current.value,
          type: typeRef.current.value,
          description: descriptionRef.current.value,
        },
      ];

      return updatedList;
    });
  };

  const newExpenseList = expenseList.map((item) => (
    <ExpenseItems item={item} key={Math.random().toString()} />
  ));

  return (
    <React.Fragment>
      <form className={classes.form} onSubmit={addExpenseHandler}>
        <div className={classes.type}>
          <label>Expense Type: </label>
          <select ref={typeRef}>
            <option>Food</option>
            <option>Shopping</option>
            <option>Entertainment</option>
            <option>Tour</option>
            <option>Adventure</option>
          </select>
        </div>
        <div className={classes.amount}>
          <label>Expense Amount: </label>
          <input type="number" min="0" step="10" ref={amountRef} />
        </div>
        <div className={classes.description}>
          <label>Expense Description: </label>
          <textarea type="text" ref={descriptionRef} />
        </div>
        <div className={classes.button}>
          <button type="submit">Add Expense</button>
        </div>
      </form>
      {expenseList.length > 0 && (
        <div className={classes.items}>
          <div className={classes.title}>
            <span>Type</span>
            <span>Amount</span>
            <span>Description</span>
          </div>
          {newExpenseList}
        </div>
      )}
    </React.Fragment>
  );
};

export default Expenses;
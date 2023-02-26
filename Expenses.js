import React, { useRef, useEffect } from "react";

import classes from "./Expenses.module.css";
import ExpenseItems from "../components/ExpenseItems";
import { useDispatch, useSelector } from "react-redux";
import { expenseAction } from "../store/expenseSlice";

const Expenses = () => {
  useEffect(() => {
    console.log("entered");
  }, []);
  const amountRef = useRef();
  const typeRef = useRef();
  const descriptionRef = useRef();
  const dispatch = useDispatch();
  const expenseList = useSelector((state) => state.expense.expenses);
  const email = JSON.parse(localStorage.getItem("idToken")).email;
  const emailUrl = email.replace(/[@.]/g, "");

  // adding new expenses
  const addExpenseHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(
        `https://expense-tract-default-rtdb.firebaseio.com/${emailUrl}expenses.json`,
        {
          method: "POST",
          body: JSON.stringify({
            amount: amountRef.current.value,
            type: typeRef.current.value,
            description: descriptionRef.current.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        const newData = {
          id: data.name,
          amount: amountRef.current.value,
          type: typeRef.current.value,
          description: descriptionRef.current.value,
        };
        dispatch(expenseAction.addExpense([newData]));
        amountRef.current.value = "";
        typeRef.current.value = "";
        descriptionRef.current.value = "";
      } else {
        throw data.error;
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  // showing expenses when page is refreshed
  useEffect(() => {
    const getItems = async () => {
      if (expenseList.length === 0) {
        try {
          const res = await fetch(
            `https://expense-tract-default-rtdb.firebaseio.com/${emailUrl}expenses.json`
          );

          const data = await res.json();
          if (res.ok) {
            const retrievedData = [];

            for (let key in data) {
              retrievedData.push({ id: key, ...data[key] });
            }
            dispatch(expenseAction.addExpense(retrievedData));
          } else {
            throw data.error;
          }
        } catch (err) {
          console.log(err.message);
        }
      }
    };
    getItems();
  }, [emailUrl, dispatch, expenseList.length]);

  // editing the expense
  const edit = (item) => {
    const updatedExpense = expenseList.filter(
      (expense) => expense.id !== item.id
    );

    amountRef.current.value = item.amount;
    typeRef.current.value = item.type;
    descriptionRef.current.value = item.description;

    dispatch(expenseAction.removeExpense(updatedExpense));
  };

  // deleting the expense
  const deleted = (id) => {
    const updatedExpense = expenseList.filter((expense) => expense.id !== id);
    dispatch(expenseAction.removeExpense(updatedExpense));
  };
  const newExpenseList = expenseList.map((item) => (
    <ExpenseItems
      item={item}
      key={item.id}
      edit={edit}
      deleted={deleted}
      emailUrl={emailUrl}
    />
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
            <span className={classes.titletype}>Type</span>
            <span className={classes.titleamount}>Amount</span>
            <span className={classes.titledescription}>Description</span>
          </div>
          {newExpenseList}
        </div>
      )}
    </React.Fragment>
  );
};
export default Expenses;
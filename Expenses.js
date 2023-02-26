import React, { useRef, useEffect, useState } from "react";

import classes from "./Expenses.module.css";
import ExpenseItems from "../components/ExpenseItems";
import { useDispatch, useSelector } from "react-redux";
import { expenseAction } from "../store/expenseSlice";
import { themeActions } from "../store/themeSlice";

const Expenses = () => {
  const [activatePremium, setActivatePremium] = useState(false);
  const amountRef = useRef();
  const typeRef = useRef();
  const descriptionRef = useRef();
  const dispatch = useDispatch();
  const expenseList = useSelector((state) => state.expense.expenses);
  const totalAmount = useSelector((state) => state.expense.totalAmount);
  const themeMode = useSelector((state) => state.theme.theme);

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
        dispatch(
          expenseAction.addExpense({
            expenses: [newData],
            totalAmount: newData.amount,
          })
        );
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
            let totalAmount = 0;

            for (let key in data) {
              retrievedData.push({ id: key, ...data[key] });
              totalAmount = Number(totalAmount) + Number(data[key].amount);
            }
            dispatch(
              expenseAction.addExpense({
                expenses: retrievedData,
                totalAmount: totalAmount,
              })
            );
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
    const updatedAmount = totalAmount - Number(item.amount);
    const updatedExpense = expenseList.filter(
      (expense) => expense.id !== item.id
    );

    amountRef.current.value = item.amount;
    typeRef.current.value = item.type;
    descriptionRef.current.value = item.description;
    dispatch(
      expenseAction.removeExpense({
        expenses: updatedExpense,
        totalAmount: updatedAmount,
      })
    );
  };

  // deleting the expense
  const deleted = (item) => {
    const updatedAmount = totalAmount - Number(item.amount);
    const updatedExpense = expenseList.filter(
      (expense) => expense.id !== item.id
    );
    dispatch(
      expenseAction.removeExpense({
        expenses: updatedExpense,
        totalAmount: updatedAmount,
      })
    );
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

  // activating premium membership
  const activatePremiumHandler = () => {
    setActivatePremium((preState) => {
      if (preState) {
        dispatch(themeActions.light());
        return !preState;
      } else {
        dispatch(themeActions.dark());
        return !preState;
      }
    });
  };

  // creating the csv file to download
  const title = ["Category", "Amount", "Description"];
  const data = [title];

  expenseList.forEach((item) => {
    data.push([item.type, item.amount, item.description]);
  });

  const creatingCSV = data.map((row) => row.join(",")).join("\n");
  const blob = new Blob([creatingCSV]);

  // dark mode handler
  const darkModeHandler = () => {
    if (themeMode === "light") {
      dispatch(themeActions.dark());
    } else {
      dispatch(themeActions.light());
    }
  };

  if (totalAmount < 10000 && themeMode === "dark") {
    setActivatePremium(false);
    dispatch(themeActions.light());
  }
  return (
    <React.Fragment>
      {totalAmount > 10000 && (
        <div className={classes.activate}>
          <button onClick={activatePremiumHandler}>
            {activatePremium ? "Deactivate Premium" : "Activate Premium"}
          </button>
          {activatePremium && (
            <button onClick={darkModeHandler}>
              {themeMode === "light" ? "Dark Mode" : "Light Mode"}
            </button>
          )}
        </div>
      )}
      <form className={classes.form} onSubmit={addExpenseHandler}>
        <div className={classes.type}>
          <label>Expense Category: </label>
          <select ref={typeRef} required>
            <option>Food</option>
            <option>Shopping</option>
            <option>Entertainment</option>
            <option>Transport</option>
            <option>Adventure</option>
          </select>
        </div>
        <div className={classes.amount}>
          <label>Expense Amount: </label>
          <input type="number" min="0" step="10" ref={amountRef} required />
        </div>
        <div className={classes.description}>
          <label>Expense Description: </label>
          <textarea type="text" ref={descriptionRef} required />
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
            {totalAmount > 10000 && activatePremium && (
              <a href={URL.createObjectURL(blob)} download="expenses.csv">
                Download
              </a>
            )}
          </div>
          {newExpenseList}
          <div className={classes.total}>Total Expense = Rs.{totalAmount}</div>
        </div>
      )}
    </React.Fragment>
  );
};
export default Expenses;
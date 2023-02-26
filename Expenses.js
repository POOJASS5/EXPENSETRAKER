import React, { useState, useRef, useEffect } from "react";

import classes from "./Expenses.module.css";
import ExpenseItems from "../components/ExpenseItems";
const Expenses = () => {
  const [expenseList, setExpenseList] = useState([]);
  const amountRef = useRef();
  const typeRef = useRef();
  const descriptionRef = useRef();
  const email = JSON.parse(localStorage.getItem("idToken")).email;
  const emailUrl = email.replace(/[@. ]/g, "");

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
          amount: amountRef.current.value,
          type: typeRef.current.value,
          description: descriptionRef.current.value,
        };
        setExpenseList((preState) => {
          const updatedList = [
            ...preState,
            {
              id: data.name,
              ...newData,
            },
          ];
          return updatedList;
        });
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
          setExpenseList(retrievedData);
        } else {
          throw data.error;
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    getItems();
  }, [emailUrl]);

  // editing the expense
  const edit = (item) => {
    setExpenseList((preState) => {
      const updatedItemList = preState.filter((data) => data.id !== item.id);
      return updatedItemList;
    });

    amountRef.current.value = item.amount;
    typeRef.current.value = item.type;
    descriptionRef.current.value = item.description;
  };

  // deleting the expense
  const deleted = (id) => {
    setExpenseList((preState) => {
      const updatedItemList = preState.filter((data) => data.id !== id);
      return updatedItemList;
    });
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
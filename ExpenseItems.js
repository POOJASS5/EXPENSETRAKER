import React from "react";
import classes from "./ExpenseItems.module.css";

const ExpenseItems = (props) => {
  const removeFromDatabase = async (id) => {
    try {
      const res = await fetch(
        `https://expense-tract-default-rtdb.firebaseio.com/${props.emailUrl}expenses/${id}.json`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        console.log("deleted successfully");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const editHandler = () => {
    removeFromDatabase(props.item.id);
    props.edit(props.item);
  };

  const deleteHandler = () => {
    removeFromDatabase(props.item.id);
    props.deleted(props.item.id);
  };
  return (
    <div className={classes.item}>
      <span className={classes.type}>{props.item.type}</span>
      <span className={classes.amount}>Rs. {props.item.amount}</span>
      <span className={classes.description}>{props.item.description}</span>
      <div className={classes.button}>
        <button onClick={editHandler}>Edit</button>
        <button onClick={deleteHandler}>Delete</button>
      </div>
    </div>
  );
};
export default ExpenseItems;
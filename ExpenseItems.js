import React from "react";
import classes from "./ExpenseItems.module.css";

const ExpenseItems = (props) => {
  const editHandler = async () => {
    try {
      const res = await fetch(
        `https://expense-tract-default-rtdb.firebaseio.com/${props.emailUrl}expenses/${props.item.id}.json`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        //console.log("deleted successfully");
        props.edit(props.item);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteHandler = async () => {
    try {
      const res = await fetch(
        `https://expense-tract-default-rtdb.firebaseio.com/${props.emailUrl}expenses/${props.item.id}.json`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        // console.log('deleted successfully');
        props.deleted(props.item.id);
      }
    } catch (err) {
      console.log(err.message);
    }
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
import React from "react";

import classes from "./ExpenseItems.module.css";

const ExpenseItems = (props) => {
  return (
    <div className={classes.item}>
      <span>{props.item.type}</span>
      <span>Rs {props.item.amount}</span>
      <span>{props.item.description}</span>
    </div>
  );
};

export default ExpenseItems;
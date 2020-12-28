import React, { useState } from "react";
import { Ingredient } from "../interfaces/interfaces";

import Card from "../UI/Card";
import LoadingIndicator from "../UI/LoadingIndicator";
import "./IngredientForm.css";

interface Prop {
  onAddItem : (ingredient : Ingredient) => void;
  loading : boolean;
}


const IngredientForm = React.memo((props :Prop ) => {
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onAddItem({title:title , amount :amount});
  };

  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value )
              }
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(event) =>
                setAmount(event.target.value )
              }
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.loading && <LoadingIndicator/>}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;

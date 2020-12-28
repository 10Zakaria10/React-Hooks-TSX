import React from 'react';
import { Ingredient } from "../interfaces/interfaces";

import './IngredientList.css';


interface Prop {
  ingredients : Ingredient[];
  onRemoveItem : (id :string | undefined) => void;
}
const IngredientList = (props:Prop) => {
  return (
    <section className="ingredient-list">
      <h2>Loaded Ingredients</h2>
      <ul>
        {props.ingredients.map((ig : Ingredient) => (
          <li key={ig.id} onClick={ () => props.onRemoveItem(ig.id)}>
            <span>{ig.title}</span>
            <span>{ig.amount}x</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IngredientList;

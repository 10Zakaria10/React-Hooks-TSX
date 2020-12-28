import { type } from "os";
import React, { useEffect, useState, useCallback, useReducer } from "react";
import { Ingredient } from "../interfaces/interfaces";
import ErrorModal from "../UI/ErrorModal";
import LoadingIndicator from "../UI/LoadingIndicator";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

const Ingredients:React.FC = () => {
  type IngredientActions =
    | { type: "SET"; ingredients: Ingredient[] }
    | { type: "ADD"; ingredient: Ingredient }
    | { type: "DELETE"; id: string | undefined };

  type HttpStatusActions =
    | { type: "SEND"; }
    | { type: "RESPONSE";}
    | { type: "ERROR";}
    | { type: "CLOSE";};


  interface HttpState {
    loading: boolean;
    error: string | null;
  }

  const ingredientsReducer = (
    currentIngredients: Ingredient[],
    actions: IngredientActions
  ) => {
    switch (actions.type) {
      case "SET":
        return actions.ingredients;
      case "ADD":
        return [...currentIngredients, actions.ingredient];
      case "DELETE":
        return currentIngredients.filter((ing) => ing.id !== actions.id);
      default:
        throw new Error("Something went wrong !");
    }
  };

  const httpReducer = (httpState: HttpState, actions: HttpStatusActions) => {
    switch (actions.type) {
      case "SEND":
        return { loading: true, error: null };
      case "RESPONSE":
        return { loading: false, error: null };
      case "ERROR":
        return { loading: false, error: "Something went wrong !" };
        case "CLOSE" : 
        return { loading: false, error: null };
    }
  };
  const [ingredients, dispatch] = useReducer(ingredientsReducer, []);
  //const [loading, setLoading] = useState<boolean>(false);
  //const [errors, setErrors] = useState<string | null>(null);
  const [httpStatus, dispatchHttpStatus] = useReducer(httpReducer, {loading :false , error : null});

  const onLoadIngredients = useCallback((userIngredients: Ingredient[]) => {
    dispatch({ type: "SET", ingredients: userIngredients });
  }, []);

  const onRemoveItem = (id: string | undefined) => {
    dispatchHttpStatus({type:'SEND'});
    fetch(
      `https://react-hooks-update-699f9.firebaseio.com/ingredients/${id}.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        dispatch({ type: "DELETE", id: id });
        dispatchHttpStatus({type:'RESPONSE'});
      })
      .catch((error) => {
        dispatchHttpStatus({type:'ERROR'});
      });
  };
  const onAddItem = (ing: Ingredient) => {
    dispatchHttpStatus({type:'SEND'});
    fetch("https://react-hooks-update-699f9.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify(ing),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        const ingredient = { ...ing, id: data.name };
        dispatch({ type: "ADD", ingredient: ingredient });
        dispatchHttpStatus({type:'RESPONSE'});
      })
      .catch((error) => {
        dispatchHttpStatus({type:'ERROR'});
      });
  };

  const onClose = () => {
    dispatchHttpStatus({type:'CLOSE'});

  };
  return (
    <div className="App">
      {httpStatus.error && <ErrorModal onClose={onClose}>{httpStatus.error}</ErrorModal>}
      <IngredientForm onAddItem={onAddItem} loading={httpStatus.loading} />

      <section>
        <Search onLoadIngredients={onLoadIngredients} />
        <IngredientList onRemoveItem={onRemoveItem} ingredients={ingredients} />
      </section>
    </div>
  );
}

export default Ingredients;

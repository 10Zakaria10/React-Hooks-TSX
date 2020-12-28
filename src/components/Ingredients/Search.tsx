import React, { useEffect, useRef, useState } from "react";
import { Ingredient } from "../interfaces/interfaces";

import Card from "../UI/Card";
import "./Search.css";

interface Prop {
  onLoadIngredients: (ingredients: Ingredient[]) => void;
}

const Search = React.memo((props: Prop) => {
  const [entredFilter, setEntredFitlre] = useState<string>("");
  const { onLoadIngredients } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (entredFilter === inputRef.current?.value) {
        const query =
          entredFilter?.length === 0
            ? ""
            : `?orderBy="title"&equalTo="${entredFilter}"`;
        fetch(
          "https://react-hooks-update-699f9.firebaseio.com/ingredients.json" +
            query
        )
          .then((response) => response.json())
          .then((responseData) => {
            const userIngredients: Ingredient[] = [];
            for (const key in responseData) {
              userIngredients.push({
                id: key,
                title: responseData[key].title,
                amount: responseData[key].amount,
              });
            }
            onLoadIngredients(userIngredients);
          });
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [entredFilter, onLoadIngredients, inputRef]);

  return (
    <section className="search">
      <Card>
        <div> {String(true)}</div>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={inputRef}
            type="text"
            value={entredFilter}
            onChange={(event) => setEntredFitlre(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;

import React from "react";

import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";
import css from "../header.module.css";
import mealsImg from "../../../assets/meals.jpeg";

const Meals = (props) => {
  return (
    <>
      <div className={css["main-image"]}>
        <img src={mealsImg} alt="table filled with foods" />
      </div>
      <MealsSummary />
      <AvailableMeals />
    </>
  );
};

export default Meals;

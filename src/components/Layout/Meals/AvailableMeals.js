import MealItem from "./MealItem/MealItem";
import css from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";
import { IonCard, IonCardContent, IonList } from "@ionic/react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchMealsData = async () => {
      setIsFetchingData(true);
      const fetchResponse = await fetch(
        "https://practiceproject-foodorderapp-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      ).catch((error) => {
        console.log(error);
        throw new Error("Something went wrong.");
      });

      const mealsData = await fetchResponse.json();

      let mealsArray = [];

      for (const key in mealsData) {
        const mealData = {
          id: key,
          ...mealsData[key],
        };

        mealsArray.push(mealData);
      }

      setMeals(mealsArray);
      setIsFetchingData(false);
    };

    fetchMealsData().catch((error) => {
      setIsFetchingData(false);
      setErrorMsg(`${error.message}`);
    });
  }, []);

  const mealsList = meals.map((meal) => <MealItem key={meal.id} {...meal} />);
  const statusText = errorMsg !== null ? errorMsg : "Loading...";

  return (
    <IonCard>
      <IonCardContent>
        {!isFetchingData && !errorMsg ? (
          <IonList className={`${css.ul} ion-no-padding`}>{mealsList}</IonList>
        ) : (
          <p style={{ textAlign: "center" }}>{statusText}</p>
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default AvailableMeals;

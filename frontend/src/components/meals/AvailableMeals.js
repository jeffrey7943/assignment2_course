import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import styles from "./AvailableMeals.module.css";
import MealItem from "./meal_items/MealItem";

const AvailableMeals = () => {
  const [getMeals, setGetMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMeals = async () => {
      setLoading(true);
      const response = await fetch(
        "https://react-course-15e7e-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      );

      if (!response.ok) {
        throw new Error("SOMETHING WENT WRONG");
      }

      const data = await response.json();
      const meals = [];

      for (const key in data) {
        meals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setGetMeals(meals);
      setLoading(false);
    };

    getMeals().catch((err) => {
      setLoading(false);
      setError(err.message);
    });
  }, []);

  if (loading) {
    return (
      <section className={styles.MealsLoading}>
        <p>LOADING!</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.error}>
        <p>{error}</p>
      </section>
    );
  }

  const mealsList = getMeals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      title={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <>
      <section className={styles.meals}>
        <Card>
          <ul>{mealsList}</ul>
        </Card>
      </section>
    </>
  );
};

export default AvailableMeals;

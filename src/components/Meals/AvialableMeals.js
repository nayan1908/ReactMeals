import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getMeals = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL);
            const responseData = await response.json();
            
            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            let mealsData = [];
            for (let key in responseData) {
                mealsData.push({ id: key, name: responseData[key].name, description: responseData[key].description, price: responseData[key].price });
            }
            setMeals(mealsData);
            setIsLoading(false);
        }
        getMeals().catch((err) => setError(err.message));
    }, []);

    if(error){
        return <section><p className={classes['error-text']}>{error}</p></section>
    }

    if(isLoading){
        return <section><p className={classes.loader}>Loading...</p></section>
    }
    const mealsList = meals.map((meal) => (
        <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    ));
    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;

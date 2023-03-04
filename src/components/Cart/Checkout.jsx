import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isSixChars = (value) => value.trim().length === 6;

const Checkout = (props) => {
    const [formIsValid, setFormIsValid] = useState(false);
    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        postal_code: true,
        city: true,
    });
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postCodeInputRef = useRef();
    const cityInputRef = useRef();

    const formSubmitHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const nameIsValid = !isEmpty(enteredName);
        const streetIsValid = !isEmpty(enteredStreet);
        const postalCodeIsValid = isSixChars(enteredPostalCode);
        const cityIsValid = !isEmpty(enteredCity);

        setFormInputValidity({
            name: nameIsValid,
            street: streetIsValid,
            postal_code: postalCodeIsValid,
            city: cityIsValid,
        });

        if (nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid) {
            setFormIsValid(true);
        }

        if (!formIsValid) {
            return;
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postalCode: enteredPostalCode,
            city: enteredCity,
        });
    };

    const nameInputClasses = `${classes.control} ${
        formInputValidity.name ? "" : classes.invalid
    }`;
    const streetInputClasses = `${classes.control} ${
        formInputValidity.street ? "" : classes.invalid
    }`;
    const postCodeInputClasses = `${classes.control} ${
        formInputValidity.postal_code ? "" : classes.invalid
    }`;
    const cityInputClasses = `${classes.control} ${
        formInputValidity.city ? "" : classes.invalid
    }`;

    return (
        <form className={classes.form} onSubmit={formSubmitHandler}>
            <div className={nameInputClasses}>
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" ref={nameInputRef} />
                {!formInputValidity.name && <p>Please enter a valid name</p>}
            </div>
            <div className={streetInputClasses}>
                <label htmlFor="street">Street</label>
                <input type="text" id="street" ref={streetInputRef} />
                {!formInputValidity.street && (
                    <p>Please enter a valid street</p>
                )}
            </div>
            <div className={postCodeInputClasses}>
                <label htmlFor="postal">Postal Code</label>
                <input type="text" id="postal" ref={postCodeInputRef} />
                {!formInputValidity.postal_code && (
                    <p>Please enter valid post code (6 characters)</p>
                )}
            </div>
            <div className={cityInputClasses}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" ref={cityInputRef} />
                {!formInputValidity.city && <p>Please enter a valid city</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.cancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;

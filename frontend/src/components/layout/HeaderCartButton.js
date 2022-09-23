import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../cart/CartIcon";
import styles from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btn, setBtn] = useState(false);
  const cart = useContext(CartContext);

  const number = cart.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const { items } = cart;

  const btnClasses = `${styles.button} ${btn ? styles.bump : ""}`;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtn(true);
    const timer = setTimeout(() => {
      setBtn(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <>
      <button className={btnClasses} onClick={props.onClick}>
        <span className={styles.icon}>
          <CartIcon />
        </span>
        <span>YOUR CART</span>
        <span className={styles.badge}>{number}</span>
      </button>
    </>
  );
};

export default HeaderCartButton;

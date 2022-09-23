import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [checkout, setCheckout] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setSubmit(true);
    await fetch(
      "https://react-course-15e7e-default-rtdb.asia-southeast1.firebasedatabase.app/order.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setSubmit(false);
    setConfirm(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onClose}>
        CLOSE
      </button>
      {hasItems && (
        <button className={styles.button} onClick={orderHandler}>
          ORDER
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={styles.total}>
        <span>TOTAL AMOUNT</span>
        <span>{totalAmount}</span>
      </div>
      {checkout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!checkout && modalActions}
    </>
  );

  const isSubmitModal = <p>SENDING ORDER DATA...</p>;

  const didSubmitModalContent = <p>SUCCESS</p>;

  return (
    <Modal onClose={props.onClose}>
      {!submit && !confirm && cartModalContent}
      {submit && isSubmitModal}
      {!submit && confirm && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;

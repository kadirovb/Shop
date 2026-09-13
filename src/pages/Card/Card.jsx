import styles from "./Cart.module.scss";

const Cart = ({ cart, removeFromCart, increaseQuantity, decreaseQuantity }) => {
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  if (cart.length === 0) {
    return (
      <section className={styles.cart}>
        <div className="container">
          <h1>Корзинка пустой</h1>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.cart}>
      <div className={`container ${styles.cart__container}`}>
        <h1>Shopping Cart</h1>

        <div className={styles.cart__items}>
          {cart.map((item) => (
            <div className={styles.cart__item} key={item.id}>
              <img src={item.thumbnail} alt={item.title} />

              <div className={styles.cart__info}>
                <h2>{item.title}</h2>

                <p>${item.price}</p>

                <div className={styles.cart__quantity}>
                  <button onClick={() => decreaseQuantity(item.id)}>−</button>

                  <span>{item.quantity}</span>

                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>

                <button
                  className={styles.cart__remove}
                  onClick={() => removeFromCart(item.id)}
                >
                  Удалить
                </button>
              </div>

              <strong>${(item.price * item.quantity).toFixed(2)}</strong>
            </div>
          ))}
        </div>

        <div className={styles.cart__total}>
          <span>Total:</span>
          <strong>${totalPrice.toFixed(2)}</strong>
        </div>
      </div>
    </section>
  );
};

export default Cart;

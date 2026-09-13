import styles from "./ProductCard.module.scss";

const ProductCard = ({ product, onClick, addToCart }) => {
  return (
    <article className={styles.productCard} onClick={onClick}>
      <div className={styles.productCard__image}>
        <img src={product.thumbnail} alt={product.title} />
      </div>

      <div className={styles.productCard__content}>
        <span className={styles.productCard__category}>{product.category}</span>

        <h3 className={styles.productCard__title}>{product.title}</h3>

        <p className={styles.productCard__description}>{product.description}</p>

        <div className={styles.productCard__info}>
          <strong>${product.price}</strong>

          <span>⭐ {product.rating}</span>
        </div>

        <div className={styles.productCard__bottom}>
          <span>Stock: {product.stock}</span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
          >
            Купить
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;

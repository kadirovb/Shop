import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ProductDetails.module.scss";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <section className={styles.details}>
      <div className={`container ${styles.details__container}`}>

        <button
          className={styles.details__back}
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className={styles.details__product}>
          <img
            src={product.thumbnail}
            alt={product.title}
          />

          <div className={styles.details__content}>
            <span>{product.category}</span>

            <h1>{product.title}</h1>

            <p>{product.description}</p>

            <h2>${product.price}</h2>

            <p>⭐ {product.rating}</p>
            <p>Stock: {product.stock}</p>
            <p>Brand: {product.brand}</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProductDetails;
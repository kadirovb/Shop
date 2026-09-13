import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./Products.module.scss";

const Products = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const productsPerPage = 12;

  // Backenddan mahsulotlarni olish
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "https://dummyjson.com/products?limit=100"
        );

        if (!response.ok) {
          throw new Error("Backend xatosi");
        }

        const data = await response.json();

        setProducts(data.products);
      } catch (error) {
        console.error("Products error:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  // Search
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  // Sort
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "name") {
      return a.title.localeCompare(b.title);
    }

    if (sort === "price") {
      return a.price - b.price;
    }

    if (sort === "stock") {
      return b.stock - a.stock;
    }

    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(
    sortedProducts.length / productsPerPage
  );

  const startIndex =
    (currentPage - 1) * productsPerPage;

  const endIndex =
    startIndex + productsPerPage;

  const currentProducts = sortedProducts.slice(
    startIndex,
    endIndex
  );

  // Search o'zgarganda 1-sahifaga qaytish
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  // Sort o'zgarganda 1-sahifaga qaytish
  const handleSort = (e) => {
    setSort(e.target.value);
    setCurrentPage(1);
  };

  // Loading
  if (loading) {
    return (
      <section className={styles.products}>
        <div className="container">
          <h2>Loading...</h2>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.products}>
      <div
        className={`container ${styles.products__container}`}
      >
        {/* Search + Sort */}
        <div className={styles.products__top}>
          <select
            className={styles.products__select}
            value={sort}
            onChange={handleSort}
          >
            <option value="">Sort by</option>
            <option value="name">
              Sort by name
            </option>
            <option value="price">
              Sort by price
            </option>
            <option value="stock">
              Sort by stock
            </option>
          </select>

          <input
            className={styles.products__search}
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={handleSearch}
          />
        </div>

        {/* Products */}
        <div className={styles.products__grid}>
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() =>
                navigate(`/products/${product.id}`)
              }
              addToCart={addToCart}
            />
          ))}
        </div>

        {/* Product topilmasa */}
        {currentProducts.length === 0 && (
          <h2>Product not found</h2>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            className={styles.products__pagination}
          >
            {/* Previous */}
            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(currentPage - 1)
              }
            >
              ←
            </button>

            {/* Pages */}
            {Array.from(
              { length: totalPages },
              (_, index) => (
                <button
                  key={index}
                  className={
                    currentPage === index + 1
                      ? styles.active
                      : ""
                  }
                  onClick={() =>
                    setCurrentPage(index + 1)
                  }
                >
                  {index + 1}
                </button>
              )
            )}

            {/* Next */}
            <button
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                setCurrentPage(currentPage + 1)
              }
            >
              →
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
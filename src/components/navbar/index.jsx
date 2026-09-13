import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";

const Navbar = ({ cartCount }) => {
  return (
    <header className={styles.navbar}>
      <div className={`container ${styles.navbar__container}`}>
        <div className={styles.navbar__logo}>Корзинка</div>

        <nav className={styles.navbar__menu}>
          <Link to="/">Главная</Link>
          <a href="#">Категории</a>
          <a href="#">Скидки</a>
          <a href="#">Контакты</a>
          <a href="#">О нас</a>
        </nav>

        <Link to="/cart" className={styles.navbar__cart}>
          🛒
          <span>{cartCount}</span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;

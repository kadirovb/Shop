import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footer__container}`}>

        <div className={styles.footer__logo}>
          Корзинка
        </div>

        <nav className={styles.footer__menu}>
          <a href="#">Главная</a>
          <a href="#">Категории</a>
          <a href="#">Скидки</a>
          <a href="#">Контакты</a>
        </nav>

        <p className={styles.footer__copy}>
          © 2026 Nike. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;
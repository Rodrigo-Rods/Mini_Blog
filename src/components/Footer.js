import styles from './Footer.module.css'; //Importando o CSS do Footer.module.css

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h3>Escreva sobre o que você tem interesse!</h3>
      <p>Mini Blog &copy; 2023</p> {/* &copy; = © */}
    </footer>
  )
}

export default Footer
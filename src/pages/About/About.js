//Importando o CSS do About.module.css
import styles from './About.module.css';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className={styles.about}>

      <h2>Sobre o Mini <span>BLOG</span></h2>
      <p>Um blog feito com react no front-end, 2 litros de lagrimas de sapo e Firabse no back-end</p>

      <Link to="/posts/create" className='btn'> Crie um post </Link>
    </div>
  )
}

export default About
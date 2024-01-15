// importando CSS do Search.module.css
import styles from './Search.module.css';

//Hooks
import { useFetchDocuments } from '../../hooks/useFetchDecuments';
import { useQuery } from '../../hooks/useQuery';

//Components
import PostDetail from '../../components/PostDetail';
import { Link } from 'react-router-dom';

const Search = () => {
    const query = useQuery();
    const Search = query.get('q'); //q é a query que está sendo passada na URL

    const { documents: posts } = useFetchDocuments('posts', Search); // É onde está sendo feita a busca

    return (
        <div className={styles.search_container} >
            <h2>Resultados da tag: {Search}</h2>
            <div>
                {posts && posts.length === 0 && (
                    <div className={styles.nopost}>
                        <p>Nenhum post foi encontrado... 😞</p>
                        <Link to='/' className='btn-outline'>
                            Voltar para a página inicial
                        </Link>
                    </div>
                )}
                {posts && posts.map((post) => (<PostDetail key={post.id} post={post} />))}
            </div>
        </div>
    );
};

export default Search
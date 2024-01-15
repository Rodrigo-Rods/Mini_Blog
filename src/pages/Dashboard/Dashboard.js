// Importando o CSS do Dashboard.module.css
import styles from './Dashboard.module.css';

import { Link } from 'react-router-dom';

//Hooks
import { useAuthValue } from '../../context/AuthContext'

import { useFetchDocuments } from '../../hooks/useFetchDecuments';

import { useDeleteDocument } from '../../hooks/useDeleteDocument';

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;
  const { documents: posts, loading } = useFetchDocuments('posts', null, uid);
  const { deleteDocument } = useDeleteDocument('posts');

  if (loading) { return <p>Carregando a dashboard...</p> }

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Gerencie os seus posts</p>
      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Nenhum post foi encontrado 😞</p>
          <Link to="/posts/create" className="btn-outline">Crie seu primeiro post</Link></div>
      ) : (
        <>
          <div className={styles.post_header}>
            <span>Titulo</span>
            <span>Açoes</span>
          </div>
          {posts && posts.map((post) => (
            <div key={post.id} className={styles.post_row}>
              <p>{post.title}</p>
              <div>
                <Link to={`/posts/${post.id}`} className="btn btn-outline">
                  Ver post
                </Link>
                <Link to={`/posts/edit/${post.id}`} className='btn btn-outline'>
                  Editar
                </Link>
                <button onClick={() => deleteDocument(post.id)} className='btn btn-outline btn-danger'>
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default Dashboard
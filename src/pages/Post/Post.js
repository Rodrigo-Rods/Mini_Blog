import styles from './Post.module.css'

//hooks
import { useParams } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument'

const Post = () => {
    const { id } = useParams() // Pegando o id do post
    const { document: post, loading } = useFetchDocument('posts', id) // Pegando o post pelo id

    return (
        <div className={styles.post_container}>
            {loading && <p>Carregando post...</p>}
            {post && (
                <>
                    <h1>{post.title}</h1>
                    <img src={post.image} alt={post.title} />
                    <p className={styles.createdBy}>Criado por: {post.createdBy}</p>
                    <p>{post.body}</p>
                    <h3>Hashtags do post:</h3>
                    <div className={styles.tags}>
                        {post.tagsArray.map((tag) => (
                            <p key={tag}>
                                <span>#</span>
                                {tag}
                            </p>
                        ))}
                    </div>
                </>)}
        </div>
    )
}

export default Post
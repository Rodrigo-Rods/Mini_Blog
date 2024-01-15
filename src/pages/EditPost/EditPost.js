// Importando o CSS do EditPost.module.css
import styles from './EditPost.module.css';

import { useState, useEffect } from 'react'; // Para manusear os estados dos inputs com o useState e o useEffect para pegar os dados do post
import { useNavigate, useParams } from 'react-router-dom'; // Navigate para redirecionar depois de criar o post e o useParams para pegar o id do post
import { useAuthValue } from '../../context/AuthContext'; // Para pegar o usuário e atrelar ao post
import { useFetchDocument } from '../../hooks/useFetchDocument'; // Para pegar o post do banco de dados e inserir nos inputs
import { useUpdateDocument } from '../../hooks/useUpdateDocument';

const EditPost = () => { // States responsaveis por armazenar os dados do post
    const { id } = useParams(); // useParams da um objeto com os dados que vieram da URL
    const { document: post } = useFetchDocument('posts', id);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState([]); // Array de tags 
    const [formError, setFormError] = useState("");

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setImage(post.image);
            setBody(post.body);
            const textTags = post.tagsArray.join(", ");
            setTags(textTags);
        }
    }, [post]);

    const { user } = useAuthValue(); // Pegando o usuário logado

    const { updateDocument, response } = useUpdateDocument("posts"); // Inserindo o post no banco de dados

    const navigate = useNavigate(); // Redirecionando para a home

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError("");


        try { // validar url da imagem
            new URL(image);
        } catch (error) {
            setFormError("A imagem precisa ser uma URL válida")
        }

        //criar array de tags
        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase()); // Split separa por virgula e Trim remove os espaços em branco


        // checar todos os valores
        if (!title || !image || !body || !tags) {
            setFormError("Preencha todos os campos")
        }
        if (formError) return; // se tiver erro, não insere o post

        const data = {
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName,
        }

        // inserir no banco de dados
        updateDocument(id, data);

        // redirect para home
        navigate("/dashboard")
    };

    return (
        <div className={styles.edit_post}>
            {post && (
                <>
                    <h2>Editar o post: {post.title}</h2>
                    <p>Edite o seu post</p>
                    <form onSubmit={handleSubmit}>
                        <label> {/* Titulo do post */}
                            <span>Título:</span>
                            <input
                                type="text"
                                name='title'
                                required
                                placeholder='Pense em um bom título'
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />
                        </label>
                        <label> {/* URL da imagem do post */}
                            <span>URL da imagem:</span>
                            <input
                                type="text"
                                name='image'
                                required
                                placeholder='Insira a URL da imagem do post '
                                onChange={(e) => setImage(e.target.value)}
                                value={image}
                            />
                        </label>
                        <p className={styles.preview_title}>Preview da imagem:</p>
                        <img
                            className={styles.image_preview}
                            src={post.image}
                            alt={post.title}
                        />
                        <label>{/* Corpo do post */}
                            <span>Conteúdo:</span>
                            <textarea
                                name="body"
                                required
                                placeholder="Insira o conteúdo do post"
                                onChange={(e) => setBody(e.target.value)}
                                value={body}
                            ></textarea>
                        </label>
                        <label> {/* Tags do post */}
                            <span>Tags:</span>
                            <input
                                type="text"
                                name='tags'
                                required
                                placeholder='Insira as tags separadas por vírgula'
                                onChange={(e) => setTags(e.target.value)}
                                value={tags}
                            />
                        </label>

                        {/* Botoes */}
                        {!response.loading && <button className='btn'>Editar</button>}
                        {response && response.loading && (
                            <button className='btn'
                                disabled>
                                Aguarde...
                            </button>
                        )}
                        {response.error && <p className='error'>{response.error}</p>}
                        {formError && <p className='error'>{formError}</p>}
                    </form>
                </>
            )}
        </div>
    )
}

export default EditPost


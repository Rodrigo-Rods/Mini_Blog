// Importando o CSS do CreatePost.module.css
import styles from './CreatePost.module.css';

import { useState } from 'react'; // Para manusear os estados dos inputs
import { useNavigate } from 'react-router-dom'; // Para redirecionar depois de criar o post
import { useAuthValue } from '../../context/AuthContext'; // Para pegar o usuário e atrelar ao post
import { useInsertDocument } from '../../hooks/useInsertDocument'; // Para inserir o post no banco de dados 

const CreatePost = () => { // States responsaveis por armazenar os dados do post

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState([]); // Array de tags 
    const [formError, setFormError] = useState("");

    const { user } = useAuthValue(); // Pegando o usuário logado

    const { insertDocument, response } = useInsertDocument("posts"); // Inserindo o post no banco de dados

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

        // inserir no banco de dados
        insertDocument({
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName,
        });

        // redirect para home
        navigate("/")
    };

    return (
        <div className={styles.create_post}>
            <h2>Criar post</h2>
            <p>Escreva sobre o que quiser e compartilhe o seu conhecimento</p>
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
                {!response.loading && <button className='btn'>Enviar POST</button>}
                {response && response.loading && (
                    <button className='btn'
                        disabled>
                        Aguarde...
                    </button>
                )}
                {response.error && <p className='error'>{response.error}</p>}
                {formError && <p className='error'>{formError}</p>}
            </form>
        </div>
    )
}

export default CreatePost


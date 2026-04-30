import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom";

function ArticleDetail() {
    const [article, setArticle] = useState(null)
    const { id } = useParams()
    const [username, setUsername] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        const user = localStorage.getItem('username')
        if (token) {
            setUsername(user)
        }
    }, [])

    useEffect(() => {
        fetch(`http://localhost:5000/api/posts/${id}`)
        .then ( res => res.json() )
        .then ( data => setArticle(data) )
        .catch ( err => console.log(err) )
    }, [id])

    if (!article) {
        return <div style={{ textAlign: 'center', marginTop: '50px' }}>Article not found</div>
    }

    const moveToCorrect = () => {
        navigate(`/posts/${article.id}/correct`, {
            state: { article: article }
        })
    }

    return (
        <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px' }}>
        <h1>{article.title}</h1>
        <p style={{ color: '#666', marginBottom: '20px' }}>
            Written by: {article.author} | {new Date(article.createdAt).toLocaleDateString()}
        </p>
        <div style={{ 
            backgroundColor: '#f9f9f9', 
            padding: '20px', 
            borderRadius: '8px',
            lineHeight: '1.6'
        }}>
            <p>{article.content}</p>
        </div>
        
        {username ?
            <div style={{ display: 'flex', flexDirection: "row", justifyContent: 'center', gap: '20px' }}>
                <Link to="/article" style={{ display: 'inline-block', marginTop: '20px', color: '#007bff' }}>
                    ← Back to Articles
                </Link>
                <button 
                    onClick={() => moveToCorrect()} 
                    style={{
                        marginTop: '20px',
                        marginLeft: '10px',
                        padding: '8px 16px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        width: '100px',
                        height: '30px'
                    }}
                >
                    Correct
                </button>  
            </div>
            : 
            <div>
                <Link to="/article" style={{ display: 'inline-block', marginTop: '20px', color: '#007bff' }}>
                    ← Back to Articles
                </Link>
            </div>
        }
        </div>
    );
}


export default ArticleDetail
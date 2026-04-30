import { useState } from "react"
import { useLocation, useNavigate, Link } from "react-router-dom"

function CorrectArticle() {
    const location = useLocation()
    const [article, setArticle] = useState(location.state?.article)
    const [title, setTitle] = useState(article?.title || '')
    const [content, setContent] = useState(article?.content || '')

    const navigate = useNavigate()

    const correctArticle = (e) => {
        e.preventDefault()

        setArticle({
            ...article, 
            title: title,
            content: content
        })

        fetch(`http://localhost:5000/api/posts/${article._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({
            title: title,
            content: content
          })
        })
        .then(() => 
          navigate('/article')
        )
        .catch (
          err => console.log(err)
        )
    }

    return (
        <div>
            <div style={formContainerStyle}>
                <h2 style={sectionTitleStyle}>Correct Article</h2>
                <form onSubmit={correctArticle} style={formStyle}>
                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Title:</label>
                    <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={inputStyle}
                    />
                </div>
                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Content:</label>
                    <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows="4"
                    style={textareaStyle}
                    />
                </div>
                <div style={buttonGroupStyle}>
                    <button type="submit" style={submitButtonStyle}>Correct</button>
                </div>
                </form>
            </div>
        </div>
    )
}

const formContainerStyle = {
  backgroundColor: '#f9f9f9',
  borderRadius: '12px',
  padding: '24px',
  margin: '20px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
}

const sectionTitleStyle = {
  fontSize: '20px',
  fontWeight: '600',
  marginBottom: '20px',
  color: '#333'
}

const sectionTitleStyle2 = {
  fontSize: '20px',
  fontWeight: '600',
  marginBottom: '20px',
  color: '#d5d5d5ff'
}

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px'
}

const inputGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px'
}

const labelStyle = {
  fontWeight: '500',
  color: '#555',
  fontSize: '14px'
}

const inputStyle = {
  padding: '10px 12px',
  fontSize: '14px',
  border: '1px solid #ddd',
  borderRadius: '6px',
  outline: 'none',
  transition: 'border-color 0.3s'
}

const textareaStyle = {
  padding: '10px 12px',
  fontSize: '14px',
  border: '1px solid #ddd',
  borderRadius: '6px',
  outline: 'none',
  fontFamily: 'inherit',
  resize: 'vertical'
}

const buttonGroupStyle = {
  display: 'flex',
  gap: '12px',
  marginTop: '8px'
}

const submitButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '500'
}

export default CorrectArticle
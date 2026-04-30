import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Article() {
  const [articles, setArticles] = useState([])
  const navigate = useNavigate()
  const username = localStorage.getItem('username')

  useEffect(() => {
    fetch('http://localhost:5000/api/posts')
    .then(res => res.json())
    .then(data => setArticles(data))
    .catch(err => console.log(err))
  }, [])

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const addArticle = (e) => {
    e.preventDefault()

    if (title === '' || content === '') {
      alert('Enter article...')
      return
    }

    if (!username) {
      alert('Please login to write article')
      return
    }

    const newArticle = {
      title: title,
      content: content,
      author: username
    }

    fetch('http://localhost:5000/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(newArticle)
    })
    .then(res => res.json())
    .then(data => {
      alert('Successfully added your article')
      const updateArticles = [...articles, data]
      setArticles(updateArticles)

      setTitle('')
      setContent('')
    })
    .catch(err => console.log(err))
  }

  const moveDetail = (id) => {
    navigate(`/posts/${id}`)
  }

  const deleteArticle = (id) => {
      fetch(`http://localhost:5000/api/posts/${id}`, {
        method: 'DELETE'
      })
      .then (() =>{
        const updateArticles = articles.filter(article => article._id !== id)
        setArticles(updateArticles)
      })
      .catch ( err => console.log(err) )
  }

  return (
    <div>
      <div style={formContainerStyle}>
        <h2 style={sectionTitleStyle}>Write New Article</h2>
        <form onSubmit={addArticle} style={formStyle}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Title:</label>
            <input
              type="text"
              value={title}
              placeholder="Enter your title..."
              onChange={(e) => setTitle(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Content:</label>
            <textarea
              value={content}
              placeholder="Enter your content..."
              onChange={(e) => setContent(e.target.value)}
              rows="4"
              style={textareaStyle}
            />
          </div>
          <div style={buttonGroupStyle}>
            <button type="submit" style={submitButtonStyle}>Add</button>
            <button 
              type="button"
              onClick={() => {
                setTitle('')
                setContent('')
              }}
              style={resetButtonStyle}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
      <div style={listContainerStyle}>
        <h2 style={sectionTitleStyle2}>Article List ({articles.length})</h2>
        <ul style={listStyle}>
          {articles.map(article => (
            <li key={article._id} style={listItemStyle}>
              <div style={itemNumberStyle} >{articles.indexOf(article) + 1}</div>
              <div style={itemContentStyle}>
                <div style={itemTitleStyle}>{article.title}</div>
                <div style={itemAuthorStyle}>{article.author}</div>
              </div>
              {username ? 
                <div style={itemActionsStyle}>
                  <button style={viewButtonStyle} onClick={() => moveDetail(article._id)}>view</button>
                  <button onClick={() => deleteArticle(article._id)} style={deleteButtonStyle}>Delete</button>  
                </div>
                :
                <div style={itemActionsStyle}>
                  <button style={viewButtonStyle} onClick={() => moveDetail(article._id)}>view</button>  
                </div>
              }
            </li>
          ))}
        </ul>
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

const resetButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#6c757d',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '500'
}

const listContainerStyle = {
  margin: '20px'
}

const listStyle = {
  listStyle: 'none',
  padding: '0',
  margin: '0'
}

const listItemStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px',
  marginBottom: '12px',
  backgroundColor: '#fff',
  border: '1px solid #eee',
  borderRadius: '10px',
  transition: 'box-shadow 0.3s',
  cursor: 'pointer'
}

const itemNumberStyle = {
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#007bff',
  color: 'white',
  borderRadius: '50%',
  fontWeight: '600',
  fontSize: '16px'
}

const itemContentStyle = {
  flex: 1,
  marginLeft: '16px'
}

const itemTitleStyle = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#333',
  marginBottom: '4px'
}

const itemAuthorStyle = {
  fontSize: '12px',
  color: '#888'
}

const itemActionsStyle = {
  display: 'flex',
  gap: '8px'
}

const viewButtonStyle = {
  padding: '6px 12px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '12px'
}

const deleteButtonStyle = {
  padding: '6px 12px',
  backgroundColor: '#d54444ff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '12px'
}

export default Article
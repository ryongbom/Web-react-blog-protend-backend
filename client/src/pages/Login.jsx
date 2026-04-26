import { useState } from "react"

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginUser = (e) => {
        e.preventDefault()

        const userData = {
            email: email,
            password: password
        }

        fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                alert(data.error)
            } else {
                alert('successfully logined!')
                localStorage.setItem('token', data.token)
                localStorage.setItem('username', data.username)
                window.location.href = '/article' 
                setEmail('')
                setPassword('')
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div style={containerStyle}>
            <h2 style={titleStyle}>Login</h2>
            <form onSubmit={loginUser} style={formStyle}>
                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@email.com"
                        style={inputStyle}
                    />
                </div>
                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="********"
                        style={inputStyle}
                    />
                </div>
                <button type="submit" style={buttonStyle}>Login</button>
            </form>
        </div>
    )
}

const containerStyle = {
    width: '700px',
    margin: '50px auto',
    padding: '30px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
}

const titleStyle = {
    textAlign: 'center',
    marginBottom: '24px',
    color: '#333',
    fontSize: '24px'
}

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
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
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    outline: 'none',
    transition: 'border-color 0.3s'
}

const buttonStyle = {
    padding: '12px',
    fontSize: '16px',
    fontWeight: '600',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '10px'
}

export default Login
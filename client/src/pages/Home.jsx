function Home() {
    const username = localStorage.getItem('username')
    
    return (
        <div style={containerStyle}>
            <div style={heroStyle}>
                <h1 style={titleStyle}>Mini Blog</h1>
                <p style={subtitleStyle}>Share your stories with the world</p>
                
                {!username ? (
                    <div style={buttonGroupStyle}>
                        <a href="/register" style={primaryButtonStyle}>Get Started</a>
                        <a href="/login" style={secondaryButtonStyle}>Sign In</a>
                    </div>
                ) : (
                    <div style={welcomeStyle}>
                        <p>Welcome back, <strong>{username}</strong>!</p>
                        <a href="/article" style={primaryButtonStyle}>Go to Articles</a>
                    </div>
                )}
            </div>
        </div>
    )
}

const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh'
}

const heroStyle = {
    textAlign: 'center',
    maxWidth: '600px',
    padding: '40px'
}

const titleStyle = {
    fontSize: '48px',
    fontWeight: '700',
    color: '#333',
    marginBottom: '16px',
    letterSpacing: '-1px'
}

const subtitleStyle = {
    fontSize: '18px',
    color: '#666',
    marginBottom: '32px'
}

const buttonGroupStyle = {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center'
}

const primaryButtonStyle = {
    display: 'inline-block',
    padding: '12px 28px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer'
}

const secondaryButtonStyle = {
    display: 'inline-block',
    padding: '12px 28px',
    backgroundColor: 'transparent',
    color: '#007bff',
    textDecoration: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '500',
    border: '1px solid #007bff',
    cursor: 'pointer'
}

const welcomeStyle = {
    backgroundColor: '#f8f9fa',
    padding: '20px 40px',
    borderRadius: '8px'
}

export default Home
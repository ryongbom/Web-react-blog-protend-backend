import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>😵 404</h1>
            <h2>Can not found page...</h2>
            <p>주소가 잘못되었거나 페지가 삭제되였습니다.</p>
            <Link to="/" style={{ color: '#007bff' }}>
                🏠 Back to Home
            </Link>
        </div>
    )
}

export default NotFound
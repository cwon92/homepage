import { Link } from 'react-router-dom'

function Main() {
  return(
      <nav className="nav">
        <Link to="/">홈</Link>
        <Link to="/list">게시판</Link>
      </nav>
  )
}

export default Main;
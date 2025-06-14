import { Link } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <div className="top-bar">
        <div className="auth-buttons">
          <a href="#" className="auth">התחבר</a>
          <a href="#" className="auth signup">הרשמה</a>
        </div>
        <div className="logo">👑 CheckMate</div>
      </div>
      <nav>
        <Link to="/new" className="button">יצירת פרויקט חדש</Link>
        <Link to="/dashboard" className="text-green-400 hover:underline ml-4">Dashboard</Link>
        <a href="#">הפרויקטים שלי</a>
        <a href="#">קצת עלינו</a>
        <a href="#">צור קשר</a>
        <a href="#">הוספתי משהו חדש</a>
      </nav>
    </header>
  );
}

export default Header;

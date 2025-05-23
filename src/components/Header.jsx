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
        <a href="new_project.html" className="button">יצירת פרויקט חדש</a>
        <a href="#">הפרויקטים שלי</a>
        <a href="#">קצת עלינו</a>
        <a href="#">צור קשר</a>
        <a href="#">הוספתי משהו חדש</a>
      </nav>
    </header>
  );
}

export default Header;

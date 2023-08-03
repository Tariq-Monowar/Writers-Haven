import NabBar from "./layOut/Navbar";
import './style/Header.css'
const Header = () => {
  return (
    <>
      <header className="headers">
        <NabBar />
        <div className="webTitle">
            <h1>Writer's Haven</h1>
        </div>
      </header>
    </>
  );
};

export default Header;

import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";

function Header() {
  return (
    <header>
      <Link to="/">Pizza Delivery App</Link>
      <SearchOrder />
      <p>Yurii</p>
    </header>
  );
}

export default Header;

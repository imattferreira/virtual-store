// TODO create unit tests
import { FiShoppingCart } from "react-icons/fi";
import Link from "../Link";

import { CartButton, Header, Logo } from "./styles";

function HeaderComponent() {
  return (
    <Header>
      <Link link="/">
        <Logo>
          <span>V</span>
          <span>S</span>
        </Logo>
      </Link>
      <CartButton aria-label="open cart">
        <FiShoppingCart />
      </CartButton>
    </Header>
  );
}

export default HeaderComponent;

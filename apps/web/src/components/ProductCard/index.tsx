import { FiShoppingCart } from "react-icons/fi";
import { Container } from "./styles";

type ProductCardProps = {
  image: string;
  link: string;
  price: number;
  title: string;
};

function ProductCard({}: Partial<ProductCardProps>) {
  return (
    <Container>
      <img
        src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spacegray-select-202110?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1632788574000"
        alt=""
        width="190"
        height="190"
      />
      <div>
        <h3>
          Macbook PRO 16 polegadas 32 de RAM e m1 pro max asda asdadasdas dsad
          sadasd sdasdsadasd asdasdsa asdasdsa sadasd asd{" "}
        </h3>
        <p>R$ 14.900,99</p>
        <button aria-label="open cart">
          <span>Adicionar</span>
          <FiShoppingCart />
        </button>
      </div>
    </Container>
  );
}

export default ProductCard;

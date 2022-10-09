import { FiShoppingCart } from "react-icons/fi";
import Link from "../Link";
import { Container } from "./styles";

type ProductCardProps = {
  image: string;
  slug: string;
  price: number;
  name: string;
};

function ProductCard({ image, name, price, slug }: ProductCardProps) {
  return (
    <Link link={`/product/${slug}`}>
      <Container>
        <article>
          <img
            src={image}
            alt={`imagem do produto ${name}`}
            width="190"
            height="190"
          />
          <div>
            <h3>{name}</h3>
            {/* TODO format better */}
            <p>R$ {price}</p>
            <button aria-label="open cart">
              <span>Adicionar</span>
              <FiShoppingCart />
            </button>
          </div>
        </article>
      </Container>
    </Link>
  );
}

export default ProductCard;

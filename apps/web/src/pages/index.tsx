import type { GetStaticProps } from "next";
import ProductCard from "../components/ProductCard";
import { Product } from "../entities/Product";
import ProductRepository from "../HttpRepository/ProductRepository";

type PageProps = {
  products: Product[];
};

function HomePage({ products }: PageProps) {
  return (
    <div>
      <div>
        {products.map(({ id, name, price }) => (
          <ProductCard
            key={id}
            name={name}
            image="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spacegray-select-202110?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1632788574000"
            slug=""
            price={price}
          />
        ))}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const { products } = await ProductRepository.getAll();

  return {
    props: { products },
    revalidate: 60,
  };
};

export default HomePage;

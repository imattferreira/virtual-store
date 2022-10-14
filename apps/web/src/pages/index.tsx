import type { GetStaticProps } from "next";
import ProductCard from "../components/ProductCard";
import type { Product } from "../app/entities/Product";
import ProductRepository from "../app/HttpRepository/ProductRepository";
import VirtualGridList from "../components/VirtualGridList";

type PageProps = {
  products: Product[];
};

function HomePage({ products }: PageProps) {
  // TODO implement SWR

  return (
    <div>
      <VirtualGridList<Product>
        cols={5}
        items={products}
        render={({ id, name, price }) => (
          <ProductCard
            key={id}
            image="test"
            name={name}
            price={price}
            slug="slggg"
          />
        )}
      />
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

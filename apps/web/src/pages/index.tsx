import type { GetStaticProps } from "next";
import ProductCard from "../components/ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  brandId: string;
  createdAt: string;
  updatedAt: string;
}

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
  try {
    // TODO create HttpClient
    const response = await fetch("http://localhost:3333/products");

    // TODO create HttpRepository
    const { products } = (await response.json()) as { products: Product[] };

    return {
      props: { products },
      revalidate: 60,
    };
  } catch {
    return {
      props: {
        products: [],
      },
      revalidate: 30,
    };
  }
};

export default HomePage;

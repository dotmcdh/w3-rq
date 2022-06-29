import { useState } from "react";
import { useQuery } from "react-query";

const getProducts = async (page: number) => {
  const rest = await fetch(
    `https://naszsklep-api.vercel.app/api/products/${page}`
  );
  const data: ProductApi = await rest.json();
  return data;
};

export const ProductsPage = () => {
  const [page, setPage] = useState(1);

  const { isLoading, data, error } = useQuery(["products", page], () =>
    getProducts(page)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || error) {
    return <div>Error#!</div>;
  }

  return (
    <>
      <li>{data.title}</li>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </>
  );
};

export default ProductsPage;

interface ProductApi {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

interface Rating {
  rate: number;
}

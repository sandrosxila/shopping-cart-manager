import { query } from "@/apollo-client";
import {GetProductsDocument} from '@/generated/graphql';
import { ProductCard } from "@/components/product-card";

export default async function Home() {
  const { data } = await query({ 
    query: GetProductsDocument ,
    context: {
      fetchOptions: {
        next: { revalidate: 5 },
      },
    },
  });

  const products = data.getProducts?.products || []; 
  
  return (
    <div className="container flex grow justify-center w-full self-center">
      <div className="grid grid-cols-3 gap-4">
        {
          products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        }
      </div>
    </div>
  );
}

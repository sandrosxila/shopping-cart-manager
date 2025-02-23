import { PreloadQuery } from "@/apollo-client";
import { GetProductsDocument } from "@/generated/graphql";
import { Products } from "@/components/products";

export const dynamic = 'force-dynamic';

export default async function Home() {
  return (
    <div className="container flex grow justify-center w-full self-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <PreloadQuery query={GetProductsDocument}>
          <Products />
        </PreloadQuery>
      </div>
    </div>
  );
}

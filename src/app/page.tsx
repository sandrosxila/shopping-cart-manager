import { CartActions } from "@/components/cart-actions";
import { query } from "@/apollo-client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {GetProductsDocument, Product} from '@/generated/graphql';

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
    <div className="container flex justify-center">
      <div className="grid grid-cols-3 gap-4">
        {
          products.map(product => (
            <Card key={product._id}>
              <CardHeader>
                <CardTitle>{product.title}</CardTitle>
                <CardDescription>${product.cost}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {product.availableQuantity}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {product.isArchived ? "Archived" : "Is not Archived"}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <CartActions productId={product._id}/>
              </CardFooter>
            </Card>
          ))
        }
      </div>
    </div>
  );
}

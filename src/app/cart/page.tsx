import { CartActions } from "@/components/cart-actions";
import { query } from "@/apollo-client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {GetCartItemsDocument, GetProductsDocument, Product} from '@/generated/graphql';

export default async function Cart() {
  const { data } = await query({ 
    query: GetCartItemsDocument ,
    context: {
      fetchOptions: {
        next: { revalidate: 5 },
      },
    },
  });

  const items = data.getCart?.items || [];
  
  return (
    <div className="container flex justify-center">
      <div className="grid grid-cols-3 gap-4">
        {
          items.map(item => (
            <Card key={item._id}>
              <CardHeader>
                <CardTitle>{item.product.title}</CardTitle>
                <CardDescription>${item.product.cost}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {item.quantity}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {item.product.availableQuantity}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <CartActions productId={item._id}/>
              </CardFooter>
            </Card>
          ))
        }
      </div>
    </div>
  );
}

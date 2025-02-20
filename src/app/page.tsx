import styles from "./page.module.css";
import { query } from "@/apollo-client";
import {GetProductsDocument, Product} from '@/generated/graphql';

export default async function Home() {
  const { data } = await query<Product>({ 
    query: GetProductsDocument ,
    context: {
      fetchOptions: {
        next: { revalidate: 5 },
      },
    },
  });
  
  return (
    <div className={styles.page}>
      <pre>
      {JSON.stringify(data, null, 4)}
      </pre>
    </div>
  );
}

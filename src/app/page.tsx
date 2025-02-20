import Image from "next/image";
import styles from "./page.module.css";
import { getClient, query } from "@/apollo-client";
import { GET_PRODUCTS } from "@/queries/products";

export default async function Home() {
  const { data } = await query({ 
    query: GET_PRODUCTS ,
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

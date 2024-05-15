import Collections from "@/components/Collections";
import ProductList from "@/components/ProductList";
import Image from "next/image";
import { Roboto_Slab } from 'next/font/google';

const roboto_Slab = Roboto_Slab({
  subsets: ['cyrillic'],
  weight: "300"
});

export default function Home() {
  return (
    <>
      <main className={roboto_Slab.className}>  
        <Image src="/banner.png" alt="banner" width={2000} height={1000} className="w-screen" />
        <Collections/>
        <ProductList/>
        
      </main>
    </>
  );
}

export const dynamic = "force-dynamic";

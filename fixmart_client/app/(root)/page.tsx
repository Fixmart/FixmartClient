import Collections from "@/components/Collections";
import ProductList from "@/components/ProductList";
import Image from "next/image";
import { Playfair_Display } from 'next/font/google';

const playfair_display = Playfair_Display({
  subsets: ['cyrillic'],
  weight: "700"
});

export default function Home() {
  return (
    <>
      <main className={playfair_display.className}>  
        <Image src="/banner.png" alt="banner" width={2000} height={1000} className="w-screen" />
        <Collections/>
        <ProductList/>
        
      </main>
    </>
  );
}

export const dynamic = "force-dynamic";

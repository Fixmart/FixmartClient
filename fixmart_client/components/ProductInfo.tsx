"use client";

import { useState,useEffect } from "react";
import HeartFavorite from "./HeartFavorite";
import { MinusCircle, PlusCircle } from "lucide-react";
import Link from "next/link";
import useCart from "@/lib/hooks/useCart";

const ProductInfo = ({ productInfo }: { productInfo: ProductType }) => {
  
 
  const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([]); 
  const [quantity, setQuantity] = useState<number>(1);

  const cart = useCart();

  const getProductsByHSNCode = async (hsnCode: string, currentProductId: string) => {
    try {
      const products = await fetch(`your_api_endpoint_here?hsnCode=${hsnCode}&excludeId=${currentProductId}`);
      const data = await products.json();
      return data.products; 
    } catch (error) {
      console.error('Error fetching related products:', error);
      return [];
    }
  };
   // Fetch related products by HSN code
   useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const products = await getProductsByHSNCode(productInfo.HSNCode, productInfo._id);
        setRelatedProducts(products);
      } catch (error) {
        console.error('Error fetching related products:', error);
      }
    };

    fetchRelatedProducts();
  }, [productInfo]); // Run effect when productInfo changes


  return (
    <div className="max-w-[400px] flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="text-heading3-bold">{productInfo.title}</p>
        <HeartFavorite product={productInfo} />
      </div>

      <div className="flex gap-2">
        <p className="text-base-medium text-grey-2">Category:</p>
        <p className="text-base-bold">{productInfo.category}</p>
      </div>

      <p className="text-heading3-bold">$ {productInfo.price}</p>

      <div className="flex flex-col gap-2">
        <p className="text-base-medium text-grey-2">Description:</p>
        <p className="text-small-medium">{productInfo.description}</p>
      </div>

    
        <div className="flex flex-col gap-2">
          <p className="text-base-medium text-grey-2">Color:</p>
          <p className="text-small-medium">{productInfo.color}</p>
        </div>
  
       <div className="flex flex-col gap-2">
          <p className="text-base-medium text-grey-2">Sizes:</p>
          <p className="text-small-medium">{productInfo.size}</p>
        </div>
    

      <div className="flex flex-col gap-2">
        <p className="text-base-medium text-grey-2">Quantity:</p>
        <div className="flex gap-4 items-center">
          <MinusCircle
            className="hover:text-red-1 cursor-pointer"
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
          />
          <p className="text-body-bold">{quantity}</p>
          <PlusCircle
            className="hover:text-red-1 cursor-pointer"
            onClick={() => setQuantity(quantity + 1)}
          />
        </div>
      </div>

      <button
        className="outline text-base-bold py-3 rounded-lg hover:bg-black hover:text-white"
        onClick={() => {
          cart.addItem({
            item: productInfo,
            quantity
           
          });
        }}
      >
        Add To Cart
      </button>


      <div className="text-bold">
         <h6>Sizes available are: </h6>
          <ul>
            {relatedProducts.map((product: ProductType) => (
               <Link
               href={`/products/${product._id}`}
               className="w-[220px] flex flex-col gap-2"
               key={product._id}
             >
              <li>
                <p>{product.size}</p>
               
              </li>
              </Link>
            ))}
          </ul>
      </div>
    </div>

  );
};

export default ProductInfo;
"use client"

import Loader from "@/components/Loader"
import ProductCard from "@/components/ProductCard"
import { getProductDetails } from "@/lib/actions/actions"
import { useUser } from "@clerk/nextjs"
import { use, useEffect, useState } from "react"

const Wishlist = () => {
  const { user } = useUser()

  const [loading, setLoading] = useState(true)
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null)
  const [wishlist, setWishlist] = useState<ProductType[]>([])

  const getUser = async () => {
    try {
      const res = await fetch("/api/users")
      const data = await res.json()
      setSignedInUser(data)
      setLoading(false)
    } catch (err) {
      console.log("[users_GET", err)
    }
  }

  useEffect(() => {
    if (user) {
      getUser()
    }
  }, [user])

  const getWishlistProducts = async () => {
    setLoading(true);
  
    if (!signedInUser) {
      setLoading(false);
      return;
    }
  
    try {
      const wishlistProducts = await Promise.all(
        signedInUser.wishlist.map(async (productId) => {
          try {
            const res = await getProductDetails(productId);
            if (!res || res.message === "Product not found") {
              // If product details are not found or the product has a "Product not found" message, skip this product
              return null;
            }
            return res;
          } catch (error) {
            // Handle the error (e.g., log it) and skip this product
            console.error(`Error fetching product details for product ID: ${productId}`, error);
            return null;
          }
        })
      );
  
      // Filter out the null values (skipped products)
      const filteredWishlistProducts = wishlistProducts.filter(product => product !== null);
  
      setWishlist(filteredWishlistProducts);
    } catch (error) {
      console.error('Error processing wishlist products:', error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (signedInUser) {
      getWishlistProducts()
    }
  }, [signedInUser])

  const updateSignedInUser = (updatedUser: UserType) => {
    setSignedInUser(updatedUser)
  }


  return loading ? <Loader /> : (
    <div className="px-10 py-5">
      <p className="text-heading3-bold my-10">Your Wishlist</p>
      {wishlist.length === 0 && (
        <p>No items in your wishlist</p>
      )}

      <div className="flex flex-wrap justify-center gap-16">
        {wishlist.map((product) => (
          <ProductCard key={product._id} product={product} updateSignedInUser={updateSignedInUser}/>
        ))}
      </div>
    </div>
  )
}

export const dynamic = "force-dynamic";

export default Wishlist
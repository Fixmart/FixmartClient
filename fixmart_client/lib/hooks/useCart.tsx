import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartItem {
  item: ProductType;
  quantity: number;
  color?: string; // ? means optional
  size?: string; // ? means optional
}

interface CartStore {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (idToRemove: string) => void;
  increaseQuantity: (idToIncrease: string) => void;
  decreaseQuantity: (idToDecrease: string) => void;
  clearCart: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      cartItems: [],
      addItem: (data: CartItem) => {
        const { item, quantity, color, size } = data;
        const currentItems = get().cartItems; // all the items already in cart
        const isExisting = currentItems.find(
          (cartItem) => cartItem.item._id === item._id
        );

        if (isExisting) {
          return toast("Item already in cart");
        }

        set({ cartItems: [...currentItems, { item, quantity, color, size }] });
        toast.success("Item added to cart", { icon: "🛒" });
      },
      removeItem: (idToRemove: String) => {
        const newCartItems = get().cartItems.filter(
          (cartItem) => cartItem.item._id !== idToRemove
        );
        set({ cartItems: newCartItems });
        toast.success("Item removed from cart");
      },
      increaseQuantity: (idToIncrease: String) => {
        const newCartItems = get().cartItems.map((cartItem) =>
          cartItem.item._id === idToIncrease
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        set({ cartItems: newCartItems });
        toast.success("Item quantity increased");
      },
      decreaseQuantity: (idToDecrease: String) => {
        const newCartItems = get().cartItems.map((cartItem) => {
            if (cartItem.item._id === idToDecrease) {
                const newQuantity = cartItem.quantity - 1;
                if (newQuantity <= 0) {
                    // If quantity becomes 0 or negative, remove the item from the cart
                    return null;
                } else {
                    return { ...cartItem, quantity: newQuantity };
                }
            } else {
                return cartItem;
            }
        }).filter((item): item is CartItem => item !== null); // Filter out null values
    
        set({ cartItems: newCartItems });
        toast.success("Item quantity decreased");
    },
    
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
type CollectionType = {
    _id: string;
    title: string;
    products: number;
    image: string;
  };
  
  type ProductType = {
    _id: string;
    ItemCode: string;
    HSNCode: string;
    title: string;
    description: string;
    media: [string];
    category: string;
    collections: [string];
    tags: [string];
    color: string;
    price: number;
    cost: number;
    size: string;
    createdAt: string;
    updatedAt: string;
    Quantity: number;
    QuantitySold: number;
    PurchasedBy:Object;
  };
  
  type UserType = {
    clerkId: string;
    wishlist: [string];
    createdAt: string;
    updatedAt: string;
  };
  
  type OrderType = {
    shippingAddress: Object;
    _id: string;
    customerClerkId: string;
    products: [OrderItemType]
    shippingRate: string;
    totalAmount: number
  }
  
  type OrderItemType = {
    product: ProductType;
    color: string;
    size: string;
    quantity: number;
    _id: string;
  }
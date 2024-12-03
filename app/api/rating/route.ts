import { getCurrentUser } from "@/actions/getCurrentUser";
import { Review } from "@/prisma/generated/client";
import { NextResponse } from "next/server";

// Define the structure of an Order
interface Product {
  id: string;
}

interface Order {
  products: Product[];
  deliveryStatus: string;
}

interface User {
  id: string;
  orders: Order[];
}

// POST request handler
export async function POST(request: Request) {
  const currentUser = await getCurrentUser() as User | null;

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { comment, rating, product, userId } = body as {
    comment: string;
    rating: number;
    product: { id: string; reviews: Review[] };
    userId: string;
  };

  // Check if the product was part of a delivered order
  const deliveredOrder = currentUser?.orders.some((order: Order) =>
    order.products.some((item) => item.id === product.id) &&
    order.deliveryStatus === "delivered"
  );

  // Check if the user has already reviewed the product
  const userReview = product?.reviews.find((review: Review) => {
    return review.userId === currentUser.id;
  });

  if (userReview || !deliveredOrder) {
    return NextResponse.error();
  }

  // Create a new review
  const review = await prisma?.review.create({
    data: {
      comment,
      rating,
      productId: product.id,
      userId,
    },
  });

  return NextResponse.json(review);
}

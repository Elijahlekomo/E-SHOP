"use client";

import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Heading from "../product/[productId]/Heading";

const CartClient = () => {
  const { cartProducts } = useCart();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-2xl">Your cart is empty</div>
        <div>
          <Link
            href={"/"}
            className="text-slate-500 flex items-center gap-1 mt-2"
          >
            <MdArrowBack />
            <span>Start shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p>House</p>
      <Heading title="Shopping Cart" center />
      <div
        className="grid
            grid-cola-5
            text-xs
            gap-4
            pb-2
            items-center"
      >
        <div
          className="col-span-2
                justify-self-start"
        >
          PRODUCT
        </div>
        <div className="justify-self-center">PRICE</div>
        <div className="justify-self-center">QUANTITY</div>
        <div className="justify-self-end">TOTAL</div>
      </div>
    </div>
  );
};

export default CartClient;

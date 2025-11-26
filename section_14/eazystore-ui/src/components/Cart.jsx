import React, { useMemo } from "react";
import PageTitle from "./PageTitle";
import emptyCartImage from "../assets/util/emptycart.png";
import { useCart } from "../store/cart-context";
import CartTable from "./CartTable";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export default function Cart() {
  const { cart } = useCart();
   // Memoize the cart length check to prevent re-renders
  const isCartEmpty = useMemo(() => cart.length === 0, [cart]);

  return (
    <div className="min-h-[852px] py-12 bg-normalbg dark:bg-darkbg font-primary">
      <div className="max-w-4xl mx-auto px-4">
        <PageTitle title="Your Cart" />
        {!isCartEmpty ? (
          <>
            <CartTable />
            <div className="flex justify-between mt-8 space-x-4">
                {/* Back to Products Button */}
                <Link
                  to="/home"
                  className="py-2 px-4 text-dark bg-light dark:bg-dark hover:bg-gray-700 dark:text-light hover:dark:bg-gray-400 text-sm font-semibold rounded-sm flex justify-center items-center transition"
                >
                  Continue Shopping
                  <FontAwesomeIcon icon={faShoppingCart} className="ml-2" />
                </Link>
              </div>
          </>
        ) : (
          <div className="text-center text-gray-600 dark:text-dark flex flex-col items-center">
            <p className="max-w-[576px] px-2 mx-auto text-base mb-4">
              Oops... Your cart is empty. Continue shopping
            </p>
            <img
              src={emptyCartImage}
              alt="Empty Cart"
              className="max-w-[300px] mx-auto mb-6 dark:bg-dark dark:rounded-md"
            />
            <Link
              to="/home"
              className="py-2 px-4 text-dark bg-light dark:bg-dark hover:bg-gray-700 dark:text-light hover:dark:bg-gray-400 text-xl font-semibold rounded-sm flex justify-center items-center transition"
            >
              Back to Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
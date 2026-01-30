import React, { useMemo } from "react";
import PageTitle from "./PageTitle";
import emptyCartImage from "../assets/util/emptycart.png";
// import { useCart } from "../store/cart-context";
import CartTable from "./CartTable";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faMoneyBills } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../store/auth-context";
import { useSelector } from "react-redux"; // replace context with redux
import { selectCartItems } from "../store/cart-slice"; // replace context with redux
import { selectUser, selectIsAuthenticated } from "../store/auth-slice";

export default function Cart() {
  // const { cart } = useCart();
  const cart = useSelector(selectCartItems); // replace context with redux
  // const { isAuthenticated, user } = useAuth();
  const isAuthenticated = useSelector(selectIsAuthenticated); // replace context with redux
  const user = useSelector(selectUser); // replace context with redux
  const isAddressIncomplete = useMemo(() => {
    if(!isAuthenticated) return false; // if user not logged in, unable to proceed to checkout (redirect to login)
    if(!user.address) return true; // if address is null or undefined then return true

    // if adress is presents, extract the fields
    const { street, city, state, postalCode, country } = user.address;
    return !street || !city || !state || !postalCode || !country; // if any field is null, return true
  }, [user]);

   // Memorize the cart length check to prevent re-renders
  const isCartEmpty = useMemo(() => cart.length === 0, [cart]);

  return (
    <div className="min-h-[852px] py-12 bg-normalbg dark:bg-darkbg font-primary">
      <div className="max-w-4xl mx-auto px-4">
        <PageTitle title="Your Cart" />
        {!isCartEmpty ? (
          <>
            {isAddressIncomplete && (
              <p className="text-red-500 text-lg mt-2 text-center">
                Please update your address in your profile to proceed to
                checkout.
              </p>
            )}

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
                <Link
                to={isAddressIncomplete ? "#" : "/checkout"}
                className={`py-2 px-4 text-sm font-semibold rounded-sm flex justify-center items-center transition
                                    ${
                                      isAddressIncomplete
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "text-dark bg-light dark:bg-dark hover:bg-gray-700 dark:text-light hover:dark:bg-gray-400 "
                                    } text-white dark:text-black`}
                onClick={(e) => {
                  if (isAddressIncomplete) {
                    e.preventDefault();
                  }
                }}
              >
                Proceed to Checkout
                <FontAwesomeIcon icon={faMoneyBills} className="ml-2" />
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
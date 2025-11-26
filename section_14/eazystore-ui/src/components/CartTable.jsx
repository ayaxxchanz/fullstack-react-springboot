import React from "react";
import { useCart } from "../store/cart-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faMoneyBills} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import CheckoutForm from "./CheckoutForm";

export default function CartTable() {
  const { cart, addToCart, removeFromCart } = useCart();

  const subtotal = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const updateCartQuantity = (productId, quantity) => {
    const product = cart.find((item) => item.productId === productId);
    addToCart(product, quantity - (product?.quantity || 0));
  };

  return (
    <div className="min-h-80 mx-auto my-8 w-full font-primary flex flex-col sm:flex-row">
      <table className="w-3/3 border border-gray-400 dark:border-gray-600">
        <thead>
          <tr className="uppercase text-sm  bg-light text-dark dark:bg-dark dark:text-light border-b border-primary dark:border-gray-600">
            <th className="px-6 py-4">Product</th>
            <th className="px-6 py-4">Quantity</th>
            <th className="px-6 py-4">Price</th>
            <th className="px-6 py-4">Remove</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-primary dark:divide-gray-600">
          {cart.map((item) => (
            <tr
              key={item.productId}
              className="text-sm sm:text-base text-primary dark:text-dark text-center hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <td className="px-4 sm:px-6 py-4">
                <Link
                  to={`/products/${item.productId}`}
                  state={{ product: item }}
                  className="flex items-center"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-16 rounded-md object-cover mr-4 hover:scale-110 transition-transform"
                  />
                  <span className="text-primary dark:text-dark hover:underline">
                    {item.name}
                  </span>
                </Link>
              </td>
              <td className="px-4 sm:px-6 py-4">
                <input
                  type="number"
                  inputMode="numeric"
                  value={item.quantity}
                  onChange={(e) =>
                    updateCartQuantity(
                      item.productId,
                      parseInt(e.target.value, 10) || 1
                    )
                  }
                  className="w-16 px-2 py-1 border rounded-md focus:ring focus:ring-light dark:focus:ring-gray-600 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </td>
              <td className="px-4 sm:px-6 py-4 text-base font-light">
                ${item.price.toFixed(2)}
              </td>
              <td className="px-4 sm:px-6 py-4">
                <button
                  aria-label="delete-item"
                  onClick={() => removeFromCart(item.productId)}
                  className="text-red-500"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="w-full mt-2 sm:w-1/3 sm:ml-2 sm:mt-0 border border-gray-400 dark:border-gray-600 h-fit">
          <thead>
          <tr className="uppercase text-sm bg-light text-dark dark:bg-dark dark:text-light border-b border-primary dark:border-gray-600">
            <th className="px-6 py-4">Subtotal</th>
          </tr>
        </thead>
          <tbody>
            {cart.length > 0 && (
                <tr className="text-center">
                    <td className="text-lg text-primary dark:text-lighter font-medium px-4 sm:px-6 py-4">
                        ${subtotal}
                    </td>
                </tr>
            )}
            <tr>
                <td>
                    <Link to="/checkout" className="mx-2 my-2 py-2 px-4 text-dark bg-light dark:bg-dark hover:bg-gray-700 dark:text-light hover:dark:bg-gray-400 text-sm font-semibold rounded-sm flex justify-center items-center transition">
                        Proceed to Checkout
                        <FontAwesomeIcon icon={faMoneyBills} className="ml-2" />
                    </Link>
                </td>
            </tr>
          </tbody>
      </table>
    </div>
  );
}
import React from "react";
import PageTitle from "./PageTitle";
import { useNavigate } from "react-router";
import emptyCartImage from "../assets/util/emptycart.png";

export default function Cart() {
  const navigation = useNavigate();

  const handleClick = () => {
    navigation("/home", { state: { username: "Aliya" } });
  };

  return (
    <div className="min-h-[852px] py-12 bg-normalbg dark:bg-darkbg font-primary">
      <div className="max-w-4xl mx-auto px-4">
        <PageTitle title="Your Cart" />
        <div className="text-center text-gray-600 dark:text-dark flex flex-col items-center">
          <p className="max-w-[576px] px-2 mx-auto text-base mb-4">
            Oops... Your cart is empty. Continue shopping
          </p>
          <img
            src={emptyCartImage}
            alt="Empty Cart"
            className="max-w-[300px] mx-auto mb-6 dark:bg-dark dark:rounded-md"
          />
          <button
            onClick={handleClick}
            className="py-2 px-4 text-dark bg-light dark:bg-dark hover:bg-gray-700 dark:text-light hover:dark:bg-gray-400 text-xl font-semibold rounded-sm flex justify-center items-center transition"
          >
            Back to Products
          </button>
        </div>
      </div>
    </div>
  );
}
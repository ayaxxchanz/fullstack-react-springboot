import React from 'react'
import Price from './Price'
import { Link } from 'react-router'
import { useCart } from "../store/cart-context";
import { toast } from "react-toastify";

export default function ProductCard({ product }) {
    const {addToCart} = useCart(); // initialCartContext
    const handleAddToCart = () => {
        addToCart(product, 1);
        toast.success(`${product.name} added to cart!`, {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined
        });
    }

    return (
        <div
        
            className="w-72 rounded-md mx-auto border border-gray-300 dark:border-gray-700 shadow-md overflow-hidden flex flex-col bg-white hover:shadow-lg hover:border-black dark:hover:border-gray-300 transition">
            <Link to={`/products/${product.productId}`} state={{product}} //passed to ProductDetails
                className="relative w-full h-72 border-b border-gray-300 dark:border-gray-600">
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110" />
            </Link>
            <div className="relative h-48 p-4 flex flex-col bg-dark-2 dark:bg-light-2">
                <h2 className="text-xl font-extrabold mb-2 text-light dark:text-lighter">
                    {product.name}
                </h2>
                <p className="text-base mb-4">
                    {product.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                    <div className="bg-gray-200 dark:bg-light font-medium text-sm py-3 px-4 rounded-tl-md">
                        <Price currency="$" price={product.price} />
                    </div>
                    <button onClick={handleAddToCart} className="bg-secondary text-light font-bold text-xs py-2 px-4 rounded-lg border-t-2 border-l-2 border-b-4 border-r-4 border-light dark:border-black active:border-2">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

import React from 'react'
import Price from './Price'
import { Link } from 'react-router'

export default function ProductCard({ product }) {
  return (
    <Link to={`/products/${product.productId}`}
        state={{product}} //passed to ProductDetails
        className="w-72 rounded-md mx-auto border border-gray-300 dark:border-gray-700 shadow-md overflow-hidden flex flex-col bg-white hover:shadow-lg dark:hover:border-gray-300 transition">
        <div className="relative w-full h-72 border-b border-gray-300 dark:border-gray-600">
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110" />
        </div>
        <div className="relative h-48 p-4 flex flex-col bg-dark-2 dark:bg-light-2">
            <h2 className="text-xl font-extrabold mb-2 text-light dark:text-lighter">
                {product.name}
            </h2>
            <p className="text-base mb-4">
                {product.description}
            </p>
            <div className="flex items-center justify-between mt-auto">
                <div className="bg-lighter dark:bg-light font-medium text-sm py-2 px-4 rounded-tl-md">
                    <Price currency="$" price={product.price} />
                </div>
            </div>
        </div>
    </Link>
  )
}

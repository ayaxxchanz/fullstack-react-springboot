import React from 'react'

export default function Price({ currency, price }) {
  return (
    <>
        {currency}
        <span className="product-card-price">{ price }</span>
    </>
  )
}

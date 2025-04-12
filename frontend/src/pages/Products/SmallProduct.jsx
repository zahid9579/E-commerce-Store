import React from 'react'
import { Link } from 'react-router-dom';

const SmallProduct = ({ product }) => {

  return (
    <div className='w-[20rem] ml-[2rem] p-3'>
      <div className='relative'>
        <img
          src={product.image}
          alt={product.name}
          className='w-full h-48 object-cover rounded'
        />
        {/* <HeartIcon product={product}/> */}
      </div>

      <div className='mt-4'>
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center text-base font-medium">
            <div>{product.name}</div>
            <span className='bg-pink-100 text-pink-800 text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300'>
              ${product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  )
}

export default SmallProduct;

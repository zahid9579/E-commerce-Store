import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useCreateReviewMutation, useGetProductDetailsQuery } from '../../redux/api/productApiSlice'
import Loader from '../../components/Loader/Loader'
import Message from '../../components/Message/Message'
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from 'react-icons/fa'
import moment from 'moment'
import HeartIcon from './HeartIcon'
import Ratings from './Ratings'

const ProductDetails = () => {
  const { id: productId } = useParams()
  const navigate = useNavigate()

  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId)
  const { userInfo } = useSelector((state) => state.auth)

  const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation()

  return (
    <>
      <div>
        <Link to='/' className='font-semibold hover:underline ml-[10rem]'>
          Go Back
        </Link>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <div className='flex flex-wrap items-start gap-8 mt-[2rem] ml-[10rem] mr-[2rem]'>
            {/* Product Image */}
            <div className='relative'>
              <img
                src={product.image}
                alt={product.name}
                className='w-full xl:w-[40rem] lg:w-[35rem] md:w-[30rem] sm:w-[20rem] rounded-lg shadow-md'
              />
              <HeartIcon product={product} />
            </div>

            {/* Product Info */}
            <div className='flex flex-col justify-start'>
              <h2 className='text-3xl font-semibold mb-2'>{product.name}</h2>
              <p className='my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem]'>{product.description}</p>
              <p className='text-3xl font-semibold text-green-600 mb-4'>$ {product.price}</p>

              <div className='flex items-center mb-2'>
                <FaStore className='mr-2 text-gray-600' />
                <span className='text-lg'>Brand: {product.brand}</span>
              </div>

              <div className='flex items-center mb-2'>
                <FaClock className='mr-2 text-gray-600' />
                <span className='text-lg'>Added:  {moment(product.createdAt).fromNow()}</span>
              </div>

              <div className='flex items-center mb-2'>
                <FaStore className='mr-2 text-gray-600' />
                <span className='text-lg'>Reviews: {product.numReviews}</span>
              </div>

              <div className='two'>
                <h1 className='flex items-center mb-2'>
                    <FaStar className='mr-2 text-gray-600'/> Ratings: {product.rating}
                </h1>
            </div>

            <div className='two'>
                <h1 className='flex items-center mb-2'>
                    <FaShoppingCart className='mr-2 text-gray-600'/> Quantity: {product.quantity}
                </h1>
            </div>

            <div className='two'>
                <h1 className='flex items-center mb-2'>
                    <FaBox className='mr-2 text-gray-600'/> In Stock: {product.countInStock}
                </h1>
            </div>

            {/* Rating  Here */}
            <div className='flex justify-between flex-wrap'>
                {/* Ratings */}
                <Ratings 
                   value={product.rating}
                   text={`${product.numReviews} reviews`}

                />

                {product.countInStock > 0 && (
                    <div>
                        <select value={qty} onChange={e => setQty(e.target.value)}
                            className='p-2 w-[6rem] rounded-lg text-black'>{[...Array(product.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>{x + 1}</option>

                            ))}</select>
                    </div>
                )}
            </div>






            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ProductDetails

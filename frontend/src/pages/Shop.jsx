import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useGetFilteredProductsQuery} from '../redux/api/productApiSlice'
import {setCategories, setProducts, setChecked} from '../redux/features/shop/shopSlice'
import Loader from '../components/Loader/Loader'
import {useFetchCategoryQuery} from '../redux/api/categoryApiSlice'


const Shop = () => {
  const dispatch = useDispatch()
  const {categories, products, checked, radio} = useSelector((state) => state.shop)
  const categoriesQuery = useFetchCategoryQuery();
  const [priceFilter, setPriceFilter] = useState('')
  
  const filteredProductsQuery  = useGetFilteredProductsQuery({
    checked, radio,
  });

  useEffect(() => {
    if(!categoriesQuery.isLoading){
      dispatch(setCategories(categoriesQuery.data))
    }
  }, [categoriesQuery.data, dispatch])


  useEffect(() => {
    if(!checked.length || !radio.length){
      if(!filteredProductsQuery.isLoading){
        // fitlter prducts based on both checked categories and price filter
        const filteredProducts = filteredProductsQuery.data.filter((product) => {
          //  check if the product price includes the entered price filter value
          return(
            product.price.toString().includes(priceFilter) || product.price === parseInt(priceFilter, 10)
          );
        });

        dispatch(setProducts(filteredProducts));



      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);
  

  // Handlers
  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter((product) => product.brand === brand)
    dispatch(setProducts(productsByBrand));
  }


  const handleCheck = (value, id) => {
    const updatedChecked = value ? [...checked, id] : checked.filter((c) => c != id)
    dispatch(setChecked(updatedChecked));
  }

  // Add 'all brands option to uniqueBrands

  const uniqueBrands = [
    ...Array.from(
      new Set(filteredProductsQuery.data
        ?.map((product) => product.brand)
        .filter((brand) => brand != undefined))
    ),
  ];


  const handlePriceChange = e => {
    //  Updatae the price filter state when the user type in the input  field
    setPriceFilter(e.target.value)
  }



  return <>
  <div className="container mx-auto" >
    <div className='flex md:flex-row'>
      <div className='bg-[#151515] text-white p-3 mt-2 mb-2'>
        <h2 className='h4 text-center py-2 bg-black rounded-full mb-2'>
          Filter by Categories
        </h2>

        <div className='p-5 w-[15rem]'>
          {categories?.map((c) => (
            <div key={c._id} className='mb-2'>
              <div className='flex items-center mr-4'>
                <input type='checkbox' id='red-checkbox' onChange={(e) => handleCheck(e.target.checked, c._id)}/>

                <label htmlFor="pink-checkbox"  className='ml-2 text-sm font-medium text-white dark:text-gray-300'>
                  {c.name}

                </label>

              </div>
            </div>
          ))}
        </div>

      </div>

      </div>
  </div>
  </>;
}

export default Shop;
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {useCreateProductMutation, useUploadProductImageMutation} from '../../redux/api/productApiSlice.js'
import { useFetchCategoryQuery } from '../../redux/api/categoryApiSlice.js';
import { toast } from 'react-toastify';
import AdminMenu from './AdminMenu.jsx';



const ProductList = () => {
  const[image, setImage] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [quantity, setQuantity] = useState('')
  const [brand, setBrand] = useState('')
  const [stock, setStock] = useState(0)
  const [imageUrl, setImageUrl] = useState(null)

  const navigate = useNavigate()

  const [uploadProductImage] = useUploadProductImageMutation()
  const [createProduct] = useCreateProductMutation()
  const {data: categories} = useFetchCategoryQuery()

//  Handle Submit
const handleSubmit = async (e) => {
  e.preventDefault();

  try{
    const productData =  new FormData();
    productData.append("image", image);
    productData.append("name", name);
    productData.append("description", description);
    productData.append("price", price);
    productData.append("category", category);
    productData.append("quantity", quantity);
    productData.append("brand", brand);
    productData.append("countInStock", stock);

    const {data} = await createProduct(productData);

    if(data.error){
      toast.error("Product created failed, Try Again!")
    }else{
      toast.success(`${data.name} is created`)
      navigate("/")
    }

  }catch(error){
    console.log(error)
    toast.error("Product created failed. Try Again!")
  }

}


//  Upload file 
  const uploadFileHandler = async (e) => {
    const formData = new FormData()
    formData.append('image', e.target.files[0])


    try{
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message)
      setImage(res.image);
      setImageUrl(res.image);

    }catch(error){
      toast.error(error?.data?.message || error.message)
    }
  };





  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        {/* Admin Menu */}
        <AdminMenu/>
        <div className="md:w-3/4 p-3">
          <div className="h-12"> Create Product</div>

          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="product"
                className="block max-auto max-h-[200px]"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="border px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11 ">
              {image ? image.name : "Upload Image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-black"}
              />
            </label>
          </div>
          <div className="p-3">
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name">Name</label>
                <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg "
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="two">
                <label htmlFor="name block">Price</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg "
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name block">Quantity</label>
                <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg "
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className="two">
                <label htmlFor="name block">Brand</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg "
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>

            <div className="three">
              <label htmlFor="description" className="block">
                Description
              </label>
              <textarea
                id="description"
                className="p-4 mb-3 w-[30rem] border rounded-lg"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex justify-between">
              <div>
                <label htmlFor="name block">Count in Stock</label> <br/>
                <input type="number" name="" className='p-4 mb-3 w-[30rem] border rounded-lg' value={stock} onChange={(e) => setStock(e.target.value)}
                />
              </div>
            </div>

            <div>
                <label htmlFor="">Category</label> <br />
                <select placeholder="Choose Category" className='p-4 mb-3 w-[30rem] border rounded-lg' onChange={e => setCategory(e.target.value)}>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

          </div>

          <button 
          onClick={handleSubmit} 
          className='py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600'>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
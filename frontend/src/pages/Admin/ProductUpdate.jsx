import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {
    useUpdateProductMutation, 
    useDeleteProductMutation, 
    useGetProductByIdQuery,
    useUploadProductImageMutation,
} from "../../redux/api/productApiSlice.js";

import AdminMenu from './AdminMenu.jsx';

import {useFetchCategoryQuery} from '../../redux/api/categoryApiSlice.js'
import { toast } from 'react-toastify';

       
const ProductUpdate = () => {
    const params = useParams();
    console.log("Product ID:", params._id); 

    const {data: productData} = useGetProductByIdQuery(params._id)

    const [image, setImage] = useState(productData?.image || "")
    const [name, setName] = useState(productData?.name || "")
    const [description, setDescription] = useState(productData?.description || "");
    const [price, setPrice] = useState(productData?.price || "");
    const [quantity, setQuantity] = useState(productData?.quantity || "")
    const [category, setCategory] = useState(productData?.category || "");
    const [brand, setBrand] = useState(productData?.brand || "")
    const [stock, setStock] = useState(productData?.countInStock || "");
    

    const navigate = useNavigate()
    
    const {data: categories = []} = useFetchCategoryQuery();
    const [uploadProductImage] = useUploadProductImageMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();

    useEffect(() => {
        if(productData && productData._id){
            setName(productData.name)
            setDescription(productData.description)
            setPrice(productData.price)
            setCategory(productData.category?._id)
            setQuantity(productData.quantity)
            setBrand(productData.brand)
            setImage(productData.image)
            setStock(productData.countInStock)
        }
    }, [productData]);

    const uploadFileHandler = async(e) => {
        const formData = new FormData()
        formData.append('image', e.target.files[0])
        try{
            const res = await uploadProductImage(formData).unwrap();
            toast.success("Item added Successfully")
            setImage(res.image);

        }catch(error){
            toast.error("Item Added Failed")
        }
    }




    //  Handle Submit
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try{
        const formData =  new FormData();
        formData.append("image", image);
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("quantity", quantity);
        formData.append("brand", brand);
        formData.append("countInStock", stock);
    
        const data = await updateProduct({productId: params._id, formData});

    
        if(data?.error){
          toast.error(data.error)
        }else{
          toast.success("Product successfully updated")
          navigate("/admin/allproductslist")
        }
    
      }catch(error){
        console.log(error)
        toast.error("Product update failed, Try Again!")
      }
    
    }


    const handleDelete = async() => {
        try{
            let answer = window.confirm("Are you sure you want to delete this product?")

            if(!answer){
                return;
            }

            const {data} = await deleteProduct(params._id)
            toast.success(`${data.name} is Deleted Successfully`)

            navigate('/admin/allproductslist')

        }catch(error){
            console.log(error)
            toast.error("Deletion failed. try again")
        }

    }
    


  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        {/* Admin Menu */}
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12"> Create Product</div>

          {image && (
            <div className="text-center">
              <img
                src={image}
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
                <label htmlFor="name block">Count in Stock</label> <br />
                <input
                  type="number"
                  name=""
                  className="p-4 mb-3 w-[30rem] border rounded-lg"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="">Category</label> <br />
              <select
               value={category}
                placeholder="Choose Category"
                className="p-4 mb-3 w-[30rem] border rounded-lg"
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <button
                onClick={handleSubmit}
              className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-green-600 text-white mr-6"
            >
              Update
            </button>

            <button
                onClick={handleDelete}
              className="py-4 px-10 mt-5 rounded-lg text-lg font-bold text-white bg-pink-600"
            >
              Delete
            </button>
          </div>

        </div>
      </div>
    </div>
  );
  
}

export default ProductUpdate;
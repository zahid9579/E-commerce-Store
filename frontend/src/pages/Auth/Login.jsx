import React from 'react'
import { useState, useEffect } from 'react';
import {Link , useLocation, useNavigate}  from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { useLoginMutation } from '../../redux/api/usersApiSlice';
import { setCredientials } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';



const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, {isLoading}] = useLoginMutation()

    const {userInfo} = useSelector(state => state.auth)

    const {search} = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])

    // Handle Submit
    const submitHandler = async(e) => {
        e.preventDefault()
        try{
            const res = await login({email, password}).unwrap()
            console.log(res)
            dispatch(setCredientials({...res}));
            navigate(redirect);
            
        }catch(error){
            toast.error(error?.data?.message || error.message )
        }

    }


  return (
    <div>
        <section className="pl-[10rem] flex flex-wrap">
            <div className="mr-[4rem] mt-[5rem]">
                <h1 className='text-2xl font-semibold mb-4'>Sign In</h1>

                <form onSubmit={submitHandler} className='container w-[40rem]'>
                    <div className='my-[2rem]'>
                        <label htmlFor="email" className='block text-sm font-medium '>Email</label>
                        <input type="email"  id="email" className='mt-1 p-2 border rounded w-full'
                        value={email} onChange={e => setEmail(e.target.value)} />
                        
                    </div>

                    <div className='my-[2rem]'>
                        <label htmlFor="password" className='block text-sm font-medium '>Password</label>
                        <input type="password"  id="password" className='mt-1 p-2 border rounded w-full'
                        value={password} onChange={(e) => setPassword(e.target.value)} />

                    </div>

                    <button disabled={isLoading} type='submit' className='bg-pink-500 px-4 py-2 rounded cursor-pointer my-[1rem] '>{isLoading ? "Signing In..." :  "Sign In"}</button>

                    {isLoading && <Loader/>}
                </form>
                
                <div className='mt-4'>
                    <p>New Customer? {""} <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}  className='text-pink-500 hover:underline'>Register</Link></p>
                </div>
            </div>

            {/* <img src="https://images.unsplash.com/photo-1659968022054-14a04e63ec04?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTkwfHxsb2dpbnxlbnwwfHwwfHx8MA%3D%3D"
            alt='Login image' className='h-[65rem] w-[59%] xl:block md:hidden rounded-lg'/> */}


        </section>
       
    </div>
  )
}

export default Login;
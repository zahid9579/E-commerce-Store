import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { saveShippingAddress, savePaymentMethod } from "../../redux/features/cart/cartSlice"


const Shipping = () => {
    const [paypalMethod, setPayPalmethod] = useState('PayPal')
    const [address, setAddress] = useState(shippingAddress.address || '')
    const [city, setCity] = useState(shippingAddress.city || '')
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
    const [country, setCoutry] = useState(shippingAddress.country || '')
    const cart = useSelector((state) => state.cart)
    const {shippingAddress} = cart


    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Payment 
    useEffect(() => {
        if(!shippingAddress.address){
            navigate('/shipping')
        }

    }, [navigate, shippingAddress]);



  return (
    <div>Shipping</div>
  )
}

export default Shipping 
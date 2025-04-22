import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message";
import ProgressSteps from "../../components/ProgressSteps/ProgressSteps";
import Loader from "../../components/Loader/Loader";
import { useCreateProductMutation } from "../../redux/api/productApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateProductMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  return (
    <>
      <ProgressSteps step1 step2 step3 />

      <div className="container mx-auto mt-8">
        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <td className="px-1 py-2 text-left align-top">Image</td>
                    <td className="px-1 py-2 text-left">Product</td>
                    <td className="px-1 py-2 text-left">Quantity</td>
                    <td className="px-1 py-2 text-left">Price</td>
                    <td className="px-1 py-2 text-left">Total</td>
                  </tr>
                </thead>
                <tbody>
                  {cart.cartItems.map((item, index) => (
                    <tr key={index}>
                      <td className="p-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover"
                        />
                      </td>
                      <td className="p-2">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </td>
                      <td className="p-2">{item.qty}</td>
                      <td className="p-2">{item.price.toFixed(2)}</td>
                      <td className="p-2">
                        $ {(item.qty * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/*  Order Summary placed outside the table */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-5">Order Summary</h2>
              <div className="flex justify-between flex-wrap p-8 bg-gray-100 rounded-md">
                <ul className="text-lg space-y-2">
                  <li>
                    <span className="font-semibold">Items: </span>$
                    {cart.itemsPrice}
                  </li>
                  <li>
                    <span className="font-semibold">Shipping: </span>$
                    {cart.shippingPrice}
                  </li>
                  <li>
                    <span className="font-semibold">Tax: </span>$
                    {cart.taxPrice}
                  </li>
                  <li>
                    <span className="font-semibold">Total: </span>$
                    {cart.totalPrice}
                  </li>
                </ul>

                {error && <Message variant="danger">{error.data.Message}</Message>}

                <div>
                    <h2 className="text-2xl font-semibold mb-4">Shipping</h2>
                    <p>
                        <strong>Address: </strong>
                        {cart.shippingAddress.address}, {" "} {cart.shippingAddress.city} {" "}
                        {cart.shippingAddress.postalCode}, {" "}
                        {cart.shippingAddress.country}

                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-4"> Payment Method</h2>
                </div>


              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PlaceOrder;

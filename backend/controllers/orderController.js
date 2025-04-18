import Order from "../models/orderModel.js";
import Product from '../models/productModel.js';


const createOrder = async(req, res) => {
    try{
        const {orderItems, shippingAddress, paymentMethod } = req.body;

        if(orderItems && orderItems.length === 0){
            res.status(400)
            throw new Error("No Order items");
        }

        const itemsFromDb = await Product.find({
            _id: {$in: orderItems.map((x) => x._id)}
        })

        const dbOrderItems = orderItems.map((itemFromClient) => {
            const matchingItemFromDB = itemsFromDb.find((itemFromDb) => itemFromDb._id.toString() === itemFromClient._id)

            if(!matchingItemFromDB){
                res.status(404);
                throw new Error(`Product not found: ${itemFromClient._id}`)
            }

            return {
                ...itemFromClient,
                product: itemFromClient._id,
                price: matchingItemFromDB.price,
                _id: undefined
            };

        });


    }catch(error){
        res.status(500).json({error: error.message})
    }
}

export {createOrder};

import React,{useReducer} from 'react'
import {
    ORDER_SENT
} from '../../types';
import axios from 'axios';
import OrderContext from './orderContext';
import OrderReducer from './orderReducer';
const OrderState = (props) => {
    const initialState={
        orderId:null,
        customerId:null,
        products:null,
        price:0
    }
    const [state,dispatch]=useReducer(OrderReducer,initialState);
    //Sent order
    const sendOrder=async(customerId,products,price)=>{
        try {
            const res=await axios.post('http://localhost:5000/order',{customerId,products,price})
            dispatch({type:ORDER_SENT,payload:res.data})
            console.log(state.orderId);
        } catch (error) {
            
        }
    }
    return (
        <OrderContext.Provider value={{
            orderId:state.orderId,
            customerId:state.customerId,
            products:state.products,
            price:state.price,
            sendOrder
        }}>
            {props.children}
        </OrderContext.Provider>
    )
}

export default OrderState

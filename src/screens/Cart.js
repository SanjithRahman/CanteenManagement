import React from 'react';
import { useCart,useDispatchCart } from '../components/ContextReducer';
import trash from "../img/trash.svg"
const Cart = () => {
    let data=useCart();
    let dispatch=useDispatchCart();
    if (data.length === 0){
        return(
        <div className='text-center fs-3 text-white bg-dark'>
         The Cart is Empty

        </div>
        )

    }
    const handleCheckOut=async()=>{
        let userEmail=localStorage.getItem("userEmail")
        let response= await fetch("http://localhost:5000/api/orderData",{
            method:'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            body:JSON.stringify({
                order_data:data,
                email:userEmail,
                order_date:new Date().toDateString()

            }

            ),
        }
        );
        
        console.log("order_response",response)
        if(response.status === 200){

            dispatch({type:"DROP"})
        }

    }
    let totalPrice = data.reduce((total, food) => total + food.price, 0)
    return <div>
        <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table   '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody className="text-white bg-dark" >
            {data.map((food, index) => (
              <tr>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn p-0"><img src={trash} alt="delete" onClick={()=>{dispatch({type:"REMOVE",index:index})}}/></button> </td></tr>
            ))}
          </tbody>
         
            </table>
            <div><h1 className='fs-2 text-white bg-dark text-center'>Total Price: {totalPrice}/-</h1></div>

        </div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
        </div>
        







    </div>;
}



export default Cart;
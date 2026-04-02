import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  /*// Calculate total amount for all products in the cart
const calculateTotalAmount = () => { return cart.reduce((total, item) => total + item.quantity, 0) : 0; };*/

// Calcula el monto total de todos los productos en el carrito
 const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      // Eliminamos el '$' para poder operar matemáticamente
      const numericPrice = parseFloat(item.cost.replace('$', ''));
      return total + (numericPrice * item.quantity);
    }, 0).toFixed(2);
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e)
   
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  /*
  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    let totalCost = 0;
        if (section === "cart") {
            cartItems.forEach((item) => {
                totalCost += parseFloat(item.cost.substring(1)) * item.quantity;
            });

  };
  return totalCost;
};*/

// Calcula el costo total por cada tipo de planta (subtotal)
  const calculateTotalCost = (item) => {
    const numericPrice = parseFloat(item.cost.replace('$', ''));
    return (numericPrice * item.quantity).toFixed(2);
  };


  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };
  

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>                                
                
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;



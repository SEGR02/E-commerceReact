import React, { useEffect } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { CheckoutCartThunk, getCarThunk } from '../store/slices/cart.slice';

const Cart = ({show, handleClose}) => {

  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)

  useEffect(()=>{
    dispatch(getCarThunk())
  },[])

  const checkout = () => {
    dispatch(CheckoutCartThunk())
  }

  return (
    <Offcanvas show={show} onHide={handleClose} responsive="">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {
          cart.products?.map(product=>(
            <div key={product.title}>
              <p>{product.title}</p>
            </div>
          ))
        }
        <Button onClick={checkout}>Checkout</Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;
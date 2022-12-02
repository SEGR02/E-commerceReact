import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {

  const dispatch = useDispatch()
  const purchases = useSelector(state => state.purchases)

  useEffect(()=>{
    dispatch(getPurchasesThunk())
  },[])

  return (
    <div>
      <h1>Purchases</h1>
      {
        purchases.map(purchase => (
          <div key={purchase.id}>
            <p>{purchase.cart.status}</p>
            {/* <b>{purchase.cart.products[0]?.title}</b> */}
            <ul>
              {purchase.cart.products.map(productPurchased => (
                <Link key={productPurchased.id} to={`/product/${productPurchased.id}`}>
                  <li>{productPurchased.title}</li>
                </Link>
              ))}
            </ul>
          </div>
        ))
      }
    </div>
  );
};

export default Purchases;
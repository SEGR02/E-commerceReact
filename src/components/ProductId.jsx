import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addCartThunk } from '../store/slices/cart.slice';
import { getProductsThunk } from '../store/slices/products.slice';

const ProductId = () => {

  const dispatch = useDispatch()
  const {id} = useParams();
  const products = useSelector(state => state.products)
  const productShow = products.find(products => products.id === Number(id))
  const sameProducts = products.filter(product => product.category.id === productShow.category.id)
  const [quantityInput, setQuantityInput] = useState(0)

  useEffect(()=>{
    dispatch(getProductsThunk())
  },[])

  const reduce = () => {
    setQuantityInput(quantityInput-1);
  }

  const raise = () => {
    setQuantityInput(quantityInput+1);
  }

  const submit = () => {
    const data = {
      id: productShow.id,
      quantity: quantityInput,
    }
    dispatch(addCartThunk(data))
  }

  return (
    <>
      <div>
        <h1>{productShow?.title}</h1>
        <p>{productShow?.description}</p>
        <img src={productShow?.productImgs[0]} alt="" />
        <Button onClick={reduce}>-</Button>
        <input type="text" value={quantityInput} onChange={(e)=>setQuantityInput(e.target.value)}/>
        <Button onClick={raise}>+</Button>
        <Button onClick={submit}>Add to cart</Button>
      </div>
      <div>
        <h1>Same products</h1>
        {
          sameProducts.map(product => (
              <Link key={product.title} to={`/product/${product.id}`}>
                <h4>{product.title}</h4>
                <img src={product.productImgs[0]} alt="" />
              </Link>
          ))
        }
      </div>
    </>
  );
};

export default ProductId;
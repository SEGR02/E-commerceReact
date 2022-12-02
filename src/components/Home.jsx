import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterProductsByCategory, filterProductsByName, getProductsThunk } from '../store/slices/products.slice';

const Home = () => {

  const dispatch = useDispatch()
  const products = useSelector(state => state.products)
  const [categoriesList, setCategoriesList] = useState([])
  const [inputSearch, setInputSearch] = useState('')

  useEffect(() => {
    dispatch(getProductsThunk())

    axios.get('https://e-commerce-api.academlo.tech/api/v1/products/categories')
      .then(res => setCategoriesList(res.data.data.categories))
  }, [])

  console.log(categoriesList)

  return (
    <div>
      <Row>
        <Col lg='3'>
          <h1>Categorias</h1>
          {
            categoriesList.map(category => (
              <div key={category.name}>
                <Button onClick={() => dispatch(filterProductsByCategory(category.id))}>
                  {category.name}
                </Button>
              </div>
            ))
          }
        </Col>
        <Col lg='9'>
          <InputGroup className="mb-3">
            <Form.Control
              onChange={(e) => setInputSearch(e.target.value)}
              value={inputSearch}
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <Button onClick={() => dispatch(filterProductsByName(inputSearch))} variant="outline-secondary" id="button-addon2">
              Search
            </Button>
          </InputGroup>
          {
            products?.map(product => (
              <Link key={product.productImgs[0]} to={`/product/${product.id}`}>
                <div>
                  <h2>{product.title}</h2>
                  <img src={product.productImgs[0]} alt="" style={{ width: '500px' }} />
                </div>
              </Link>
            ))
          }
        </Col>
      </Row>
    </div>
  );
};

export default Home;
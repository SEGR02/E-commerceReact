import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  filterProductsByCategory,
  filterProductsByName,
  getProductsThunk,
} from "../store/slices/products.slice";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [categoriesList, setCategoriesList] = useState([]);
  const [inputSearch, setInputSearch] = useState("");

  useEffect(() => {
    dispatch(getProductsThunk());

    axios
      .get("https://e-commerce-api.academlo.tech/api/v1/products/categories")
      .then((res) => setCategoriesList(res.data.data.categories));
  }, []);

  console.log(categoriesList);

  return (
    <div>
      <Row>
        <Col lg="3">
          <h1>Categorias</h1>
          {categoriesList.map((category) => (
            <ListGroup key={category.name}>
              <ListGroupItem
                onClick={() => dispatch(filterProductsByCategory(category.id))}
                style={{ cursor: "pointer" }}
              >
                {category.name}
              </ListGroupItem>
            </ListGroup>
          ))}
        </Col>
        <Col lg="9">
          <InputGroup className="mb-3">
            <Form.Control
              onChange={(e) => setInputSearch(e.target.value)}
              value={inputSearch}
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <Button
              onClick={() => dispatch(filterProductsByName(inputSearch))}
              variant="outline-secondary"
              id="button-addon2"
            >
              Search
            </Button>
          </InputGroup>
          <Row xs={1} md={2} lg={3} className="g-4">
            {products?.map((product) => (
              <Col>
                <Card>
                  <Link
                    key={product.productImgs[0]}
                    to={`/product/${product.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Card.Img
                      style={{ height: 200, objectFit: "contain" }}
                      src={product.productImgs[0]}
                      variant="top"
                    />
                    <Card.Body>
                      <Card.Title>{product.title}</Card.Title>
                      <Card.Text>Price: 100$</Card.Text>
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
          {/* {products?.map((product) => (
            <Card key={product.productImgs[0]} to={`/product/${product.id}`}>
              <div>
                <Card.Title>{product.title}</Card.Title>
                <Card.Img
                  src={product.productImgs[0]}
                  alt=""
                  style={{ width: "500px" }}
                />
              </div>
            </Card>
          ))} */}
        </Col>
      </Row>
    </div>
  );
};

export default Home;

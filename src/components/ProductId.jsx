import React, { useEffect, useState } from "react";
import { Button, Carousel, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addCartThunk } from "../store/slices/cart.slice";
import { getProductsThunk } from "../store/slices/products.slice";

const ProductId = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const products = useSelector((state) => state.products);
  const productShow = products.find((products) => products.id === Number(id));
  const sameProducts = products.filter(
    (product) =>
      product.category.id === productShow.category.id &&
      product.id !== productShow.id
  );
  const [quantityInput, setQuantityInput] = useState(0);

  useEffect(() => {
    dispatch(getProductsThunk());
  }, []);

  const reduce = () => {
    setQuantityInput(quantityInput - 1);
  };

  const raise = () => {
    setQuantityInput(quantityInput + 1);
  };

  const submit = () => {
    const data = {
      id: productShow.id,
      quantity: quantityInput,
    };
    dispatch(addCartThunk(data));
  };

  return (
    <>
      <div>
        <Row>
          <Col className="mt-5">
            {/* // ? Imagen */}
            <img src={productShow?.productImgs[0]} alt="" />
          </Col>
          <Col className="mt-5">
            {/* // ? Descripcion */}
            <h1>{productShow?.title}</h1>
            <p>{productShow?.description}</p>
            <Button onClick={reduce}>-</Button>
            <input
              style={{ marginLeft: "4px", marginRight: "4px" }}
              type="text"
              value={quantityInput}
              onChange={(e) => setQuantityInput(e.target.value)}
            />
            <Button style={{ marginRight: "4px" }} onClick={raise}>
              +
            </Button>
            <Button onClick={submit}>Add to cart</Button>
          </Col>
        </Row>
      </div>
      <div>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="holder.js/800x400?text=First slide&bg=373940"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="holder.js/800x400?text=Second slide&bg=282c34"
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="holder.js/800x400?text=Third slide&bg=20232a"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <p>Products related to this item</p>
        {sameProducts.map((product) => (
          <Link key={product.title} to={`/product/${product.id}`}>
            <h4>{product.title}</h4>
            <img src={product.productImgs[0]} alt="" />
          </Link>
        ))}
      </div>
    </>
  );
};

export default ProductId;

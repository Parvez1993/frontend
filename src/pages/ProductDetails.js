import axios from "axios";
import React, { useReducer } from "react";
import { Alert, Button, Col, Container, Row, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import Ratings from "../components/Ratings";
import { Helmet } from "react-helmet-async";
import { useStore } from "../Store";
const initialState = { loading: false, product: [], error: false };

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        product: action.payload,
        error: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
}

function ProductDetails() {
  const { state, dispatch: ctxDispatch } = useStore();
  const { cart } = state;
  const [{ product, loading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const { slug } = useParams();

  React.useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const tempProducts = await axios.get(`/products/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: tempProducts.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL" });
      }
    };

    getProduct();
  }, [slug]);

  const handleAddtoCart = async () => {
    const existingItem = cart.cartItems.find(
      (item) => item._id === product._id
    );
    const quantity = existingItem ? existingItem.quantity + 1 : 1;
    const { data } = await axios.get(`/cartItems/${product._id}`);

    console.log(data);

    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
  };
  return (
    <div className="my-5 py-5">
      {product ? (
        <Container>
          <Helmet>
            <title>{product.name}</title>
          </Helmet>
          <Row>
            <Col lg={5}>
              {product.img ? (
                <InnerImageZoom
                  src={product.img}
                  zoomSrc={product.img}
                  zoomType="hover"
                />
              ) : (
                ""
              )}
            </Col>
            <Col lg={4}>
              <div>
                <h4 className="display-6">Item Name: {product.name}</h4>
                <p className="text-muted">Product Price: {product.price}</p>
                <Ratings
                  ratings={product.ratings}
                  numberOfRatings={product.numberOfRatings}
                ></Ratings>
                <p>Description: {product.description}</p>
              </div>
            </Col>
            <Col lg={3}>
              <h5 className="text-center">Your Cart</h5>{" "}
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <td>Item</td>
                    <td>Amount</td>
                    <td>Price</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{product.name}</td>
                    <td>1</td>
                    <td>{product.price}</td>
                  </tr>
                </tbody>
              </Table>
              <Button className="bg-dark" onClick={handleAddtoCart}>
                Add to Cart{" "}
              </Button>
            </Col>
          </Row>
        </Container>
      ) : (
        <Alert variant="warning" className="text-center">
          <p> No Such Product Exists !!! Search Another Product</p>
          <h3>
            {" "}
            <Link to="/products">Go Back</Link>
          </h3>
        </Alert>
      )}
    </div>
  );
}

export default ProductDetails;

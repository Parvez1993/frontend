import React, { useEffect, useReducer, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import Ratings from "../components/Ratings";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const initialState = { loading: false, products: [], error: false };

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
}

function Product() {
  const [{ products, loading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const getProducts = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const tempProducts = await axios.get("/products");
        dispatch({ type: "FETCH_SUCCESS", payload: tempProducts.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL" });
      }
    };

    getProducts();
  }, []);

  return (
    <div>
      {loading ? (
        <Spinner animation="grow" />
      ) : (
        <Container>
          <Helmet>
            <title>Products</title>
          </Helmet>
          <div className="row">
            {products.map((item, k) => {
              const {
                name,
                description,
                price,
                img,
                ratings,
                numberOfRatings,
                slug,
              } = item;
              return (
                <div className="col-lg-3 col-md-6 mb-4 mb-lg-0 my-3">
                  <Link to={`/products/${slug}`}>
                    <div className="card rounded shadow-sm border-0">
                      <div className="card-body p-4">
                        <img
                          src={img}
                          alt={name}
                          className="img-fluid d-block mx-auto mb-3"
                        />
                        <h5>{name}</h5>
                        <div>
                          <Ratings
                            ratings={ratings}
                            numberOfRatings={numberOfRatings}
                          ></Ratings>
                        </div>
                        <p className="small text-muted font-italic">
                          {description}
                        </p>
                        <h4 className="small text-muted font-bold">${price}</h4>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </Container>
      )}
    </div>
  );
}

export default Product;

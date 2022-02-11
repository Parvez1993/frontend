import React from "react";
import { Container } from "react-bootstrap";

import data from "../data";

function FeaturedProducts() {
  return (
    <>
      <Container>
        <div className="row">
          {data.map((item, k) => {
            const { name, description, price, img } = item;
            return (
              <div className="col-lg-3 col-md-6 mb-4 mb-lg-0 my-3">
                <div className="card rounded shadow-sm border-0">
                  <div className="card-body p-4">
                    <img
                      src={img}
                      alt={name}
                      className="img-fluid d-block mx-auto mb-3"
                    />
                    <h5>{name}</h5>
                    <p className="small text-muted font-italic">
                      {description}
                    </p>
                    <h4 className="small text-muted font-bold">${price}</h4>
                    <ul className="list-inline small">
                      <li className="list-inline-item m-0">
                        <i className="fa fa-star text-success"></i>
                      </li>
                      <li className="list-inline-item m-0">
                        <i className="fa fa-star text-success"></i>
                      </li>
                      <li className="list-inline-item m-0">
                        <i className="fa fa-star text-success"></i>
                      </li>
                      <li className="list-inline-item m-0">
                        <i className="fa fa-star text-success"></i>
                      </li>
                      <li className="list-inline-item m-0">
                        <i className="fa fa-star-o text-success"></i>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
}

export default FeaturedProducts;

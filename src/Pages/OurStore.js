import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import { AiOutlineCheck } from "react-icons/ai";
import { CgUnavailable } from "react-icons/cg";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";

import axios from "axios";
import { addtoCart } from "../redux/Slice/cartSlice";

export default function OurStore() {
  const dispatch = useDispatch();
  const [sums, setSums] = useState([]);
  const prods = useSelector((state) => state.prod.products);

  useEffect(() => {
    // Make an HTTP request to fetch the sums of data
    axios
      .get(process.env.REACT_APP_BASE_URL + "/prod/sumCategory")
      .then((response) => {
        setSums(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  ///
  const [title, setTitle] = useState("");

  return (
    <div className="p-2">
      <div className="d-flex justify-content-center m-2">
        <input
          className="rounded-5"
          style={{
            border: "3px solid #001f3f",
            color: "#85144b",
            width: "450px",
            height: "50px",
          }}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
        />
      </div>
      <div
        className="d-lg-flex justify-content-between  border border-2 p-3  mb-3 d-block gap-3 gap-lg-0 rounded-5"
        style={{ backgroundColor: "#001f3f" }}
      >
        <ListGroup className="d-flex flex-lg-column mt-3  gap-4 rounded-5  border border-2 align-items-center pb-2">
          <ListGroup.Item
            className="text-center fs-2 w-100"
            style={{ color: "#001f3f" }}
          >
            Our category
          </ListGroup.Item>
          {sums.map((sum, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex justify-content-between gap-3 rounded-5 m-1"
              style={{ width: "300px", color: "#85144b" }}
            >
              <span>{sum._id}</span>
              <small
                className="rounded-9 d-flex align-items-center justify-content-center shadow-1-strong text-white"
                style={{
                  width: "60px",
                  height: "35px",
                  backgroundColor: "#001f3f",
                }}
              >
                {sum.total}
              </small>
            </ListGroup.Item>
          ))}
        </ListGroup>

        <div
          className="d-flex flex-wrap justify-content-around gap-3 border border-2 mt-2 p-1 rounded-5"
          style={{ backgroundColor: "#85144b" }}
        >
          {prods
            .filter((prod) => {
              return title.toLowerCase() === ""
                ? prod
                : prod.title.toLowerCase().includes(title.toLowerCase());
            })
            .map((prod) => (
              // Display the relevant field from the search results
              <Card
                style={{ width: "22rem" }}
                key={prod._id}
                className="border border-2 p-2 mt-2 text-center "
              >
                <Card.Title style={{ color: "#001f3f" }}>
                  {prod.title}
                </Card.Title>
                <Card.Img
                  variant="top"
                  src={prod.image.url}
                  alt={prod.title}
                  width="100%"
                  height="350"
                />
                <Card.Body>
                  <Card.Title style={{ color: "#85144b" }}>
                    {prod.category}
                  </Card.Title>
                  <Card.Title style={{ color: "#001f3f" }}>
                    $ {prod.price}
                  </Card.Title>
                  <Card.Title>
                    {prod.quantity > 0 ? (
                      <span className="text-success">
                        {" "}
                        <AiOutlineCheck /> Available{" "}
                      </span>
                    ) : (
                      <span className="text-danger">
                        <CgUnavailable /> unavailable
                      </span>
                    )}
                  </Card.Title>
                </Card.Body>
                <Card.Link className="d-flex justify-content-center gap-3">
                  <Link
                    to={`/Prod-details/${prod._id}`}
                    style={{ color: "#85144b" }}
                    onClick={() => {
                      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                    }}
                  >
                    <AiOutlineEye />
                  </Link>
                  <Link
                    onClick={() => dispatch(addtoCart(prod))}
                    style={{ color: "#85144b" }}
                  >
                    <AiOutlineShoppingCart />
                  </Link>
                </Card.Link>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}

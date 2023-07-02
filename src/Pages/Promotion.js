import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import { AiOutlineEye } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { Card, Container } from "react-bootstrap";
import { addtoCart } from "../redux/Slice/cartSlice";
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function Promotion() {
  const dispatch = useDispatch();
  const prods = useSelector((state) =>
    state.prod.products.filter((prod) => prod.codPromo > 0)
  );
  const [promoProduct, setPromoProduct] = useState(prods);

  useEffect(() => {
    setPromoProduct(prods);
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <Container className="my-5 text-center">
      <div
        md="6"
        lg="4"
        className="d-md-flex align-items-md-center flex-wrap gap-md-0 gap-2  mb-3 flex-md-row flex-column  justify-content-md-center row"
      >
        {prods.map((prod) => (
          <Card
            style={{ width: "20rem" }}
            key={prod._id}
            className="p-2 text-center  m-auto m-md-3"
          >
            <Card.Title
              className="d-flex  justify-content-between"
              style={{ color: "#001f3f" }}
            >
              {prod.title}{" "}
              <small className="bg-danger rounded-9 p-1 text-white">
                {" "}
                - {prod.codPromo}%
              </small>
            </Card.Title>
            <Card.Img src={prod.image.url} alt={prod.title} height="350" />
            <Card.Body>
              <Card.Text style={{ color: "#85144b" }}>
                {prod.category}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item
                className="d-flex justify-content-center gap-5"
                style={{ color: "#001f3f" }}
              >
                ${prod.price - (prod.price * prod.codPromo) / 100}{" "}
                <span
                  className="text-decoration-line-through"
                  style={{ color: "#85144b" }}
                >
                  {" "}
                  ${prod.price}
                </span>
              </ListGroup.Item>
              <ListGroup.Item style={{ color: "#001f3f" }}>
                {prod.author}
              </ListGroup.Item>
              <ListGroup.Item style={{ color: "#001f3f" }}>
                {prod.publisher}
              </ListGroup.Item>
              <ListGroup.Item style={{ color: "#001f3f" }}>
                {prod.editionYear}
              </ListGroup.Item>
            </ListGroup>
            <Card.Body className="d-flex justify-content-center gap-3">
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
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
}

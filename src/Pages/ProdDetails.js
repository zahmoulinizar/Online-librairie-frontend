import React from "react";
import {  useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProd } from "../redux/Slice/ProdSlice";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { AiOutlineCheck } from "react-icons/ai";
import { CgUnavailable } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";


export default function ProdDetails() {
  const product = useSelector((state) => state.prod.product);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getProd(id));
  }, [id]);
  // update product

  return (
    <Container
      className="rounded-8 mt-2 text-white"
      variant="top"
      position="top"
      style={{ backgroundColor: "#85144b" }}
    >
      <div>
        <h2 className="text-center">{product?.title}</h2>
      </div>
      <Row className=" m-2 p-2 gap-0  h-100 rounded-8 p-md-1 p-sm-0" style={{ backgroundColor: "#001f3f" , border: "3px solid #001f3f"}}
>
        <Col className="col-12  p-2 bg-white col-lg-6 rounded-8 p-md-1 p-sm-0" style={{ border: "3px solid #001f3f" }}>
          <img src={product?.image?.url} alt="cover img" width="100%"  className="rounded-8"/>
        </Col>
        <Col className="col-12 d-flex  p-2  bg-white  col-lg-6 rounded-8 p-md-1 p-sm-0" style={{ border: "3px solid #001f3f" }}>
          <ListGroup className="rounded-8 w-100" style={{ border: "3px solid #001f3f" }}>
            <ListGroup.Item  style={{ borderBottom: "3px solid #001f3f"}}>
              <div style={{ color: "#001f3f" }}><strong style={{ color: "#85144b" }}>Publisher :</strong> {product?.publisher}</div>
            </ListGroup.Item>
            <ListGroup.Item style={{ borderBottom: "3px solid #001f3f"}}>
              <div style={{ color: "#001f3f" }}><strong style={{ color: "#85144b" }}>Price : </strong> $ {product?.price}</div>
            </ListGroup.Item>
            <ListGroup.Item style={{ borderBottom: "3px solid #001f3f"}}>
              <div style={{ color: "#001f3f" }}><strong style={{ color: "#85144b" }}>Description : </strong>
              {product?.desc}</div>
            </ListGroup.Item>
            <ListGroup.Item style={{ borderBottom: "3px solid #001f3f"}}>
              <div style={{ color: "#001f3f" }}><strong style={{ color: "#85144b" }}>Author : </strong> {product?.author}</div>
            </ListGroup.Item>
            <ListGroup.Item style={{ borderBottom: "3px solid #001f3f"}}>
             <div style={{ color: "#001f3f" }}> <strong style={{ color: "#85144b" }}>Year of edition : </strong>
              {product?.editionYear}</div>
            </ListGroup.Item>
            <ListGroup.Item style={{ borderBottom: "3px solid #001f3f"}}>
              <div style={{ color: "#001f3f" }}><strong style={{ color: "#85144b" }}>Category : </strong>
              {product?.category}</div>
            </ListGroup.Item>
            <ListGroup.Item style={{ borderBottom: "3px solid #001f3f"}}>
              <div style={{ color: "#001f3f" }}><strong style={{ color: "#85144b" }}>Genre : </strong>
              {product?.genre}</div>
            </ListGroup.Item>

            <ListGroup.Item style={{ borderBottom: "3px solid #001f3f"}}>
              {product?.quantity > 0 ? (
                <span className="text-success">
                  {" "}
                  <AiOutlineCheck /> Available{" "}
                </span>
              ) : (
                <span className="text-danger">
                  <CgUnavailable /> unavailable
                </span>
              )}
            </ListGroup.Item>
            <ListGroup.Item className="border border-0 m-3 p-2">
              {product?.quantity === 10 && (
                <Button className="bg-danger fs-6">
                  Last {product?.quantity} product in stock
                </Button>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

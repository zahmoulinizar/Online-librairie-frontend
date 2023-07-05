import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerItem } from "../redux/Slice/userSlice";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import img from "../Assets/Images/Brown Aesthetic Library Novel Book Cover A4 Document.jpg";
import ForgetPass from "./Forgetpass";
import Forgetpass from "./Forgetpass";

function Register() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  console.log(image);
  const user = { name, email, phone, address, password, image };
  console.log(user);

  const uploadHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    } else {
      setImage("");
    }
  };
  const registerHandler = (e) => {
    e.preventDefault();
    dispatch(registerItem(user));
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setPassword("");
  };

  return (
    <Container className="m-auto p-3">
      <Row className="gap-3" style={{ color: "#85144b" }}>
        <Col lg="4">
          <img src={img} alt="" variant="top" width={"100%"} height={"100%"} className="rounded-8" />
        </Col>
        <Col lg="6">
          {" "}
          <Form
           className="w-100 h-100 d-flex flex-column flex-wrap gap-4  p-4 rounded-8 "
            enctype="multipart/form-data"
            height={"100%"}
          >
            <Form.Group className="d-flex mb-3" controlId="formGroupName">
              <Form.Control
              className="d-flex flex-column flex-wrap gap-4 rounded-5 "
              style={{ border: "3px solid #001f3f", color: "#85144b" }}
                type="text"
                placeholder="Enter UserName"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3 d-flex" controlId="formGroupEmail">
              <Form.Control
              className="d-flex flex-column flex-wrap gap-4 rounded-5 "
              style={{ border: "3px solid #001f3f", color: "#85144b" }}
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3 d-flex" controlId="formGroupPhone">
              <Form.Control
              className="d-flex flex-column flex-wrap gap-4 rounded-5 "
              style={{ border: "3px solid #001f3f", color: "#85144b" }}
                type="text"
                placeholder="Enter phone number"
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3 d-flex" controlId="formGroupAddress">
              <Form.Control
              className="d-flex flex-column flex-wrap gap-4 rounded-5 "
              style={{ border: "3px solid #001f3f", color: "#85144b"}}
                type="text"
                placeholder="Enter address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3 d-flex" controlId="formGroupImage">
              <Form.Control
              className="d-flex flex-column flex-wrap gap-4 rounded-5 "
              style={{ border: "3px solid #001f3f", color: "#85144b" }}
                class="form-control-file"
                type="file"
                accept="image/"
                placeholder="product Brand"
                autoFocus
                onChange={uploadHandler}
              />
            </Form.Group>

            <Form.Group className="d-flex mb-3" controlId="formGroupPassword">
              <Form.Control
              className="d-flex flex-column flex-wrap gap-4 rounded-5 "
              style={{ border: "3px solid #001f3f", color: "#85144b" }}
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
            className="w-100  text-center fs-5  p-1 text-uppercase  rounded-3 "
            style={{ backgroundColor: "#001f3f" }}
              type="submit"
              onClick={registerHandler}
            >
              Sign Up
            </Button>
            <Link
              to="/forget"
              className="w-100  text-center fs-5  text-decoration-underline "
              style={{ color: "#85144b" }}
            >
              Forget your password ?
            </Link>
            <Link
              to="/login"
              className="w-100  text-center fs-5 rounded-3 p-1 text-uppercase"
              style={{ border: "3px solid #001f3f", color: "#001f3f" }}
            >
              Sign in
            </Link>
          </Form>
        </Col>
      
      </Row>
    </Container>
  );
}

export default Register;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginItem } from "../redux/Slice/userSlice";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import img from "../Assets/Images/1.png";
import Forgetpass from "./Forgetpass";
//import video1 from "../Assets/video/Library books,No Copyright, Copyright Free Video, Motion Graphics, Background Video.mp4"
export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();
  const user = { email, password, role };
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    // if (auth.isLogin)  {navigate("/Profile")};
    if (auth.user?.role === "admin") {
      navigate("/");
    }
    if (auth.user?.role === "user") {
      navigate("/accueil");
    }
    // else {navigate("/newProduct")}
  }, [auth.user?.role, navigate]);

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginItem(user));
  };
  return (
    <Container className="p-1">
      <Row className="gap-2 gap-md-0">
        <Col lg="4" md="6">
          <img
            src={img}
            alt=""
            variant="top"
            width={"100%"}
            height={"100%"}
            className=" rounded-8"
          />
        </Col>
        <Col lg="4" md="6">
          <Form
            className="w-100 h-100 d-flex flex-column flex-wrap gap-4  p-4 rounded-8 "
          >
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label style={{ color: "#001f3f" }}>
                Email address
              </Form.Label>
              <Form.Control
                className="rounded-5 "
                style={{ border: "3px solid #001f3f", color: "#85144b" }}
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label style={{ color: "#001f3f" }}>Password</Form.Label>
              <Form.Control
                className="rounded-5 "
                style={{ border: "3px solid #001f3f", color: "#85144b" }}
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              className="w-100  text-center fs-5  p-1 text-uppercase  rounded-3 "
              style={{ backgroundColor: "#001f3f" }}
              variant="primary"
              type="submit"
              onClick={loginHandler}
            >
              Sign In
            </Button>
            <Link
              to="/forget"
              className="w-100  text-center fs-5  text-decoration-underline "
              style={{ color: "#85144b" }}
            >
              Forget your password ?
            </Link>
            <Link
              to="/register "
              className="w-100  text-center fs-5 rounded-3 p-1 text-uppercase"
              style={{ border: "3px solid #001f3f", color: "#001f3f" }}
            >
              Register{" "}
            </Link>
          </Form>
        </Col>
        <Col lg="3" md="12" >
          <Forgetpass />
        </Col>
      </Row>
    </Container>
  );
}

import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { updateUser } from "../redux/Slice/userSlice";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import { Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import img from "../Assets/Images/1.png";

export default function Profile() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const user = { name, password, phone, address, image };
  const [users, setUsers] = useState([]);
  function getUsers() {
    axios
      .get(process.env.REACT_APP_BASE_URL + "/user/Profile", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((Response) => {
        setUsers(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getUsers();
  }, []);
  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser(user));
    setIsEdit(false);
    setName("");
    setPassword("");
  };
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

  return (
    <Container>
      <section
        class="vh-100"
        //style={{backgroundColor: '#9de2ff'}}
      >
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center ">
            <div class="col col-md-9 col-lg-10 col-xl-10 d-flex justify-content-center">
              <div
                class="card"
                //style="border-radius: 15px;"
              >
                <div class="card-body ">
                  <div class="d-flex text-black">
                    <div class="flex-shrink-0">
                      <img
                        src={users.image?.secure_url}
                        alt="Generic placeholder image"
                        class="img-fluid"
                        style={{ width: "180px", borderRadius: "10px" }}
                      />
                    </div>
                    <hr/>
                    <div class="flex-grow-1 ms-3 gap-4  ps-3 border-start">
                      <h5 class="m-1 p-1">Name : {users.name}</h5>
                      <hr/>
                      <h6 class="m-1 p-1" style={{ color: "#2b2a2a" }}>
                        Email : {users.email}
                      </h6>
                      <hr/>
                      <h6 class="mb-2 pb-1" style={{ color: "#2b2a2a" }}>
                        Address : {users.address}
                      </h6>
                      <hr/>
                      <h6 class="mb-2 pb-1" style={{ color: "#2b2a2a" }}>
                        Phone : {users.phone}
                      </h6>
                      <hr/>
                      <div
                        class="d-flex justify-content-start rounded-3 p-2 mb-2"
                        //style="background-color: #efefef;"
                      >
                       
                      </div>
                      <div class="d-flex pt-1">
                        {!isEdit && <Link
                          className="w-100 border border-2 text-center fs-5  p-1 text-uppercase text-white"
                          style={{ backgroundColor: "#001f3f" }}
                          onClick={() => setIsEdit(true)}
                        >
                          Update
                        </Link>}
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {isEdit && (
                  <Form
                    className="m-4 p-3"
                    style={{
                      width: "25rem",
                      height: "25rem",
                      borderRadius: "8px",
                    }}
                  >
                    <Form.Group className="mb-3" controlId="formGroupName">
                      <Form.Control
                        type="text"
                        placeholder="Enter UserName"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupImage">
                      <Form.Label>Image</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/"
                        onChange={uploadHandler}
                      />
                    </Form.Group>
                    <Button
                      className="w-100 border border-2 text-center fs-5  p-1 text-uppercase"
                      style={{ backgroundColor: "#001f3f" }}
                      type="submit"
                      onClick={updateHandler}
                    >
                      Edit
                    </Button>
                  </Form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}

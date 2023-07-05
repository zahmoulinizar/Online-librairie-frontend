import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { updateUser } from "../redux/Slice/userSlice";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

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
    setAddress("");
    setPhone("");
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
      <div className="m-auto w-100 d-flex  flex-wrap  justify-content-center p-5  m gap-2">
        <div className="d-flex flex-wrap  justify-content-center gap-2">
          <div >
            <img
              src={users.image?.secure_url}
              alt=" image"
              class="img-fluid"
              style={{ width: "180px", height:"180px" , borderRadius: "10px" }}
            />
          </div>
          <div className="d-flex flex-column gap-3  ">
            <h5 class="m-1 p-1" style={{ color: " #001f3f" }}><h4 style={{color: "#85144b"}}>Name :</h4> {users.name}</h5>
            <h6 class="m-1 p-1" style={{ color: " #001f3f" }}><h5 style={{color: "#85144b"}}>Email :</h5> {users.email}</h6>
            <h6 class="m-1 p-1" style={{ color: " #001f3f" }}><h5 style={{color: "#85144b"}}>Address :</h5> {users.address}</h6>
            <h6 class="m-1 p-1" style={{ color: " #001f3f" }}><h5 style={{color: "#85144b"}}>Phone : </h5>{users.phone}</h6>
            <div class="d-flex pt-1 justify-content-center w-75">
              {!isEdit && (
                <Link
                  className="w-100 border border-2 text-center fs-5  p-1 text-uppercase text-white"
                  style={{ backgroundColor: "#001f3f" }}
                  onClick={() => setIsEdit(true)}
                >
                  Update
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="d-flex flex-column  p-3">
          {isEdit && (
            <Form
              className="m-4"
              style={{
                width: "18rem",
                borderRadius: "8px",
              }}
            >
              <Form.Group className="mb-3" controlId="formGroupName">
                <Form.Control
                  type="text"
                  placeholder="Enter UserName"
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-5 "
                style={{ border: "3px solid #001f3f", color: "#85144b" }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Control
                  type="password"
                  placeholder="Your password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-5 "
                style={{ border: "3px solid #001f3f", color: "#85144b" }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Control
                  type="number"
                  placeholder="Your phone number"
                  onChange={(e) => setPhone(e.target.value)}className="rounded-5 "
                  style={{ border: "3px solid #001f3f", color: "#85144b" }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Control
                  type="text"
                  placeholder="Your address"
                  onChange={(e) => setAddress(e.target.value)}
                  className="rounded-5 "
                style={{ border: "3px solid #001f3f", color: "#85144b" }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupImage">
                <Form.Control
                  type="file"
                  accept="image/"
                  onChange={uploadHandler}
                  className="rounded-5 "
                style={{ border: "3px solid #001f3f", color: "#85144b" }}
                />
              </Form.Group>
              <Button
                className="w-100 text-center fs-5  p-1 text-uppercase"
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
    </Container>
  );
}

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button,Col, Container,  Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Table from "react-bootstrap/Table";

import {
  AddProd,
  deleteProd,
  getAllProducts,
} from "../redux/Slice/ProdSlice";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import {RiProductHuntLine } from "react-icons/ri";
import { Link } from "react-router-dom";

function AdminDashboard() {
  //const name = useSelector((state) => state.auspan.user?.userName);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [genre, setGenre] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [publisher, setPublisher] = useState("");
  const [editionYear, setEditionYear] = useState("");
  const [author, setAuthor] = useState("");
  const [codPromo, setCodPromo] = useState("");
  const [image, setImage] = useState("");
  const [show, setShow] = useState(false);
  const product = {
    title,
    genre,
    desc,
    quantity,
    price,
    category,
    editionYear,
    author,
    publisher,
    codPromo,
    image,
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //get  product from slice

  const products = useSelector((state) => state.prod.products);

  // function to add product
  const CreateProdHandler = () => {
    dispatch(AddProd(product));
  };
  useEffect(() => {
    handleClose();
  }, [products]);

  // uplaod image
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

  // getting all products

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  // delete product
  const deleteProdHandler = (id) => {
    dispatch(deleteProd(id));
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [users, setUsers] = useState([]);
  // numbers of admins
  let admin = 0 ;
  users.map((user)=>{
    if( user['role'] === 'admin' ){
      return ++admin;
  }})
  const auth = useSelector((state) => state.auth);
  const[TotalCat , setTotalCat] = useState([])

  function getUsers() {
    axios
      .get(process.env.REACT_APP_BASE_URL + "/user/allUsers", {
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

  //////////////////////////////////// getting total of product ////////////

  const [sums, setSums] = useState([]);
  const prods = useSelector((state) => state.prod.products);

  useEffect(() => {
    // Make an HTTP request to fetch the sums of data
    axios
      .get(process.env.REACT_APP_BASE_URL + "/prod/TotalProd")
      .then((response) => {
        setSums(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
  return (
    <Container>
      <div className="d-flex justify-content-end m-3">
        <Button
          variant="primary"
          onClick={handleShow}
          className="w-50  text-center fs-5  p-2 text-uppercase  rounded-3 "
          style={{ backgroundColor: "#001f3f" }}
        >
          new product
        </Button>
        {
          //  start for Modal to add product
        }
        <Modal show={show} onHide={handleClose} size="md">
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "#001f3f" }}>
              Product creating{" "}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col>
                  {" "}
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label style={{ color: "#001f3f" }}>
                      Title <span className="text-danger"> * </span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Title"
                      autoFocus
                      required
                      onChange={(e) => setTitle(e.target.value)}
                      style={{ border: "3px solid #001f3f", color: "#85144b" }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label style={{ color: "#001f3f" }}>
                      Genre <span className="text-danger"> * </span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Genre"
                      autoFocus
                      required
                      onChange={(e) => setGenre(e.target.value)}
                      style={{ border: "3px solid #001f3f", color: "#85144b" }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label style={{ color: "#001f3f" }}>
                      Publisher <span className="text-danger"> * </span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Publisher"
                      autoFocus
                      required
                      onChange={(e) => setPublisher(e.target.value)}
                      style={{ border: "3px solid #001f3f", color: "#85144b" }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label style={{ color: "#001f3f" }}>
                      Author <span className="text-danger"> * </span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Author"
                      autoFocus
                      required
                      onChange={(e) => setAuthor(e.target.value)}
                      style={{ border: "3px solid #001f3f", color: "#85144b" }}
                    />
                  </Form.Group>
                </Col>{" "}
              </Row>
              <Row>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label style={{ color: "#001f3f" }}>
                      Category <span className="text-danger"> * </span>
                    </Form.Label>

                    <Form.Select
                      aria-label="Default select example"
                      onChange={(e) => setCategory(e.target.value)}
                      required
                      style={{ border: "3px solid #001f3f", color: "#85144b" }}
                    >
                      <option>Select your category</option>
                      <option value="Tunisien edition book">
                        Tunisien edition book
                      </option>
                      <option value="Arabic edition book">
                        Arabic edition book
                      </option>
                      <option value="French edition book">
                        French edition book
                      </option>
                      <option value="book in english">book in english</option>
                      <option value="school and pedagogical book">
                        school and pedagogical book
                      </option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label style={{ color: "#001f3f" }}>
                      Price <span className="text-danger"> * </span>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="price"
                      required
                      autoFocus
                      onChange={(e) => setPrice(e.target.value)}
                      style={{ border: "3px solid #001f3f", color: "#85144b" }}
                    />
                  </Form.Group>
                </Col>{" "}
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label style={{ color: "#001f3f" }}>
                      Quantity <span className="text-danger"> * </span>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Quantity"
                      required
                      autoFocus
                      onChange={(e) => setQuantity(e.target.value)}
                      style={{ border: "3px solid #001f3f", color: "#85144b" }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label style={{ color: "#001f3f" }}>
                      description
                    </Form.Label>

                    <FloatingLabel
                      controlId="floatingTextarea2"
                      label="Description"
                    >
                      <Form.Control
                        as="textarea"
                        style={{
                          border: "3px solid #001f3f",
                          color: "#85144b",
                          height: "100px",
                        }}
                        autoFocus
                        onChange={(e) => setDesc(e.target.value)}
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label style={{ color: "#001f3f" }}>
                      Year of edition <span className="text-danger"> * </span>{" "}
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Year of edition"
                      autoFocus
                      required
                      onChange={(e) => setEditionYear(e.target.value)}
                      style={{ border: "3px solid #001f3f", color: "#85144b" }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label style={{ color: "#001f3f" }}>
                      Promotion{" "}
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Promotion"
                      autoFocus
                      onChange={(e) => setCodPromo(e.target.value)}
                      style={{ border: "3px solid #001f3f", color: "#85144b" }}
                    />
                  </Form.Group>
                </Col>{" "}
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label style={{ color: "#001f3f" }}>Image</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/"
                      autoFocus
                      onChange={uploadHandler}
                      style={{ border: "3px solid #001f3f", color: "#85144b" }}
                    />
                  </Form.Group>
                  <img src={image} alt="" height={32} width={32} />
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={CreateProdHandler}
              className="w-100 text-center fs-5  p-1  rounded-3 "
              style={{ backgroundColor: "#001f3f" }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        {
          //  end for  Modal to add product
        }
      </div>

      <div class="row d-flex justify-content-center">
        <div class="mt-6 col-xl-4 col-lg-6 col-md-12 col-12">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h4 class="mb-0" style={{ color: " #001f3f" }}>
                    Products
                  </h4>
                </div >
                 <div className="fs-4" style={{ color: " #001f3f" }}> <RiProductHuntLine/></div>
              </div>
              <div>
                <h1 class="fw-bold">
                  {sums.map((sum, index) => (
                    <div key={index}>
                      <span>{sum._id}</span>
                      <small
                        style={{
                          width: "60px",
                          height: "35px",
                          color: "#85144b",
                        }}
                      >
                        {sum.total}
                      </small>
                    </div>
                  ))}
                </h1>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-6 col-xl-4 col-lg-6 col-md-12 col-12">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h4 class="mb-0" style={{ color: " #001f3f" }}> Teams</h4>
                </div>
                <div class="icon-shape fs-4" style={{ color: " #001f3f" }}>
                  <AiOutlineUsergroupAdd/>
                </div>
              </div>
              <div>
                <h1 class="fw-bold">{users.length}</h1>
                <p class="mb-0">
                  <span classname="text-dark me-2">{admin}</span> admins
                </p>
              </div>
            </div>
          </div>
        </div>
        
      </div>

      {
        // start for  table to display all products
      }
      <div className="bg-white py-4 m-2 card-header">
        <h3 className="mb-0 fs-3" style={{ color: "#85144b" }}>
          {" "}
          Products{" "}
        </h3>
      </div>

      <Table class="text-nowrap  mt-3 table" responsive size="lg" hover>
        <thead style={{ backgroundColor: "#001f3f" }}>
          <tr>
            <th style={{ color: "#fff" }}>Image</th>
            <th style={{ color: "#fff" }}>Title </th>
            <th style={{ color: "#fff" }}>Author</th>
            <th style={{ color: "#fff" }}>Genre</th>
            <th style={{ color: "#fff" }}>Publisher</th>
            <th style={{ color: "#fff" }}>Category</th>
            <th style={{ color: "#fff" }}>Quantity</th>
            <th style={{ color: "#fff" }}>Price</th>
            <th style={{ color: "#fff" }}> Promo</th>
            <th style={{ color: "#fff" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr Key={product._id}>
              <td>
                <img src={product.image.url} alt="" height={62} width={45} />
              </td>
              <td>
                <div
                  className="d-flex flex-column"
                  style={{ color: "#001f3f" }}
                >
                  {product.title}{" "}
                </div>
              </td>
              <td style={{ color: "#001f3f" }}>{product.author}</td>
              <td style={{ color: "#001f3f" }}>{product.genre}</td>
              <td style={{ color: "#001f3f" }}>{product.publisher}</td>
              <td style={{ color: "#001f3f" }}>{product.category}</td>
              <td style={{ color: "#001f3f" }}>{product.quantity}</td>
              <td style={{ color: "#001f3f" }}>{product.price}</td>

              <td style={{ color: "#001f3f" }}>{product.codPromo}</td>
              <td className="d-flex ">
                <Link
                  to={`/Prod-details/${product._id}`}
                  style={{ color: "#85144b" }}
                  className="fs-5"
                >
                  <AiOutlineEye />
                </Link>
                <Link
                  to={`/UpdateProd/${product._id}`}
                  style={{ color: "#85144b" }}
                  className="fs-5"
                >
                  <AiOutlineEdit />
                </Link>

                <Link
                  onClick={() => deleteProdHandler(product._id)}
                  style={{ color: "#85144b" }}
                  className="fs-5"
                >
                  <AiOutlineDelete />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {
        // end for  table to display all products
      }
      {
        //get all users
      }
      <div className="bg-white py-4 card-header">
        <h3 className="mb-0 fs-3" style={{ color: "#85144b" }}>
          Teams{" "}
        </h3>
      </div>
      <Table className="text-nowrap table" hover>
        <thead style={{ backgroundColor: "#001f3f" }}>
          <tr>
            <th style={{ color: "#fff" }}>image</th>
            <th style={{ color: "#fff" }}>Name</th>
            <th style={{ color: "#fff" }}>Email</th>
            <th style={{ color: "#fff" }}>Address</th>
            <th style={{ color: "#fff" }}>Phone</th>
            <th style={{ color: "#fff" }}>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td className="align-middle">
                <img
                  src={user.image?.secure_url}
                  alt=""
                  height="35"
                  width="35"
                  style={{ objectFit: "cover" }}
                />
              </td>
              <td className="align-middle">{user.name}</td>
              <td className="align-middle">{user.email}</td>
              <td className="align-middle">{user.address}</td>
              <td className="align-middle">{user.phone}</td>
              <td className="align-middle">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminDashboard;

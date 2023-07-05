import React, { useEffect, useState } from "react";
import { getAllProducts, updateProd } from "../redux/Slice/ProdSlice";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { Col, FloatingLabel, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";

export default function UpdateProd() {
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
  const [image, setImage] = useState("");
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
    image,
  };
  // upload image
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
  const { id } = useParams();
  console.log(id)
  const updateProdhandler = () => {
    dispatch(updateProd({product , id}));
  };
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    
        <Form className="m-auto p-2 w-75">
          <Row>
            <Col>
              {" "}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="text"
                  placeholder="Title"
                  autoFocus
                  onChange={(e) => setTitle(e.target.value)}
                  className="rounded-5 "
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
                <Form.Control
                  type="text"
                  placeholder="Genre"
                  autoFocus
                  onChange={(e) => setGenre(e.target.value)}
                  className="rounded-5 "
                style={{ border: "3px solid #001f3f", color: "#85144b" }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="text"
                  placeholder="Publisher"
                  autoFocus
                  onChange={(e) => setPublisher(e.target.value)}
                  className="rounded-5 "
                style={{ border: "3px solid #001f3f", color: "#85144b" }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="text"
                  placeholder="Author"
                  autoFocus
                  onChange={(e) => setAuthor(e.target.value)}
                  className="rounded-5 "
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

                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setCategory(e.target.value)}
                  className="rounded-5 "
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
                <Form.Control
                  type="number"
                  placeholder="price"
                  autoFocus
                  onChange={(e) => setPrice(e.target.value)}
                  className="rounded-5 "
                style={{ border: "3px solid #001f3f", color: "#85144b" }}
                />
              </Form.Group>
            </Col>{" "}
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="number"
                  placeholder="Quantity"
                  autoFocus
                  onChange={(e) => setQuantity(e.target.value)}
                  className="rounded-5 "
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

                <FloatingLabel
                  controlId="floatingTextarea2"
                  label="Description"
                >
                  <Form.Control
                    as="textarea"
                    autoFocus
                    onChange={(e) => setDesc(e.target.value)}
                    className="rounded-5 "
                    style={{ border: "3px solid #001f3f", color: "#85144b"  ,height: "100px"}}
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
                <Form.Control
                  type="number"
                  placeholder="Year of edition"
                  autoFocus
                  onChange={(e) => setEditionYear(e.target.value)}
                  className="rounded-5 "
                style={{ border: "3px solid #001f3f", color: "#85144b" }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="file"
                  accept="image/"
                  autoFocus
                  onChange={uploadHandler}
                  className="rounded-5 "
                style={{ border: "3px solid #001f3f", color: "#85144b" }}
                />
              </Form.Group>
              <img src={image} alt="" height={32} width={32} />
            </Col>
          </Row>
          <Button variant="primary" onClick={updateProdhandler} className="w-100  text-center fs-5  p-1 text-uppercase  rounded-3 "
              style={{ backgroundColor: "#001f3f" }}>
            Save Changes
          </Button>
        </Form>
  
  );
}

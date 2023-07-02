import React from "react";
import aboutImg from "../Assets/Images/about-img.jpg";
import {Container} from "react-bootstrap";
export default function About() {
  return (
    <Container className="m-auto d-md-flex  justify-md-content-center d-block gap-3">
      <div className="p-4">
        <img src={aboutImg} alt="about img" height="500px" />
      </div>
      <div>
        <div className="w-75 p-5 ">
          <h2 className="fs-26 ls-1 text-center" style={{ color: "#85144b" }}>
            About Maktabti
          </h2>
          <p className="fs-17 ms-5   " style={{ color: "#001f3f" }}>
            Maktabti is a virtual platform that offers a wide range of
            digital resources, including books, articles, journals, and
            multimedia materials, accessible to users through the internet. we
            provides a convenient and flexible way to access and explore a vast
            collection of information and knowledge without the limitations of
            physical space or operating hours. we serve as a
            digital hub for research, learning, and enjoyment, enabling users to
            access valuable resources from anywhere and at any time.
          </p>
      
        </div>
      </div>
    </Container>
  );
}

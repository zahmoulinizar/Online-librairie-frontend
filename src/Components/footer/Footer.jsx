import React, { useEffect } from "react";
import "./style.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logos from "../../Assets/Logos/maktabti-website-favicon-white.png";
import { AiOutlineArrowUp } from "react-icons/ai";

const Footer = () => {
  const products = useSelector((state) => state.prod.products);
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

  return (
    <footer style={{ backgroundColor: "#001f3f" }}>
      <div className="container p-4 d-none d-lg-flex">
        <section>
          <div className="row">
            {products.slice(0, 6).map((product) => (
              <div className="col-lg-2 col-md-12 mb-4 mb-md-0">
                <div
                  className="bg-image hover-overlay ripple shadow-1-strong rounded w-100 h-100"
                  data-ripple-color="light"
                >
                  <img
                    src={product.image.url}
                    className="w-100 h-100"
                    width="300"
                    height="300"
                    alt=""
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="d-flex justify-content-start justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href="" className="me-4 link-secondary">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="" className="me-4 link-secondary">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="" className="me-4 link-secondary">
            <i className="fab fa-google"></i>
          </a>
          <a href="" className="me-4 link-secondary">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="" className="me-4 link-secondary">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="" className="me-4 link-secondary">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </section>

      <section className=" border-bottom">
        <div className="container  ">
          <div className="row mt-3">
            <div className="col-md-12 col-lg-4  col-xl-2 col-sm-12  col-12 ">
              <h6 className="fw-bold">
                <img src={logos} alt="" width="35" height="35" /> Maktabti
              </h6>
              <p>
                is an online platform that provides information about the
                library's resources, services, and events. we serves as a
                digital gateway for users to access catalogs, search for books
                and other materials, and learn about the library's facilities
                and programs.
              </p>
            </div>

            <div className="col-md-4 col-lg-4 col-xl-2 col-sm-6 col-6  ">
              <h6 className="fw-bold mb-4">Products</h6>
              {products.slice(0, 3).map((prod) => (
                <p>{prod.title}</p>
              ))}
            </div>

            <div className="col-md-4 col-lg-4 col-xl-2  col-sm-6  col-6 ">
              <h6 className="fw-bold mb-4">Links</h6>
              <p>
                <Link to={"/"} className="text-reset"
                onClick={() => {
                  window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                }}>
                  Home
                </Link>
              </p>
              <p>
                <Link
                  to="/store"
                  className="text-reset"
                  onClick={() => {
                    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                  }}
                >
                  Store
                </Link>
              </p>
              <p>
                <Link to={"/about"} className="text-reset" onClick={() => {
                  window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                }}>
                  About
                </Link>
              </p>
            </div>

            <div className="col-md-4 col-lg-6 col-xl-3  col-sm-6  col-12 ">
              <h6 className=" fw-bold mb-4">Contact</h6>
              <p>
                <i className="fas fa-home me-3 text-secondary"></i> Tunisia
                ,Sfax, Skhira 3050
              </p>
              <p>
                <i className="fas fa-envelope me-3 text-secondary"></i>
                nizarzahmouli351@gmail.com
              </p>
              <p>
                <i className="fas fa-phone me-3 text-secondary"></i> + 216 52
                368 662
              </p>
              <p>
                <i className="fas fa-print me-3 text-secondary"></i> + 01 234
                567 89
              </p>
            </div>
            <div className="col-md-12 col-lg-6 col-xl-3  col-sm-6 col-12 ">
              <form action="">
                <div className="row">
                  <div className="col-md-12 col-12 mb-2 mb-md-0">
                    <a href="mailto:nizarzahmouli351@gmail.com" className="text-white">
                      nizarzahmouli351@gmail.com
                    </a>
                  </div>

                  <div className="mt-3 me-2">
                    © 2023 Copyright :
                    <span className="me-2">maktabti.onrender.com</span>
                  </div>
                </div>
              </form>
              <Link
                className="d-flex justify-content-end fs-3 mt-4 text-white"
                title="top"
                onClick={() => {
                  window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                }}
              >
                <AiOutlineArrowUp/>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;

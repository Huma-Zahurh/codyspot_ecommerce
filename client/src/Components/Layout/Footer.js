import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer>
        <div>
          <div>
            <footer
              className="text-center text-lg-start text-white"
              style={{ backgroundColor: "#1c2331" }}
            >
              <section
                className="d-flex justify-content-between p-4"
                style={{ backgroundColor: "#192d61" }}
              >
                <div className="me-5">
                  <span>Get connected with us on social networks:</span>
                </div>
                <div>
                  <Link to="/" className="text-white me-4">
                    <i className="fab fa-facebook-f" />
                  </Link>
                  <Link to="/" className="text-white me-4">
                    <i className="fab fa-twitter" />
                  </Link>
                  <Link to="/" className="text-white me-4">
                    <i className="fab fa-google" />
                  </Link>
                  <Link to="/" className="text-white me-4">
                    <i className="fab fa-instagram" />
                  </Link>
                  <Link to="/" className="text-white me-4">
                    <i className="fab fa-linkedin" />
                  </Link>
                  <Link to="/" className="text-white me-4">
                    <i className="fab fa-github" />
                  </Link>
                </div>
              </section>
              <section>
                <div className="container text-center text-md-start mt-5">
                  <div className="row mt-3">
                    <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                      <h6 className="text-uppercase fw-bold">CodySpot</h6>
                      <hr
                        className="mb-4 mt-0 d-inline-block mx-auto"
                        style={{
                          width: 60,
                          backgroundColor: "#192d61",
                          height: 2,
                        }}
                      />
                      <p>
                        Here you can use rows and columns to organize your
                        footer content. Lorem ipsum dolor sit amet, consectetur
                        adipisicing elit.
                      </p>
                    </div>
                    <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                      <h6 className="text-uppercase fw-bold">Categories</h6>
                      <hr
                        className="mb-4 mt-0 d-inline-block mx-auto"
                        style={{
                          width: 60,
                          backgroundColor: "#192d61",
                          height: 2,
                        }}
                      />
                      <p>
                        <Link
                          to="/category/chiffon"
                          className="text-white text-decoration-none"
                        >
                          Chiffon
                        </Link>
                      </p>
                      <p>
                        <Link
                          to="/category/mysoori"
                          className="text-white text-decoration-none"
                        >
                          Mysoori
                        </Link>
                      </p>
                      <p>
                        <Link
                          to="/category/organza"
                          className="text-white text-decoration-none"
                        >
                          Organza
                        </Link>
                      </p>
                      <p>
                        <Link
                          to="/category/lawn"
                          className="text-white text-decoration-none"
                        >
                          Lawn
                        </Link>
                      </p>
                    </div>
                    <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                      <h6 className="text-uppercase fw-bold">Useful links</h6>
                      <hr
                        className="mb-4 mt-0 d-inline-block mx-auto"
                        style={{
                          width: 60,
                          backgroundColor: "#192d61",
                          height: 2,
                        }}
                      />
                      <p>
                        <Link
                          to="/dashboard/user"
                          className="text-white text-decoration-none"
                        >
                          Your Account
                        </Link>
                      </p>
                      <p>
                        <Link
                          to="/policy"
                          className="text-white text-decoration-none"
                        >
                          Our Policy
                        </Link>
                      </p>
                      <p>
                        <Link
                          to="/about"
                          className="text-white text-decoration-none"
                        >
                          About Us
                        </Link>
                      </p>
                      <p>
                        <Link
                          to="/shop"
                          className="text-white text-decoration-none"
                        >
                          shop
                        </Link>
                      </p>
                    </div>
                    <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                      <h6 className="text-uppercase fw-bold">Contact</h6>
                      <hr
                        className="mb-4 mt-0 d-inline-block mx-auto"
                        style={{
                          width: 60,
                          backgroundColor: "#192d61",
                          height: 2,
                        }}
                      />
                      <p>
                        <i className="fas fa-home mr-3" /> Pakistan
                      </p>
                      <p>
                        <i className="fas fa-envelope mr-3" /> info@codyspot.com
                      </p>
                      <p>
                        <i className="fas fa-phone mr-3" /> + 92 234 567 88
                      </p>
                      <p>
                        <i className="fas fa-print mr-3" /> + 92 234 567 89
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <div
                className="text-center p-3"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
              >
                © 2023 CodySpot All Rights Reserved
              </div>
            </footer>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

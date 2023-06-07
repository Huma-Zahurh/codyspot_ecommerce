import React from "react";
import Layout from "../Components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About | CodySpot - Shopping Center"}>
      <div className="container d-flex about-main ">
        <div className="pt-5 img-con">
          <img src="../Graphics/about-img.jpg" alt="This is an about " />
        </div>

        <div>
          <div className="">
            <h6 className="text-uppercase fw-bold mt-5">About</h6>
            <hr
              className="mb-4 mt-0 d-inline-block mx-auto"
              style={{ width: 60, backgroundColor: "#192d61", height: 2 }}
            />
            <p className="text-justify mt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              officiis obcaecati esse tempore unde ratione, eveniet mollitia,
              perferendis eius temporibus dicta blanditiis doloremque explicabo
              quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
              accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
              commodi illum quidem neque tempora nam.
            </p>

            <div className="pt-5" style={{ width: "100%" }}>
              <h6 className="text-uppercase fw-bold">Contact</h6>
              <hr
                className="mb-4 mt-0 d-inline-block "
                style={{ width: 60, backgroundColor: "#192d61", height: 2 }}
              />
              <p>
                <i className="fas fa-home " /> New York, NY 10012, US
              </p>
              <p>
                <i className="fas fa-envelope " /> info@example.com
              </p>
              <p>
                <i className="fas fa-phone " /> + 01 234 567 88
              </p>
              <p>
                <i className="fas fa-print " /> + 01 234 567 89
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;

import React from "react";
import Layout from "../Components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy | CodySpot - Shopping Center "}>
      <div className="container d-flex about-main pb-1">
        <div className="pt-5 img-con">
          <img src="../Graphics/policy.jpg" alt="This is an about " />
        </div>

        <div>
          <div className="">
            <h6 className="text-uppercase fw-bold mt-5">Privacy Policy</h6>
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;

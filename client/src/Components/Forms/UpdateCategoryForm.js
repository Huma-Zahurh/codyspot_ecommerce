import React, { useState } from "react";

const UpdateCategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-2">
          <h4 className="mb-4 text-center">UPDATE CATEGORY</h4>
          <input
            type="text"
            className="form-control"
            placeholder="Enter new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="mb-3 ">
          <button type="submit" className="btn blue-btn ">
            Update Category
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateCategoryForm;

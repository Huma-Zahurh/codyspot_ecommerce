import React from "react";
import { SearchContext } from "../../Context/SearchContext";
import { useContext } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const SearchForm = () => {
  const navigate = useNavigate();
  const useSearch = () => useContext(SearchContext);
  const [values, setValues] = useSearch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, result: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="search-form">
        <form className="d-flex" role="search" onSubmit={handleSubmit}>
          <input
            className="form-control me-2 search-input"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          />
          <button className=" search-btn" type="submit">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;

import { useState, createContext } from "react";

const SearchContext = createContext();
const SearchState = ({ children }) => {
  const [search, setSearch] = useState({
    keyword: "",
    result: [],
  });

  return (
    <SearchContext.Provider value={[search, setSearch]}>
      {children}
    </SearchContext.Provider>
  );
};

// const useSearch = () => useContext(SearchContext);

export { SearchContext, SearchState };

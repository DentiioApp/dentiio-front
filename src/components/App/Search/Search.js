// import Icon from "../../../images/titleHeader.svg";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import icon from "../../../images/logoteeth_transparent.png";
import { tryKeywords } from "../../../services/Home";
import { KEYWORDS_LIST } from "../../../store/actions";
import "./Search.scss";

const Search = (props) => {
  const initValues = {
    suggestions: [],
    text: "",
  };
  const [values, setValues] = useState(initValues);
  const keywords = useSelector((state) => state.home.keywords);
  const items = useSelector((state) => state.home.cases);
  const keywordsLoad = tryKeywords();
  const dispatch = useDispatch();

  if (keywordsLoad.length > 0) {
    dispatch({ type: KEYWORDS_LIST, keywords: keywordsLoad });
  }


  const onTextChanged = (e) => {
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = items.sort().filter((v) => regex.test(v));
     
    }
    setValues({ ...values, text: value, suggestions: suggestions });
  };

  const suggestionsSelected = (value) => {
    setValues({ ...values, text: value, suggestions: [] });
  };

  
  if (values.suggestions.length === 0) {
    return (
      <div className="wrap">
        <div className="search">
          <input
            onChange={(e) => onTextChanged(e)}
            type="text"
            value={values.text}
            id="search-input"
            placeholder="search"
            className="searchTerm"
          />
          <button class="searchButton">
            <img src={icon}></img>
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <p>
        {values.suggestions.map((item, index) => (
          <p key={index} onClick={() => suggestionsSelected(item)}>{item}</p>
        ))}
      </p>
    );
  }

  // render() {
  //   return (
  //     <Container maxWidth="lg">
  //       <label className="search-label" htmlFor="search-input"></label>
  //       <input
  //         type="text"
  //         value=""
  //         id="search-input"
  //         placeholder="search"
  //       />
  //     </Container>
  //   );
  // }
};

export default Search;

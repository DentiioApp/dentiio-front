// import Icon from "../../../images/titleHeader.svg";
import React from "react";
import "./Search.scss";
import icon from "../../../images/logoteeth_transparent.png";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.items = ["Branis", "Lory", "Mounia", "Romain", "Arthur"];
    this.state = {
      suggestions: [],
      text: '',
    };
  }

  onTextChanged = (e) => {
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = this.items.sort().filter((v) => regex.test(v));
    }
    this.setState(() => ({ suggestions, text: value }));
  }
  
  suggestionsSelected(value) {
    this.setState(() => ({
      text: value,
      suggestions: [],
    }))
  }

  renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      // return null;
    }
    return (
      <p>
        {suggestions.map((item) => (
          <p onClick={() => this.suggestionsSelected(item)}>{item}</p>
        ))}
      </p>
    );
  }

  render() {
    const { text } = this.state;
    return (
      <div className="wrap">
        <div className="search">
          <input
            onChange={this.onTextChanged}
            type="text"
            value={text}
            id="search-input"
            placeholder="search"
            className="searchTerm"
          />
          <button  class="searchButton">
            <img src={icon}></img>
          </button>

          {this.renderSuggestions()}
        </div>
      </div>
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
}
export default Search;

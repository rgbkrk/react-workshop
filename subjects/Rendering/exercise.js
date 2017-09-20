////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - render DATA.title in an <h1>
// - render a <ul> with each of DATA.items as an <li>
// - now only render an <li> for mexican food (hint: use DATA.items.filter(...))
// - sort the items in alphabetical order by name (hint: use sort-by https://github.com/staygrimm/sort-by#example)
//
// Got extra time?
// - add a select dropdown to make filtering on `type` dynamic
// - add a button to toggle the sort order
// - Hint: you'll need an `updateThePage` function that calls `render`,
//   and then you'll need to call it in the event handlers of the form controls
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import sortBy from "sort-by";

const DATA = {
  title: "Menu",
  items: [
    { id: 1, name: "tacos", type: "mexican" },
    { id: 2, name: "burrito", type: "mexican" },
    { id: 3, name: "tostada", type: "mexican" },
    { id: 4, name: "mushy peas", type: "english" },
    { id: 5, name: "fish and chips", type: "english" },
    { id: 6, name: "black pudding", type: "english" }
  ]
};

const foodTypes = Array.from(new Set(DATA.items.map(item => item.type))).concat(
  "all"
);

const FoodSelect = props => {
  const handleChange = event => {
    props.onChange(event.target.value);
  };

  return (
    <select value={props.value} onChange={handleChange}>
      {foodTypes.map(type => (
        <option value={type} key={type}>
          {type}
        </option>
      ))}
    </select>
  );
};

export class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { filter: "mexican", reverseSort: false };
  }

  render() {
    return (
      <div>
        <h1>{DATA.title}</h1>
        <FoodSelect
          value={this.state.filter}
          onChange={value => this.setState({ filter: value })}
        />
        <button
          onClick={() =>
            this.setState({ reverseSort: !this.state.reverseSort })}
        >
          Toggle Sort Order
        </button>
        <ul>
          {DATA.items
            .sort(sortBy((this.state.reverseSort ? "-" : "") + "name"))
            .filter(
              item =>
                this.state.filter === "all" || item.type === this.state.filter
            )
            .map(item => <li key={item.id}>{item.name}</li>)}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<Menu />, document.getElementById("app"), () => {
  require("./tests").run();
});

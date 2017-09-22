////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make `withMouse` a "higher-order component" that sends the mouse position
// to the component as props.
//
// Hint: use `event.clientX` and `event.clientY`
//
// Got extra time?
//
// Make a `withCat` HOC that shows a cat chasing the mouse around the screen!
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import * as styles from "./styles";

const Cat = props => (
  <div
    style={Object.assign({ left: props.x - 30, top: props.y - 70 }, styles.cat)}
  />
);

const withMouse = Component => {
  return class extends React.Component {
    state = {
      mouse: {
        x: 0,
        y: 0
      }
    };

    render() {
      return (
        <div
          onMouseMove={event =>
            this.setState({ mouse: { x: event.clientX, y: event.clientY } })}
        >
          <Component {...this.props} mouse={this.state.mouse} />
        </div>
      );
    }
  };
};

const withCat = Component => {
  return class extends React.Component {
    render() {
      const cat = Object.assign({}, this.props.mouse);

      // cat.x = cat.x + Math.random() + 10;
      // cat.y = cat.y + Math.random() + 10;

      return (
        <div>
          <Cat {...cat} />
          <Component {...this.props} cat={cat} />
        </div>
      );
    }
  };
};

class App extends React.Component {
  static propTypes = {
    mouse: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }).isRequired,
    cat: PropTypes.any
  };

  render() {
    const { mouse, cat } = this.props;

    return (
      <div style={styles.container}>
        {mouse ? (
          <h1>
            The mouse position is ({mouse.x}, {mouse.y})
          </h1>
        ) : (
          <h1>We don't know the mouse position yet :(</h1>
        )}
        <Cat x={cat.x} y={cat.y} />
      </div>
    );
  }
}

const AppWithMouse = withMouse(withCat(App));

ReactDOM.render(<AppWithMouse />, document.getElementById("app"));

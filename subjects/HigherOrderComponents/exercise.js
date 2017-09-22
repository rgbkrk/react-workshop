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

class Mouse extends React.Component {
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
        {this.props.render(this.state.mouse)}
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Mouse
          render={mouse => (
            <div style={styles.container}>
              {mouse ? (
                <h1>
                  The mouse position is ({mouse.x}, {mouse.y})
                </h1>
              ) : (
                <h1>We don't know the mouse position yet :(</h1>
              )}
            </div>
          )}
        />
      </div>
    );
  }
}

ReactDOM.render(<App mouse={{ x: 1, y: 3 }} />, document.getElementById("app"));

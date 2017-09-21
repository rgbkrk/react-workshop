import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

class Calculator extends React.Component {
  state = {
    display: "0",
    stack: []
  };

  pressNumber = number => () => {
    let display = this.state.display;
    if (this.state.display === "0") {
      display = "";
    }

    this.setState({ display: display + number });
  };

  plus = () => {
    this.setState({
      stack: this.state.stack.concat(this.state.display)
    });
  };

  clear = () => {
    this.setState({
      display: "0"
    });
  };

  render() {
    return (
      <div className="calculator">
        <div className="calculator-display">{this.state.display}</div>
        <div className="calculator-keypad">
          <div className="input-keys">
            <div className="function-keys">
              <button className="calculator-key key-clear" onClick={this.clear}>
                AC
              </button>
              <button className="calculator-key key-sign">±</button>
              <button className="calculator-key key-percent">%</button>
            </div>
            <div className="digit-keys">
              <button
                className="calculator-key key-0"
                onClick={this.pressNumber(0)}
              >
                0
              </button>
              <button className="calculator-key key-dot">●</button>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(number => (
                <button
                  className={`calculator-key key-${number}`}
                  onClick={this.pressNumber(number)}
                  key={number}
                >
                  {number}
                </button>
              ))}
            </div>
          </div>
          <div className="operator-keys">
            <button className="calculator-key key-divide">÷</button>
            <button className="calculator-key key-multiply">×</button>
            <button className="calculator-key key-subtract">−</button>
            <button className="calculator-key key-add" onClick={this.plus}>
              +
            </button>
            <button className="calculator-key key-equals">=</button>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <div id="wrapper">
    <Calculator />
  </div>,
  document.getElementById("app")
);

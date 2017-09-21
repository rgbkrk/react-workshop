import React from "react";
import ReactDOM from "react-dom";
import serializeForm from "form-serialize";

class Forms extends React.Component {
  state = {
    firstName: "Michael",
    lastName: "Jackson"
  };

  handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    console.log(serializeForm(form, { hash: true }));
  };

  render() {
    return (
      <div>
        <h1>Forms</h1>

        <button onClick={() => this.setState({ firstName: "Taylor" })}>
          Set the first name to "Taylor"
        </button>

        <p>
          The name is: {this.state.firstName} {this.state.lastName}
        </p>
        <form onSubmit={this.handleSubmit}>
          <input
            name="firstName"
            value={this.state.firstName}
            type="text"
            onChange={ev => this.setState({ firstName: ev.target.value })}
          />
          <input
            name="lastName"
            type="text"
            value={this.state.lastName}
            onChange={ev => this.setState({ lastName: ev.target.value })}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

ReactDOM.render(<Forms />, document.getElementById("app"));

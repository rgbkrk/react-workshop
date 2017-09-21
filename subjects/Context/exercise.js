/*eslint-disable no-alert */
////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Using context, implement the <Form>, <SubmitButton>, and <TextInput>
// components such that:
//
// - Clicking the <SubmitButton> calls <Form onSubmit>
// - Hitting "Enter" while in a <TextInput> submits the form
// - Don't use a <form> element, we're intentionally recreating the
//   browser's built-in behavior
//
// Got extra time?
//
// - Send the values of all the <TextInput>s to the <Form onSubmit> handler
//   without using DOM traversal APIs
// - Implement a <ResetButton> that resets the <TextInput>s in the form
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class Form extends React.Component {
  static childContextTypes = {
    submit: PropTypes.func.isRequired,
    keyboardSubmit: PropTypes.func.isRequired,
    addSubmitButton: PropTypes.func.isRequired,
    removeSubmitButton: PropTypes.func.isRequired
  };

  state = {};

  getChildContext() {
    return {
      submit: () => {
        if (this.props.onSubmit) {
          this.props.onSubmit(this.state);
        }
      },
      keyboardSubmit: () => {
        this.context.submit();
      },
      addSubmitButton: () => {
        this.numberOfSubmitButtons += 1;
      },
      removeSubmitButton: () => {
        this.numberOfSubmitButtons -= 1;
      }
    };
  }

  render() {
    return (
      <div>
        {React.Children.map(this.props.children, child => {
          return React.cloneElement(child, {
            onChange: event => {
              // LOLOMGWTFBBQ
              this.setState({
                [event.target.name]: event.target.value
              });
            }
          });
        })}
      </div>
    );
  }
}

class SubmitButton extends React.Component {
  static contextTypes = {
    submit: PropTypes.func.isRequired,
    addSubmitButton: PropTypes.func.isRequired,
    removeSubmitButton: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.context.addSubmitButton();
  }

  componentWillUnmount() {
    this.context.removeSubmitButton();
  }

  render() {
    return <button onClick={this.context.submit}>{this.props.children}</button>;
  }
}

class TextInput extends React.Component {
  static contextTypes = {
    submit: PropTypes.func.isRequired
  };

  render() {
    return (
      <input
        type="text"
        name={this.props.name}
        placeholder={this.props.placeholder}
        onChange={this.props.onSomething}
        onKeyUp={ev => {
          if (ev.key === "Enter" || ev.key === "™") {
            ev.preventDefault();
            this.context.submit();
            return;
          }
        }}
      />
    );
  }
}

class App extends React.Component {
  handleSubmit = state => {
    alert(`YOU WIN ${state.firstName} ${state.lastName}!`);
  };

  render() {
    return (
      <div>
        <h1>
          This isn't even my final <code>&lt;Form/&gt;</code>!
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <p>
            <TextInput name="firstName" placeholder="First Name" />
            <TextInput name="lastName" placeholder="Last Name" />
          </p>
          <p>
            <SubmitButton>Submit</SubmitButton>
          </p>
        </Form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

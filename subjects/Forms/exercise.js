////////////////////////////////////////////////////////////////////////////////
// Exercise
//
// - When the checkbox is checked:
//   - Fill in the shipping fields with the values from billing
//   - Disable the shipping fields so they are not directly editable
//   - Keep the shipping fields up to date as billing fields change
//   - Hint: you can get the checkbox value from `event.target.checked`
// - When the form submits, console.log the values
//
// Got extra time?
//
// - If there are more than two characters in the "state" field, let the user
//   know they should use the two-character abbreviation
// - If the user types something into shipping, then checks the checkbox, then
//   unchecks the checkbox, ensure the field has the information from
//   before clicking the checkbox the first time
import React from "react";
import ReactDOM from "react-dom";
import serializeForm from "form-serialize";

class CheckoutForm extends React.Component {
  state = {
    shippingSameAsBilling: false,
    billingName: "",
    billingState: "",
    shippingName: "",
    shippingState: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    const values = this.state;
  };

  render() {
    console.log(this.state);

    const billingNameInput = (
      <input
        type="text"
        defaultValue={this.state.billingName}
        onChange={ev => this.setState({ billingName: ev.target.value })}
        name="billingName"
      />
    );

    const billingStateInput = (
      <input
        type="text"
        size="2"
        defaultValue={this.state.billingState}
        onChange={ev => this.setState({ billingState: ev.target.value })}
        name="billingState"
      />
    );

    const shippingNameInput = (
      <input
        type="text"
        value={
          this.state.shippingSameAsBilling
            ? this.state.billingName
            : this.state.shippingName
        }
        readOnly={this.state.shippingSameAsBilling}
        onChange={ev => this.setState({ shippingName: ev.target.value })}
        name="shippingName"
      />
    );

    const shippingStateInput = (
      <input
        type="text"
        size="2"
        value={
          this.state.shippingSameAsBilling
            ? this.state.billingState
            : this.state.shippingState
        }
        readOnly={this.state.shippingSameAsBilling}
        onChange={ev => this.setState({ shippingState: ev.target.value })}
        name="shippingState"
      />
    );

    return (
      <div>
        <h1>Checkout</h1>
        <form>
          <fieldset>
            <legend>Billing Address</legend>
            <p>
              <label>
                Billing Name:
                {billingNameInput}
              </label>
            </p>
            <p>
              <label>
                Billing State:
                {billingStateInput}
              </label>
            </p>
          </fieldset>

          <br />

          <fieldset>
            <label>
              <input
                type="checkbox"
                onChange={() =>
                  this.setState({
                    shippingSameAsBilling: !this.state.shippingSameAsBilling
                  })}
              />
              Same as billing
            </label>
            <legend>Shipping Address</legend>
            <p>
              <label>
                Shipping Name:
                {shippingNameInput}
              </label>
            </p>
            <p>
              <label>Shipping State: {shippingStateInput}</label>
            </p>
          </fieldset>

          <p>
            <button>Submit</button>
          </p>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<CheckoutForm />, document.getElementById("app"));

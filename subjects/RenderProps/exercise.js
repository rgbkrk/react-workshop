////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Refactor App by creating a new component named `<GeoPosition>`
// - <GeoPosition> should use a child render callback that passes
//   to <App> the latitude and longitude state
// - When you're done, <App> should no longer have anything but
//   a render method
//
// Got extra time?
//
// - Now create a <GeoAddress> component that also uses a render
//   callback with the current address. You will use
//   `getAddressFromCoords(latitude, longitude)` to get the
//   address, it returns a promise.
// - You should be able to compose <GeoPosition> and <GeoAddress>
//   beneath it to naturally compose both the UI and the state
//   needed to render it
// - Make sure <GeoAddress> supports the user moving positions
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import LoadingDots from "./utils/LoadingDots";
import getAddressFromCoords from "./utils/getAddressFromCoords";

// class GeoAddress extends React.Component {
//   state = {
//     address: null,
//     error: null
//   };
//
//   fetchAddress = () => {
//     if (this.props.latitude && this.props.longitude) {
//       getAddressFromCoords(this.props.latitude, this.props.longitude)
//         .then(address => {
//           this.setState({ address });
//         })
//         .catch(error => {
//           this.setState({ error });
//         });
//     }
//   };
//
//   shouldComponentUpdate(nextProps) {
//     return (
//       this.props.latitude !== nextProps.latitude &&
//       this.props.longitude !== nextProps.longitude
//     );
//   }
//
//   componentDidMount() {
//     this.fetchAddress();
//   }
//
//   componentDidUpdate() {
//     this.fetchAddress();
//   }
//
//   componentWillUnmount() {
//     this.setState({ address: null, error: null });
//   }
//
//   render() {
//     return <div>The address is {this.state.address || <LoadingDots />}</div>;
//   }
// }
//
//
class GeoPosition extends React.Component {
  state = {
    coords: {
      latitude: null,
      longitude: null
    },
    error: null
  };

  componentDidMount() {
    this.geoId = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });
      },
      error => {
        this.setState({ error });
      }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.geoId);
  }

  render() {
    return this.props.children(this.state);
  }
}

class App extends React.Component {
  render() {
    return (
      <GeoPosition>
        {geo => (
          <div>
            <h1>Geolocation</h1>
            {geo.error ? (
              <div>Error: {geo.error.message}</div>
            ) : (
              <dl>
                <dt>Latitude</dt>
                <dd>{geo.coords.latitude || <LoadingDots />}</dd>
                <dt>Longitude</dt>
                <dd>{geo.coords.longitude || <LoadingDots />}</dd>
              </dl>
            )}
            {/* <GeoAddress latitude={geo.latitude} longitude={geo.longitude} /> */}
          </div>
        )}
      </GeoPosition>
    );
  }
}

// ReactDOM.render(<App />, document.getElementById("app"));

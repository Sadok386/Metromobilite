import React from 'react';
import { geolocated, geoPropTypes } from 'react-geolocated';

const getDirection = (degrees, isLongitude) =>
  degrees > 0
    ? (isLongitude ? 'E' : 'N')
    : (isLongitude ? 'W' : 'S');

// addapted from http://stackoverflow.com/a/5786281/2546338

class Location extends React.Component {
  render() {
    const { props } = this;


    return !props.isGeolocationAvailable
      ? <div>Your browser does not support Geolocation.</div>
      : !props.isGeolocationEnabled
        ? <div>Geolocation is not enabled.</div>
        : props.coords
          ? <div>
            You are at <span className="coordinateLat">{props.coords.latitude}</span>, <span className="coordinateLong">{props.coords.longitude}</span>
            {
              props.coords.altitude
                ? <span>, approximately {props.coords.altitude} meters above sea level</span>
                : null
            }.
          </div>
          : <div>Getting the location data&hellip;</div>;
          console.log(props.coords.latitude);
  }
}

Location.propTypes = { ...Location.propTypes, ...geoPropTypes };

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Location);
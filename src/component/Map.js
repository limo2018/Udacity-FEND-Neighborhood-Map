/* global google */

import React, {Component} from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from "react-google-maps"

//Create map component
const MapComponent = withScriptjs(withGoogleMap(props => (<GoogleMap defaultZoom={8} zoom={props.zoom} defaultCenter={{
    lat: -46.397,
    lng: 150.644
  }} center={props.center}>
  {
    props.markers && props.markers.filter(marker => marker.isVisible).map((marker, idx, arr) => {
      const venueInfo = props.venues.find(venue => venue.id === marker.id);
      return (
        <Marker key={idx}
          position={{
          lat: marker.lat,
          lng: marker.lng
        }}
        onClick={() => props.handleClickMarker(marker)}
        //Add map marker animation to bounce and drop
        animation={arr.length === 1 ? google.maps.Animation.BOUNCE : google.maps.Animation.DROP}
        >
        {
          marker.isOpen && venueInfo.bestPhoto && (<InfoWindow>
            <React.Fragment>
              <img src={`${venueInfo.bestPhoto.prefix}200x200${venueInfo.bestPhoto.suffix}`} alt={"Venue"}/>
              <p>{venueInfo.name}</p>
            </React.Fragment>
          </InfoWindow>)
        }
      </Marker>);
    })
  }
</GoogleMap>)));

class Map extends Component {
  componentDidMount () {
	    window.gm_authFailure = () => {
	        alert('Error: Failed to get Google map.')
	        console.log('Error: Failed to get Google map.')
	    }
	}
  render() {
    return (<MapComponent role="application" aria-label="map" {...this.props}
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAtcMvyjH1F9axb8MZEERHEw6WA1Si_JBw" loadingElement={<div style = {{ height: `100%` }}/>} containerElement={<div style = {{ height: `98%`, width: `75%` }}/>} mapElement={<div style = {{ height: `100%` }}/>}/>);
  }
}

export default Map;

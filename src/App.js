import React, {Component} from 'react';
import './App.css';
import Map from './component/Map';
import SideBar from './component/SideBar';
import FourSquareAPI from './API/';
import Footer from './component/footer'

class App extends Component {
  constructor() { //Map marker
    super();
    ////Data stored in this.state will be passed to the Map comp
    this.state = {
   //Collecting data venue markers on the map
      venues: [],
      markers: [],
      zoom: 13,
      updateSuperState: obj => {
        this.setState(obj);
      }
    };
  }


  closeAllMapMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({
      markers: Object.assign(this.state.markers, markers)
    }); //Once one marker is clicked, the rest of markers will be closed via handleClickMarker
  };

  handleClickMarker = (marker) => {
    this.closeAllMapMarkers();
    //console.log(marker);
    marker.isOpen = true;
    this.setState({
      markers: Object.assign(this.state.markers, marker)
      //Copy marker via Object.assign. then pass down the clicked marker to the Map
    });

    const venue = this.state.venues.find(venue => venue.id === marker.id);


    FourSquareAPI.getVenueDetails(marker.id).then(res => {
      const newVenueItem = Object.assign(venue, res.response.venue);
      this.setState({
        venues: Object.assign(this.state.venues, newVenueItem)
      });
      console.log(newVenueItem);
    });
  };

  handleClickListItem = (venue) => {
    //Verify the mareker id is equal the venue id and show InfoWindow
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.handleClickMarker(marker);
  };

  componentDidMount() {
  //Fetch the FourSquare API data
    FourSquareAPI.search({
      near: "Charlottesville, VA", query: "Asian Food", limit: 10
    }).then(results => {
      const {venues} = results.response;
      const {center} = results.response.geocode.feature.geometry;
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen: false,
          isVisible: true,
          id: venue.id //Link a marker with a venue
        };
      });
      this.setState({venues, center, markers});
      console.log(results);
    });
  }
  render() {
    return (<div className="App" role="application" tabIndex="1">
      <SideBar {...this.state} handleClickListItem ={this.handleClickListItem}/>
      <Map {...this.state} handleClickMarker={this.handleClickMarker}/>
      <Footer />
    </div>);
  }
}

export default App;

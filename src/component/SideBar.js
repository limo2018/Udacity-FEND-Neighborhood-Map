import React, {Component} from 'react';
import ListVenue from './ListVenue';

 class SideBar extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      venues: [],
      filterEntry: ""
    };
  }
//In Venues' search filter
  handleVenuesSearch = () => {
    if (this.state.query.trim()!== ""){
      const venues = this.props.venues.filter(venue => venue.name.toLowerCase().includes(this.state.query.toLowerCase())
    );
    return venues;
    }
    return this.props.venues;
  };

  //Update markers based on users search results
  handleSearchUpdate = event => {
    const userInput = event.target.value

    this.setState({ filterEntry: userInput});
    const markers =  this.props.venues.map(venue => {
      const isMatched = venue.name.toLowerCase().includes(userInput.toLowerCase());
      const marker = this.props.markers.find(marker => marker.id === venue.id);
      if (isMatched){
        marker.isVisible = true; // Show markers match the search
      }else {
        marker.isVisible = false; // Hide all markers don't match the search
      }
      return marker;
    });
    this.props.updateSuperState({markers})
  };
  render() {
    return (
      <div className="sideBar" aria-label="Side Bar">
         <header className="AppHeader" aria-label="Sidebar Header"></header>
      <input className="Search" aria-label="Search box"
        type={"search"} id={"search"} placeholder={"Search here"} onChange={this.handleSearchUpdate } />
      <ListVenue {...this.props} venues={this.handleVenuesSearch()} handleClickListItem={this.props.handleClickListItem}/>
    </div>);
  }
}

export default SideBar;

import React, { Component } from 'react';
import ListItem from './ListItem';

// When the list item is clicked, map over its data
class ListVenue extends Component {
  render() {
    return (
      <ol className="listVenue" aria-label="Venues List">
          {this.props.venues &&
            this.props.venues.map((venue, idx) => (
              <ListItem key={idx} {...venue} handleClickListItem={this.props.handleClickListItem}/> ))}
      </ol>
    );
  }
}


export default ListVenue;

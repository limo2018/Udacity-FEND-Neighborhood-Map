import React, { Component } from 'react';

class ListItem extends Component {
  render() {
    //For each venue, the FourSquare icon and venue name are included
    return (
      <li
        className="listItem" role="link" tabIndex="6"
        onClick={() => this.props.handleClickListItem(this.props)}>
        <img className="VenueIcon" aria-label="icon" tabIndex="7"
          src={this.props.categories[0].icon.prefix+"32"+this.props.categories[0].icon.suffix} alt={this.props.categories[0].name}/>
        {this.props.name}
        </li>
  );
 }
}


export default ListItem;

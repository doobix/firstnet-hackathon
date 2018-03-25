import React, { Component } from 'react';
import ArcGisMap from './ArcGisMap';

class MapView extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <ArcGisMap coords={this.props}/>
      </div>
    );
  }
}

export default MapView;

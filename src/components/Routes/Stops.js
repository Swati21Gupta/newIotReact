import React, {Component} from 'react';

export default class Stops extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    let stops = this.props.stopsData.stops.map((item, index) => {
        let sequenceNumber = item.sequence || 0
        let locationId = item.locationId || "-"
        let stopName = item.stopName || "-"
        let distance = item.travelDistance || 0
        let travelTime = item.travelTime || 0
        let arrivalTime = item.arrivalTime || 0
        let serviceTime = item.serviceTime || 0
        let departureTime = item.departureTime || 0
        let numberOfOrders = item.orders.length
        let selectedRow = {
          color: '#ffffff',
          fontWeight: 'bold'
        }
        selectedRow.background = this.props.stopsData.rowColor;
    return (
        <tr key={index} style={this.props.selecetedStopsRow===index ? selectedRow : {}}
          onClick={() => this.props.handleSelectedStop(index)}>
          <td width="5%">{sequenceNumber}</td>
          <td width="15%">{locationId}</td>
          <td width="15%">{stopName}</td>
          <td width="15%">{distance}</td>
          <td width="10%">{travelTime}</td>
          <td width="10%">{arrivalTime}</td>
          <td width="10%">{serviceTime}</td>
          <td width="10%">{departureTime}</td>
          <td width="10%">{numberOfOrders}</td>
        </tr>
      )}
    )
    let stopsTable = (
      <table className="table table-fixed">
        <thead>
          <tr>
            <th width="5%">#</th>
            <th width="15%">Location Id</th>
            <th width="15%">Location Name</th>
            <th width="15%">Distance</th>
            <th width="10%">Travel Time</th>
            <th width="10%">Arrival Time</th>
            <th width="10%">Service Time</th>
            <th width="10%">Departure Time</th>
            <th width="10%">Orders</th>
          </tr>
        </thead>
        <tbody className="routes-table">
          {stops}
        </tbody>
      </table>
    )
    return(
      <div className="tab-content">
        <div>
          {this.props.multipleRoutes ? <div className="no-item-selected">multiple routes selected</div> : stopsTable}
        </div>
      </div>
    )
  }
}

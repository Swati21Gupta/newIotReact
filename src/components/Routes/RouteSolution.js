import React, {Component} from 'react';

export default class RouteSolution extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  getCheckbox(isSelected) {
    return (
      isSelected ? <input type="checkbox" defaultChecked name="selectRoute" /> :
        <input type="checkbox" name="selectRoute" />
    )
  }
  render() {
    let lockedRoutes = [];
    let unlockedRoutes = [];
    let routes = this.props.routesData.map((item, index) => {
        let routeId = item.routeId || 0
        let distance = item.totalRouteDistance || 0
        let time = item.totalRouteTravelTime || 0
        let size1 = item.routeSize1 || 0
        let size2 = item.routeSize2 || 0
        let size3 = item.routeSize3 || 0
        let totalCost = item.totalRouteCost || 0
        let selectedRow = {
          color: '#ffffff',
          fontWeight: 'bold'
        }

        if (item.isLocked) {
          selectedRow.background = '#c3bfbf';
          selectedRow.cursor = 'not-allowed'
          lockedRoutes.push(
            <tr key={index} style={item.isLocked ? selectedRow : {}}>
              <td width="5%">
              </td>
              <td width="5%">
                <span className="fa fa-lock lock-icon" aria-hidden="true"></span>
              </td>
              <td width="10%">{routeId}</td>
              <td width="10%">{distance}</td>
              <td width="10%">{time}</td>
              <td width="10%">{item.vehicle.vehicleId}</td>
              <td width="10%">{item.workers.name}</td>
              <td width="10%">{size1}</td>
              <td width="10%">{size2}</td>
              <td width="10%">{size3}</td>
              <td width="10%">{totalCost}</td>
            </tr>
          )
        } else {
            selectedRow.background = item.rowColor;
            unlockedRoutes.push(
              <tr key={index} style={item.isSelected ? selectedRow : {}}
                onClick={()=>this.props.handleSelectedRoute(index, routeId)}>
                <td width="5%">
                  {/**}<input type="checkbox" checked={item.isSelected ? "checked" : ""} name="selectRoute" />**/}
                </td>
                <td width="5%">
                  {item.isLocked ?
                    <span className="fa fa-lock lock-icon" aria-hidden="true"></span> :
                    <span className="fa fa-unlock unlock-icon" aria-hidden="true"></span>}
                </td>
                <td width="10%">{routeId}</td>
                <td width="10%">{distance}</td>
                <td width="10%">{time}</td>
                <td width="10%">{item.vehicle.vehicleId}</td>
                <td width="10%">{item.workers.name}</td>
                <td width="10%">{size1}</td>
                <td width="10%">{size2}</td>
                <td width="10%">{size3}</td>
                <td width="10%">{totalCost}</td>
              </tr>
            )
          }
          return
        }
    )
    let routesTable = (
      <table className="table table-fixed">
        <thead>
          <tr>
            <th width="5%">
              {/**<input type="checkbox" name="selectAll" checked={this.props.isSelectAll ? "checked" : ""}
                onChange={()=>this.props.handleSelectedRoute(0, this.props.isSelectAll ? false : true)}/>*/}
            </th>
            <th width="5%">
              {this.props.isLockButton ?
                <button type="submit" value="Submit" className="click-button lock-button"
                  onClick={()=>this.props.handleLockButton()}>
                  Lock
                </button> : "" }
            </th>
            <th width="10%">Route Id</th>
            <th width="10%">Distance</th>
            <th width="10%">Total Time</th>
            <th width="10%">Vehicle Id</th>
            <th width="10%">Driver Name</th>
            <th width="10%">Total Size1</th>
            <th width="10%">Total Size2</th>
            <th width="10%">Total Size3</th>
            <th width="10%">Total Cost</th>
          </tr>
        </thead>
        <tbody className="routes-table">
          {this.props.lockUnlockText==='Locked' ? unlockedRoutes : lockedRoutes}
        </tbody>
      </table>
    )
    return(
      <div className="tab-content">
        <div>
          {routes.length ? routesTable : <div className="no-item-selected">No routes available</div>}
        </div>
      </div>
    )
  }
}

import React, {Component} from 'react';

export default class UOrders extends Component {
  constructor(props) {
    super(props);
      this.state = {
        unassignedOrderInfo : this.props.unassignedOrderInfo || []
    }

  }

  render() {
    var unassignedOrderInfo = [];
    if(this.props.unassignedOrderInfo){
      unassignedOrderInfo = this.props.unassignedOrderInfo
    }
    let unassignedOrders = unassignedOrderInfo.map((val,index) => {
      let orderDate  = val.orderDate =="" ? "No Data" : val.orderDate
      let serviceType = val.serviceType =="" ? "No Data" : val.serviceType
      let takenBy = val.takenBy =="" ? "No Data" : val.takenBy
      let plannedDeliveryDate = val.plannedDeliveryDate =="" ? "No Data" : val.plannedDeliveryDate
      let size1 = val.size1 =="" ? "No Data" : val.size1
      let size2 = val.size2 =="" ? "No Data" : val.size2
      let size3 = val.size3 =="" ? "No Data" : val.size3
      let jobPriority = val.jobPriority =="" ? "No Data" : val.jobPriority
      let cancelReason = val.cancelReason =="" ? "No Data" : val.cancelReason
      let cancelBy = val.cancelBy =="" ? "No Data" : val.cancelBy
      let cancelDate = val.cancelDate =="" ? "No Data" : val.cancelDate
      let reasonText = val.reasonText =="" ? "No Data" : val.reasonText
      return (
        <tr key={index} className={this.props.unassignedRow===index ? "selected-row-background" : ""}
          onClick={(e)=>this.props.handleUnassignedOrders(index, true)}>
          <td width="6.3%">{orderDate.split("T")[0]}</td>
          <td width="8.3%">{serviceType}</td>
          <td width="7.3%">{takenBy}</td>
          <td width="8.3%">{plannedDeliveryDate.split("T")[0]}</td>
          <td width="8.3%">{size1}</td>
          <td width="8.3%">{size2}</td>
          <td width="8.3%">{size3}</td>
          <td width="8.3%">{jobPriority}</td>
          <td width="8.3%">{cancelReason}</td>
          <td width="8.3%">{cancelBy}</td>
          <td width="8.3%">{cancelDate}</td>
          <td width="8.4%">{reasonText}</td>
        </tr>
      )}
    )
    let unOrdersTable = (
        <table className="table table-fixed">
          <thead>
            <tr>
              <th width="6.3%">Order Date</th>
              <th width="8.3%">Service Type</th>
              <th width="7.3%">Taken By</th>
              <th width="8.3%">Delivery Date</th>
              <th width="8.3%">SIZE1</th>
              <th width="8.3%">SIZE2</th>
              <th width="8.3%">SIZE3</th>
              <th width="8.3%">Priority</th>
              <th width="8.3%">Cancel Reason</th>
              <th width="8.3%">Cancel By</th>
              <th width="8.3%">Cancel Date</th>
              <th width="8.3%">Reason Text</th>
            </tr>
          </thead>
          <tbody className="routes-table">
            {unassignedOrders}
          </tbody>
        </table>
    )
  	return (
      <div className="tab-content">
        <div id="Orders">
          {unassignedOrders.length ? unOrdersTable : <div className="no-item-selected">No unassigned orders available</div>}
        </div>
      </div>
    )
  }
}

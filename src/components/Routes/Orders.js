import React, {Component} from 'react';

export default class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    console.log("in orders component =======")
    let orders = this.props.ordersData.map((item, index) => {
        let orderId = item.orderId || "-"
        let size1 = item.SIZE1 || 0
        let size2 = item.SIZE2 || 0
        let size3 = item.SIZE3 || 0
        let selectedRow = {
          color: '#ffffff',
          fontWeight: 'bold'
        }
        selectedRow.background = this.props.selectedOrderColor;

    return (
            <tr key={index} style={this.props.selectedOrdersRow===index ? selectedRow : {}}
              onClick={() => this.props.handleSelectedOrder(index)}>
              <td width="5%">{index}</td>
              <td width="18%">{orderId}</td>
              <td width="15%">{size1}</td>
              <td width="15%">{size2}</td>
              <td width="15%">{size3}</td>
            </tr>
          )}
        )
    return(
      <div className="tab-content">
        <div>
          <table className="table table-fixed">
            <thead>
              <tr>
                <th width="5%">#</th>
                <th width="18%">Order Id</th>
                <th width="15%">Total Size1</th>
                <th width="15%">Total Size2</th>
                <th width="15%">Total Size3</th>
              </tr>
            </thead>
            <tbody className="routes-table">
              {orders}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

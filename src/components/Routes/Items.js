import React, {Component} from 'react';

export default class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    let items = this.props.itemsData.map((item, index) => {
        let itemId = item.ItemId || "-"
        let size1 = item.size1 || 0
        let size2 = item.size2 || 0
        let size3 = item.size3 || 0

    return (
            <tr key={index}>
              {/*<td width="3%" onClick={()=>{this.props.getItems(val)}}>
                <input type="radio" name="orderId" value={val.orderId}/>
              </td>*/}
              <td width="5%">{index}</td>
              <td width="17%">{itemId}</td>
              <td width="30%">{}</td>
              <td width="16%">{size1}</td>
              <td width="16%">{size2}</td>
              <td width="16%">{size3}</td>
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
                <th width="17%">Item Id</th>
                <th width="30%">Item Description</th>
                <th width="16%">Size1</th>
                <th width="16%">Size2</th>
                <th width="16%">Size3</th>
              </tr>
            </thead>
            <tbody className="routes-table">
              {items}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

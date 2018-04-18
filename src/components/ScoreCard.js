import React, {Component} from 'react';

export default class ScoreCard extends Component {
  constructor(props) {
    super(props);
      this.state = {
        isShowRoutes: false,
        isShowOrders: true
      }

  }
  componentDidMount() {
    this.props.getOrdersData(false, this.state.isShowOrders)
  }
  componentWillReceiveProps(nextProps) {

  }
  handleChangeAlgo(e) {
    this.props.changeAlgo(e.target.value)
  }
  render() {
    let scoreData = this.props.data.scoreCardInfo || []
    let props = this.props
    let isDisabled = this.props.isMagicWand ? "" : "disabeled"
	return(
        <div className="right_panel">
          <div className="row top_head">
          <div>
          <select className={props.isMagicWand ? "" : "click-not-allowed"}
            disabled={isDisabled}
            value={props.algoName}
            onChange={(e) => this.handleChangeAlgo(e)}>
          {
            Array.isArray(props.algoInfo) 
          ?
            props.algoInfo.map((algo,index)=>{
            return(<option key={index} value={algo.algoName}>
                {algo.algoName}
              </option>)
            })
          :
          <option value={props.algoInfo.algoName}>{props.algoInfo.algoName}</option>
          }
          </select>
          </div>
          </div>
          <div className="orders">
            <div className="card-title cursor-pointer" onClick={this.props.toggleOrdersGraph}>Orders</div>
            <div className="row">
              <div className="col-md-3">
                {/**<h1>{scoreData.totalCountOrders}</h1>**/}
                <h1>{scoreData.totalCountOrders}</h1>
                <img src={require("./../images/order.png")} alt="order"/> Orders
              </div>
              <div className="col-md-3 hover" onClick={()=>{this.setState({isShowRoutes: true},()=>{
                this.props.getOrdersData(this.state.isShowRoutes, false)
              })}}><br />
                <span className="numbers">{scoreData.assignedOrders}</span><br />
                <span>Assigned</span>
              </div>
              <div className="col-md-3 hover" onClick={()=>{this.setState({isShowOrders: true},()=>{
                this.props.getOrdersData(false, this.state.isShowOrders)
              })}}><br />
                {/**<span className="numbers">{scoreData.unassignedOrders}</span><br />*/}
                <span className="numbers">{scoreData.unassignedOrders}</span><br />
                <span>Unassigned</span>
              </div>
            </div>
          </div>
          <div className="orders package">
            <div className="card-title">Package</div>
            <div className="row">
              <div className="col-md-3">
                <h1>{scoreData.totalWeight?parseFloat(scoreData.totalWeight).toFixed(0):''}</h1><span></span>
                <img src={require("./../images/package.png")} alt="package"/> Size
              </div>
              <div className="col-md-3"><br />
                <div className="numbers">
                  <span className="font-size20">{scoreData.totalSize1 ? scoreData.totalSize1.toFixed(0) : scoreData.totalSize1}</span>
                  <span> Kgs</span>
                </div><br />
                <span>Assigned - {scoreData.assignedSize1 ? scoreData.assignedSize1.toFixed(0) : scoreData.assignedSize1}</span><br />
                <span>Unassigned - {scoreData.unassignedSize1 ? scoreData.unassignedSize1.toFixed(0) : scoreData.unassignedSize1}</span>
              </div>
              <div className="col-md-3"><br />
                <div className="numbers">
                  <span className="font-size20">{scoreData.totalSize2 ? scoreData.totalSize2.toFixed(0) :scoreData.totalSize2}</span>
                  <span> Cases</span>
                </div><br />
                <span>Assigned - {scoreData.assignedSize2 ? scoreData.assignedSize2.toFixed(0) : scoreData.assignedSize2}</span><br />
                <span>Unassigned - {scoreData.unassignedSize2 ? scoreData.unassignedSize2.toFixed(0): scoreData.unassignedSize2}</span>
              </div>
              <div className="col-md-3"><br />
                <div className="numbers">
                  <span className="font-size20">{scoreData.totalSize3 ? scoreData.totalSize3.toFixed(0) : scoreData.totalSize3}</span>
                  <span> EF Cases</span>
                </div><br />
                <span>Assigned - {scoreData.assignedSize3 ? scoreData.assignedSize3.toFixed(0) : scoreData.assignedSize3}</span><br />
                <span>Unassigned - {scoreData.unassignedSize3 ? scoreData.unassignedSize3.toFixed(0) : scoreData.unassignedSize3}</span>
              </div>
            </div>
          </div>
          <div className="orders duration">
            <div className="card-title">Duration</div>
            <div className="row">
              <div className="col-md-3">
                <h1>{scoreData.duration}</h1>
                <img src={require("./../images/duration.png")} alt="duartion" /> Duration (Hrs)
              </div>
              <div className="col-md-2"><br />
                <span className="numbers">{scoreData.travelTime}</span><br />
                <span>Travel</span>
              </div>
              <div className="col-md-2"><br />
                <span className="numbers">{scoreData.breakTime}</span><br />
                <span>Break</span>
              </div>
              <div className="col-md-2"><br />
                <span className="numbers">{scoreData.serviceTime}</span><br />
                <span>Services</span>
              </div>
              <div className="col-md-2"><br />
                <span className="numbers">{scoreData.waitTime}</span><br />
                <span>Wait</span>
              </div>
            </div>
          </div>
          <div className="orders routes nopadding">
            <table style={{width:"100%", border:0, cellSpacing:10, cellPadding:10}}>
              <tbody>
                <tr>
                  <td rowSpan={2}><h1>{scoreData.routes}</h1>
                  <img src={require("./../images/routes.png")} alt="routes"/> Routes</td>
                  <td><span className="numbers">{scoreData.stops}</span><br /><span>Stops</span></td>
                  <td><span className="numbers">{scoreData.locations}</span><br /><span>Locations</span></td>
                </tr>
                <tr>
                  <td><span className="numbers">{scoreData.distance}</span><br /><span>Distance</span></td>
                  <td><span className="numbers">{scoreData.cost}</span><br /><span>Cost (AED)</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
    )
  }
}

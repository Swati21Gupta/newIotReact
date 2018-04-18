import React, {Component} from 'react';
import PieChart from './PieChart';

const boxColor = ['#5059ab','#01cc9b']

export default class AssignUnassign extends Component {
  constructor() {
    super()
    this.state = {
      expandedSector: null
    }
    this.handleMouseEnterOnSector = this.handleMouseEnterOnSector.bind(this)
  }
  handleMouseEnterOnSector(sector) {
    this.setState({expandedSector: sector});
  }

  render() {

    const {expandedSector} = this.state
    var boxStyle = {}
    var labelName = this.props.ordersData.map((element, index) => {
      boxStyle = {
        background: boxColor[index]
      }
      return (
        <div key={index}>
          <span className="label-box" style={boxStyle}></span>
          <span className={this.state.expandedSector===index ? "highlight" : ""}>
              {element.text.toUpperCase()} - {element.value}
          </span>
        </div>
      )
    })
    return (
      <div>
        <div>
          <span className="back-button glyphicon glyphicon-transfer" onClick={this.props.toggleOrdersGraph}>
          </span>
        </div>
        <div className="graph-heading">
          <span className="assign-heading">Assigned vs Unassigned</span>
        </div>
        <div className="assign-block">
          <div className="assign-graph">
            <PieChart
              data={this.props.ordersData}
              palette={boxColor}
              onSectorHover={this.handleMouseEnterOnSector}
              expandedSector={expandedSector}
              expandOnHover={true}
              shrinkOnTouchEnd={true}
            />
          </div>
          <div className="graph-label">
            {labelName}
          </div>
        </div>
      </div>
    )
  }
}

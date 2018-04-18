import React, {Component} from 'react';
import DonutChart from 'react-donut-chart';

const data = [{
      label: 'HIGH',
      value: 2
    },
    {
      label: 'MEDIUM',
      value: 2
    },
    {
      label: 'LOW',
      value: 5
    }
]
const boxColor= ['#f55652', '#fec012', '#53c4ce']

export default class Priority extends Component {
  constructor() {
    super()
    this.state = {

    }
  }
  handlePriorityGraph(item, selected) {
    console.log("item selected", item, selected)
  }

  render() {
    var boxStyle = {}
    var labelName = data.map((element, index) => {
      boxStyle = {
        background: boxColor[index]
      }
      return (
        <div key={index}>
          <span className="label-box" style={boxStyle}></span>
          <span className="">
              {element.label.toUpperCase()} - {element.value}
          </span>
        </div>
      )
    })
    return(
      <div className="priority-row">
        <div className="graph-heading">
          <span className="priority-heading">Priority</span>
        </div>
        <div className="assign-block">
          <div className="">
            <DonutChart
              data={data}
              className="priority-graph"
              colors={boxColor}
              strokeColor={'#ffffff'}
              width={150}
              height={150}
              innerRadius={0.5}
              outerRadius={0.8}
              legend={false}
              onMouseEnter={(item) => item}
              onClick={(item, selected) => (selected ? item : null)}
              formatValues={(values, total) => (values)}
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

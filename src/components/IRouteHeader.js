import React, {Component} from 'react';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import {getISODate} from './Utils';

Moment.locale('en')
momentLocalizer()


export default class IRouteHeader extends Component {

  componentDidMount() {
  
  }
  handleDatePicker = (date)=> {
    console.log("date picked",date)
    this.props.setDatePicker(date);
  }

  render() {
   
    return(
      <header className="main-header">
        <a href="index2.html" className="logo">
        <span className="logo-mini"><img src="/images/logo-small.png" /></span>
        <span className="logo-lg"><img src="/images/logo.png" /></span> </a>
        <nav className="navbar navbar-static-top">
          <a id="side-bar-toggle" className="sidebar-toggle" data-toggle="push-menu" role="button"> <span className="sr-only">Toggle navigation</span> </a>
          <div className="navbar-custom-menu">
            { this.props.isRoutePage?<ul className="nav navbar-nav">
              <li className="magic-wand" onClick={(e)=>this.props.handleMagicWand()}>
                <i className="fa fa-magic"></i>
              </li>
              
              <li style={{marginRight:"40px"}} className="dropdown messages-menu date-picker">
                <DateTimePicker
                  defaultValue={new Date()}
                  value={this.props.DateValue}
                  onChange={this.handleDatePicker}
                  format={"MMMM DD, YYYY"}
                  time={false}
                />
              </li>
              {/*<li className="magic-wand" onClick={(e)=>this.props.socreCradData()}>
                                           <button className="btn btn-success"> Go</button>
                                          </li>*/}
             
            </ul>:''}
          </div>
        </nav>
      </header>
    )
  }
}

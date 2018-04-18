import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Dashboard from './Dashboard';
import Asset from './Asset';
import AssetType from './AssetType';
import Device from './Device';
import Orders from './Orders';
import Locations from './Locations';
import IRouteLandingPage from './../IRouteLandingPage';


export default class IRouteMasterPage extends Component {

  IRouteLanding = ()=> {
       return (
         <IRouteLandingPage
            isMagicWand={this.props.isMagicWand}
            ordersPickDate={this.props.ordersPickDate}
            scoreData={this.props.scoreData}

       />)
   }
   componentDidMount(){
    this.props.setHeaderIcon();
   }
  render() {
  var style = {"backgroundColor":'#06121d'};
    return (
      <Router>
        <div>
          <aside className="main-sidebar">
            <section className="sidebar">
              <ul className="sidebar-menu" data-widget="tree">
                <li id="user-profile" className="treeview user">
                  <a className="image">
                    <img src="/images/user-40x40.jpg" className="img-circle" alt="User Image" />
                    <span>{this.props.userName}</span>
                      <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right"></i>
                    </span>
                  </a>
                  <ul id="profile-section" className="treeview-menu display-hide">
                    <li className="active"><a><i className="fa fa-user"></i> Profile</a></li>
                    <li><a onClick={this.props.handleSignOut}><i className="fa fa-sign-out"></i> Logout</a></li>
                  </ul>
                </li>
                <li style= {window.location.pathname == '/dashboard'  || window.location.pathname == '/'? style:{}} onClick = {(e)=>this.props.setHeaderIcon()}> <Link to="/dashboard" ><img src="/images/vehicle.png" className="menu-icons" /> <span>Dashboard</span> </Link> </li>

                <li style= {window.location.pathname == '/asset' ? style:{}} onClick = {(e)=>this.props.setHeaderIcon()} > <Link to="/asset"><img src="/images/vehicle.png" className="menu-icons" /> <span>asset</span> </Link> </li>

                <li style= {window.location.pathname == '/assetType' ? style:{}}  onClick = {(e)=>this.props.setHeaderIcon()}> <Link to="/assetType"> <img src="/images/driver.png" className="menu-icons" /> <span>Asset Type</span> </Link> </li>

                <li style= {window.location.pathname == '/device' ? style:{}} onClick = {(e)=>this.props.setHeaderIcon()} > <Link to="/device"> <img src="/images/region.png" className="menu-icons" /> <span>Device</span> </Link> </li>

            
              </ul>
            </section>
          </aside>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/asset" component={Asset} />
          <Route path="/assetType" component={AssetType} />
          <Route path="/device" component={Device} />
         
          
        </div>
      </Router>
    )
  }
}

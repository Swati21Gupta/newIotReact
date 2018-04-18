import React, {Component} from 'react';
import ScoreCard from './ScoreCard';
import MapComponent from './MapComponent';
import UOrders from './UOrders';
import AssignUnassign from './Graph/AssignUnassign';
import Priority from './Graph/Priority';
import RouteSolution from './Routes/RouteSolution';
import Stops from './Routes/Stops';
import Orders from './Routes/Orders';
import Items from './Routes/Items';
import {scoreCardData, magicWandService, lockedRouteService} from './../services/Api';
import {getISODate} from './Utils';
import {magicWandData} from './MagicWandData';

const assignDriverData = [
  {name: "Assign Driver"}, {name: "Amardeep"}, {name: "Rajeshwar"}, {name: "Pitambar"}
]
export default class IRouteLandingPage extends Component {
  constructor(props) {
    super(props);
      this.state = {
        data:[],
        isLoaded:false,
        isShowOrders:false,
        isOrdersGraph: false,
        algoData: [],
        algoName: '',
        problemId: '',
        routesData: [],
        isShowRoutes: false,
        algoInfo: [],
        UOrderItems: [],
        isShowUOrderItemsTable: false,
        isShowRoutesTable: true,
        isShowStopsTable: false,
        isShowOrdersTable: false,
        isShowItemsTable: false,
        multipleRoutes: false,
        isSelectAll: false,
        isLockButton: false,
        isLockClicked: false,
        selectedRouteRow: -1,
        selectedStop: -1,
        selectedOrder: -1,
        unassignedRow: -1,
        selectedOrdersRow: -1,
        routeIndex: 0,
        routeSolutionInfo: [],
        lockUnlockText: 'Locked',
        isMagicWandLoader: true,
        isShowScoreCard: true
      }
  }
  componentDidMount() {
      this.getScoreData();
  }
  
  componentWillReceiveProps(nextProps) {
    console.log(nextProps,"nextPropsnextProps")
    if (nextProps.isMagicWand) {
      this.setState({isMagicWandLoader: true})
      this.getMagicWandData();
      // static magic wand response
      // let routes = [].concat(magicWandData.data[0].routeSolutionInfo)
      // routes.map((item) => {
      //   item.rowColor = '#'+Math.floor(Math.random() * (999999 - 9999));
      // })
      // this.setState({
      //     ...this.state,
      //     ...this.setDefaultState(),
      //     algoData: magicWandData.data,
      //     algoName: magicWandData.data[0].algoName,
      //     problemId: magicWandData.data[0].problemId,
      //     data: magicWandData.data[0],
      //     routesData: routes,
      //     isShowOrders: false,
      //     isShowRoutes:true,
      //     isLoaded : true
      // })
    }
    if(nextProps.scoreData){
      console.log("nextProps")
      this.getScoreData();

      
    }
  }
  setDefaultState() {
    return {
      routesData: [],
      UOrderItems: [],
      isShowOrders: false,
      isOrdersGraph: false,
      isShowUOrderItemsTable: false,
      isShowRoutesTable: true,
      isShowStopsTable: false,
      isShowOrdersTable: false,
      isShowItemsTable: false,
      multipleRoutes: false,
      isSelectAll: false,
      isLockButton: false,
      isLockClicked: false,
      selectedRouteRow: -1,
      selectedStop: -1,
      selectedOrder: -1,
      unassignedRow: -1,
      selectedOrdersRow: -1
    }
  }
  handleUnassignedOrders(row, isShow) {
    console.log(this.state.data.unassignedOrderInfo[row],"0000")
    let order = row >= 0 ? this.state.data.unassignedOrderInfo[row] : [];
    this.setState({
      unassignedRow: row,
      isShowUOrderItemsTable: isShow,
      UOrderItems: order.lineItems
    })
    let unassigned = Object.assign({}, {latlng: this.state.data.unassignedLocInfo})
  }

  getScoreData = () => {
    console.log("getScoreCard call")
    try {
      scoreCardData(getISODate(this.props.ordersPickDate)).then((response)=>{
      if(response.status === 200) {
        if(response.body.success === true) {
              this.setState({
                  data : response.body.data,
                  algoInfo: response.body.data.algoInfo,
                  isLoaded : true},
                  ()=>{
                    console.log(this.state.data,"this.state.data this.state.data")
                  this.getOrdersData(false, true)
                })

            }
            else {
              this.setState({
                  isLoaded : true,
                  noDataErrorMsg : "API CHECK"
                },()=>{
                  alert(this.state.noDataErrorMsg)
                })
            }
        }
        else {
              this.setState({
                  isLoaded:true,
                  noDataErrorMsg:"Status 200 Server error Occured"
                },()=>{
                  // alert(this.state.noDataErrorMsg)
                  console.log("Status 200 Server error Occured")
                })
        }
      }).catch((error)=>{
        this.setState({
            isLoaded:true,
            noDataErrorMsg:"Catch Server error Occured"
          },()=>{
            //alert(this.state.noDataErrorMsg)
            console.log("Catch Server error Occured")
          })
      })
    } catch (error){
      alert("Check Server")
    }
  }

  getOrdersData=(isShowRoutes, isShowOrders)=>{
    
    this.setState({
      isShowRoutes: isShowRoutes, isShowOrders: isShowOrders,
    })
  }
  toggleOrdersGraph = () => {
    this.setState({isOrdersGraph: !this.state.isOrdersGraph});
  }
  getMagicWandData = () => {
    try {
      //alert(getISODate(this.props.ordersPickDate))
      magicWandService(getISODate(this.props.ordersPickDate)).then((response)=>{
      if(response.status === 200) {
        if(response.body.success === true) {
            let routes = [].concat(response.body.data[0].routeSolutionInfo);
            routes.map((item, index) => {
              item.isSelected = index===0 ? true : item.isSelected;
              item.rowColor = '#'+Math.floor(100000 + Math.random() * 900000);
            })
            this.setState({
              ...this.state,
              ...this.setDefaultState(),
              algoData: response.body.data,
              algoName: response.body.data[0].algoName,
              problemId: response.body.data[0].problemId,
              data : response.body.data[0],
              routesData: routes,
              isShowOrders: false,
              isShowRoutes:true,
              isLoaded : true,
              isMagicWandLoader: false
            })
          }
          else {
            this.setState({
                isLoaded : true,
                noDataErrorMsg : "API CHECK"
              },()=>{
                alert(this.state.noDataErrorMsg)
              })
          }
        }
        else {
              this.setState({
                  isLoaded:true,
                  noDataErrorMsg:"Status 200 Server error Occured"
                },()=>{
                  alert(this.state.noDataErrorMsg)
                })
        }
      }).catch((error)=>{
        this.setState({
            isLoaded:true,
            noDataErrorMsg:"Catch Server error Occured"
          },()=>{
            alert(this.state.noDataErrorMsg)
          })
      })
    } catch (error){
      alert("Check Server")
    }
  }
  getLockedRouteService = (data) => {
    console.log("send data",data)
    try {
      lockedRouteService(data).then((response)=>{
      if (response.status === 200) {
          console.log("locked response", response.body.data);
          this.setState({routeSolutionInfo : response.body.data[0].routeSolutionInfo})
        }
        else {
              this.setState({
                  isLoaded:true,
                  noDataErrorMsg:"Server error Occured"
                },()=>{
                  alert(this.state.noDataErrorMsg)
                })
        }
      }).catch((error)=>{
        this.setState({
            isLoaded:true,
            noDataErrorMsg:"Server error Occuredd"
          },()=>{
            alert(this.state.noDataErrorMsg)
          })
      })
    } catch (error){
      alert("Check Server")
    }
  }

  changeAlgo(val) {
    //this.setState({...this.state, ...this.setDefaultState()})
    // this.setState({algoName: val});
    this.state.algoData.map((item) => {
      if (item.algoName === val) {
        this.handleSelectedRoute(0, false)
        let routes = [].concat(item.routeSolutionInfo)
        routes.map((item) => {
          item.rowColor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
        })
        const tableData = {
          algoName: val,
          problemId: item.problemId,
          data : item,
          routesData: routes,
          isShowOrders: false,
          isShowRoutes:true,
          isLoaded : true
        }
        this.setState({
            ...this.state,
            ...this.setDefaultState(),
            ...tableData
        })
      }
    })
  }
  handleRoutesTable(isRoutes,isStops,isOrders,isItems) {
    this.setState({
      isShowRoutesTable: isRoutes,
      isShowStopsTable: isStops,
      isShowOrdersTable: isOrders,
      isShowItemsTable: isItems
    });
  }
  handleLockUnlockToggle() {
    this.setState({lockUnlockText: this.state.lockUnlockText==='Locked' ? 'Unlocked' : 'Locked'})
  }

  handleSelected() {
    let routes = [].concat(this.state.routesData)
    let selectedRoutes = []
    let mapData = []
    routes.map((item) => {
      if (item.isSelected) {
        let mapRoute = [];
        selectedRoutes.push(item)
        item.stops.map((stop) => {
          let newState = Object.assign({}, {
              lng: stop.lng,
              lat: stop.lat,
              locType: stop.locationType,
              sequence: stop.sequence,
              arrTime: stop.arrivalTime,
              depTime: stop.departureTime,
              serviceTime: stop.serviceTime,
              stopName: stop.stopName
            });
          mapRoute.push(newState)
        })
        console.log("item", item)
        let newRoute = Object.assign({}, {routeId: item.routeId, stops: mapRoute});
        mapData.push(newRoute);
        console.log("newRoute",newRoute)
      }
    })
    console.log("selectedRoutes for map", mapData)
    return selectedRoutes
  }
  handleSelectedRoute(row, id) {
    let routes = [].concat(this.state.routesData)
    let status = false
    let routeIndex = 0
    routes.map((item) => {
      if (item['routeId'] === id) {
        item.isSelected = !item.isSelected
        routeIndex = item.isSelected ? row : 0
      } // to deselect all routes except one
      else {
        item.isSelected = false
      }
    })
    if (row === 0 && id === true) {
      routes.map((item) => {
          item.isSelected = true
      })
      status = true
    } else if (row === 0 && id === false) {
      routes.map((item) => {
          item.isSelected = false
      })
      status = false
    }
    let len = this.handleSelected().length
    if (len===1) {
      routes.map((item, index) => {
        if (item.isSelected) {
          row = index;
        }
      })
    }
    this.setState({
      ...this.state,
      ...this.setDefaultState(),
      isSelectAll: status,
      routesData: routes,
      routeIndex: routeIndex,
      isShowStopsTable: len >= 1 ? true : false,
      isLockButton: len >=1 ? true : false,
      multipleRoutes: len > 1 ? true : false,
      selectedRouteRow: len < 1 ? -1 : row,
      selectedStop: -1,
      selectedOrder: -1
    })
  }
  handleSelectedStop(row) {
    this.setState({
      isShowOrdersTable: true,
      selectedStop: row,
      selectedOrder: -1
    })
  }
  handleSelectedOrder(row) {
    this.setState({
      isShowItemsTable: true,
      selectedOrder: row
    })
  }

  handleLockButton() {
    console.log("selectedRoute locked", this.state.routesData)
    let routes = [].concat(this.state.routesData)
    let orderIdList = []
    let routeIdList = []
    routes.map((item) => {
      if (item.isSelected) {
        item.isLocked = true
        routeIdList.push(item.routeId);
        item.stops.map((item) => {
          item.orders.map((item) => {
            item.orderId===undefined ? orderIdList.push() : orderIdList.push(item.orderId);
          })
        })
      } else {
        item.isLocked = false
      }
    })
    let lockedRouteData = {
      algo: this.state.algoName,
      type: "lock",
      problemId: this.state.problemId,
      routeId: routeIdList,
      orderId: orderIdList
    }
    console.log("lockedRouteData",lockedRouteData)
    // this.getLockedRouteService(lockedRouteData)
    this.setState({routesData: routes});
  }
  handleShowHideScoreCard = () => {
    this.setState({isShowScoreCard: !this.state.isShowScoreCard});
  }
  handleAssignDriver() {
    console.log("assign driver")
  }
  getScoreCard = ()=>{
    let row = this.state.selectedRouteRow;
    let routes = this.state.routesData[row];
    let stopRow = this.state.selectedStop;
    let orderRow = this.state.selectedOrder;
    let isDisabled = this.state.lockUnlockText==='Locked' ? "disabeled" : "";
    let ddStyle = {
      display: "flex"
    }

    return (
    		<div>
          {this.props.isMagicWand && this.state.isMagicWandLoader ?
            <div className="loader-container">
              <div className="loader"></div>
              <div className="text-center font-size30">Loading Routes...</div>
            </div> : ""}
				<div className={this.state.isShowScoreCard ? "container stacking" : "display-hide"}>
          {this.state.isOrdersGraph ?
            <div className="right_panel">
              <AssignUnassign
                toggleOrdersGraph={this.toggleOrdersGraph}
                ordersData={this.state.data.analyticsInfo}
              />
              <Priority />
            </div>
            : <ScoreCard
                isMagicWand={this.props.isMagicWand}
                isOrdersGraph={this.state.isOrdersGraph}
                toggleOrdersGraph={this.toggleOrdersGraph}
                isMagicWand = {this.props.isMagicWand}
                getOrdersData ={this.getOrdersData}
                data={this.state.data}
                algoInfo={this.state.algoInfo}
                algoName = {this.state.algoName}
                changeAlgo = {(e) => this.changeAlgo(e)}
              />
          }
        </div>
        <MapComponent
          stopLat = {this.state.data.unassignedOrderInfo}
          isMagicWand = {this.props.isMagicWand}
          isShowRoutes = {this.state.isShowRoutes}
          routeLatLng = {this.state.routesData[this.state.routeIndex]}

          />
        {
          this.state.isShowOrders ?
            <div>
              <div id="tabs" className="collap table-responsive data_table">
                <ul className="nav nav-tabs">
                  <li onClick={(e)=>this.handleUnassignedOrders(-1, false)}><a className="fontBold hover">Orders</a></li>
                </ul>
                <UOrders
                  unassignedRow = {this.state.unassignedRow}
                  unassignedOrderInfo = {this.state.data.unassignedOrderInfo}
                  handleUnassignedOrders = {this.handleUnassignedOrders.bind(this)}
                />
              </div>
              {this.state.isShowUOrderItemsTable ?
                <div id="tabs" className="collap table-responsive data_table items_data_table">
                  <ul className="nav nav-tabs">
                    <li><div className="heading-padding">ITEMS</div></li>
                  </ul>
                  <Items
                    itemsData={this.state.UOrderItems}
                  />
                </div>
              : ""}
            </div>
          :
          this.state.isShowRoutes ?
            <div>
              <div id="tabs" className="collap table-responsive data_table routes_data_table">
                <ul className="nav">
                  <li className="float-left" style={ddStyle} onClick={(e)=>this.handleRoutesTable(true,false,false,false)}>
                    <a className="fontBold hover">ROUTES</a>
                      {/*<select className={this.state.lockUnlockText==='Unlocked' ? "assign-driver-dd" : "assign-driver-dd click-not-allowed"}
                        disabled={isDisabled}
                        onChange={this.handleAssignDriver.bind(this)}>
                      {
                        Array.isArray(assignDriverData)
                      ?
                        assignDriverData.map((driver,index)=>{
                        return(<option key={index} value={driver.name}>
                            {driver.name}
                          </option>)
                        })
                      :
                      <option value="Assign Driver">"Assign Driver"</option>
                      }
                      </select>
                      <div className="assign-driver-button">
                        <span>Submit</span>
                      </div>*/}
                  </li>
                  <li className={this.state.lockUnlockText+"-toggle"} onClick={(e)=>this.handleLockUnlockToggle()}><span>{this.state.lockUnlockText}</span></li>
                </ul>
                <RouteSolution
                  routesData={this.state.routesData}
                  lockUnlockText={this.state.lockUnlockText}
                  isSelectAll={this.state.isSelectAll}
                  isLockButton={this.state.isLockButton}
                  isLockClicked={this.state.isLockClicked}
                  handleSelectedRoute={this.handleSelectedRoute.bind(this)}
                  handleLockButton={this.handleLockButton.bind(this)}
                />
              </div>
              {this.state.isShowStopsTable ?
                <div id="tabs" className="collap table-responsive data_table stops_data_table">
                  <ul className="nav nav-tabs">
                    <li><div className="heading-padding">STOPS</div></li>
                  </ul>
                  {row >=0 ?
                    <Stops
                      stopsData={routes}
                      selecetedStopsRow={this.state.selectedStop}
                      multipleRoutes={this.state.multipleRoutes}
                      handleSelectedStop={this.handleSelectedStop.bind(this)}
                    />
                  : "" }
                </div>
                : ""}
              {this.state.isShowOrdersTable && row >= 0 && stopRow >= 0 ?
                <div id="tabs" className="collap table-responsive data_table orders_data_table">
                  <ul className="nav nav-tabs">
                    <li><div className="heading-padding">ORDERS</div></li>
                  </ul>

                    <Orders
                      ordersData={routes.stops[stopRow].orders}
                      selectedOrderColor={routes.rowColor}
                      selectedOrdersRow={this.state.selectedOrder}
                      handleSelectedOrder={this.handleSelectedOrder.bind(this)}
                    />

                </div>
              : ""}
              {this.state.isShowItemsTable && row >=0 && stopRow >=0 && orderRow >=0 ?
                <div id="tabs" className="collap table-responsive data_table items_data_table">
                  <ul className="nav nav-tabs">
                    <li><div className="heading-padding">ITEMS</div></li>
                  </ul>

                    <Items
                      itemsData={routes.stops[stopRow].orders[orderRow].itemInfo}
                    />

                </div>
              : ""}
            </div>
          : null
        }
        <div className="show-hide-scorecard" onClick={this.handleShowHideScoreCard.bind(this)}>
          <span>{this.state.isShowScoreCard ? "Hide" : "Show"}</span>
        </div>
        <div id="table-expand" className="toggle-routes-table">
          <span className="back-button glyphicon glyphicon-resize-vertical"></span>
        </div>
			</div>
	    )
  }


  render() {
    return(
      <div>
      {
        this.state.isLoaded
		    ?
  			  this.getScoreCard()
        :
          <div className="loader-container">
             <div className="loader"></div>
          </div>
      }
      </div>
    )
  }
}

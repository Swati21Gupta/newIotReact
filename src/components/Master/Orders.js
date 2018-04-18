
import React, {Component} from 'react';
import ReactFileReader from 'react-file-reader';
import Pagination from 'react-js-pagination';
import {CSVLink} from 'react-csv';
import {getLocaleDate} from './../Utils';
import {SOCKET} from './../../services/Api';

const csvData =[
  ['accountId', 'orderId', 'serviceLocationId' ,'orderDate', 'description', 'serviceType' ,'orderSource', 'takenBy', 'plannedDeliveryDate', 'plannedDeliveryTime' ,'actualDeliveryDate'  ,'actualDeliveryTime',  'deliveredBy', 'size1', 'size2', 'size3', 'jobPriority' ,'cancelReason',  'cancelDate' , 'cancelBy' , 'reasonCode'  ,'reasonText' , 'status',  'lineItems/ItemId' , 'lineItems/size1', 'lineItems/size2' ,'lineItems/size3']
];

export default class Orders extends Component{
  constructor(props) {
    super(props);
      this.state = {
        isOrderData: [],
        activePage:1,
        totalItemsCount:0,
        searchString:''
      }
  }
  componentDidMount() {
    this.getOrdersData();
  }
  handleFiles = files => {
     console.log(files)
     if(files && files.fileList && files.fileList.length){

          let actualSize = files.fileList[0].size;
          actualSize = actualSize/1048576;
          if(actualSize<=0){
            console.log("Empty size")
          }else if(actualSize>5){
            console.log("Size is too large")
          }else{
            SOCKET.emit('orders::create',{file:files},(error,response)=>{
                if(!error){
                    alert(error.message)
                }else{
                    alert("Succesfully orders created");
                    this.getOrdersData();
                }
            })
            // SOCKET.on('orders created',(orders)=>{
            //     alert("Succesfully orders created")
            // })
        }
     }else{
      console.log("Empty file")
     }
  }
  deleteVehicle = (orderId) =>{
    console.log("orderId == ",orderId)
    SOCKET.emit('orders::remove', null,{orderId:orderId}, (error, response) => {
        if(!error){
            this.getOrdersData();
        }else{
            alert(error.message)
        }
    });
    SOCKET.on('orders removed', (order) => {
       alert("Succesfully order removed")
    });
  }
  getOrdersData = () => {
    try{
        let skip = this.state.activePage?(this.state.activePage-1)*10:this.state.activePage;
        let queryObj = {skip:skip,limit:10};
        console.log(queryObj)
        if(this.state.searchString){
          queryObj.searchString = this.state.searchString
        }
        SOCKET.emit('orders::find', queryObj, (error, response) => {
            console.log(error, response)
            if(!error && response.total){
                this.setState({
                    isOrderData : response.data,
                    totalItemsCount:response.total
                })
            }else{
              this.setState({
                searchString:''
              })
            }
        });
    }catch(error){
      alert("Check server error");
    }
  }
  handlePageChange=(pageNumber)=> {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
    this.getOrdersData()

  }
  handleSearchChange = (e) =>{
    if (e.target.id === 'search') {
      this.setState({
        searchString:e.target.value
      })
      if(!e.target.value){
        this.getOrdersData()
      }
     } 

  }
  render(){
    console.log(this.state.isOrderData)
    return(
        <div className="content-wrapper">

            <section className="content-header">

            <h1 className="float-left"> Order Master </h1>
              <div className="import-tools-block">
                <li><a href=""><i className="fa fa-download"></i></a><CSVLink data={csvData} >Download Sample CSV</CSVLink></li>
                <li>
                  <ReactFileReader fileTypes={[".csv"]} base64={true} multipleFiles={true} handleFiles={this.handleFiles}>
                    <a href="" className="btn btn-warning">Import CSV</a>
                  </ReactFileReader>
                </li>
               
              </div>
            </section>
            <section className="content">
              <div className="row">
                <div className="col-xs-12">
                  <div className="box">
                    <div className="box-header">
                      <div className="col-xs-8">
                        <h3 className="box-title">Orders</h3>
                      </div>
                      <div className="col-xs-4">
                        <div className="col-xs-12">
                          <div id="custom-search-input">
                            <div className="input-group col-md-12">
                              <input type="text" className="  search-query form-control" placeholder="ServiceType,TakenBy" id="search" onChange={(e)=>this.handleSearchChange(e)} value={this.state.searchString}/>
                              <span className="input-group-btn">
                              <button onClick={(e)=>this.getOrdersData()} className="btn btn-default" type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
                              </span>
                              </div>
                          </div>
                        </div>

                      </div>
                    </div>
                    <div className="box-body">
                      <table id="example2" className="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th>Order Date</th>
                            <th>Service Type</th>
                            <th>Taken By</th>
                            <th>Delivery Date</th>
                            <th>SIZE1</th>
                            <th>SIZE2</th>
                            <th>SIZE3</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                        {this.state.totalItemsCount?
                            this.state.isOrderData.map((order, index) => {
                              return (
                                <tr key={index} >
                                  <td>{getLocaleDate(order.orderDate)}</td>
                                  <td>{order.serviceType}</td>
                                  <td>{order.takenBy}</td>
                                  <td>{getLocaleDate(order.plannedDeliveryDate)}</td>
                                  <td>{order.size1}</td>
                                  <td>{order.size2}</td>
                                  <td>{order.size3}</td>
                                  <td>{order.status}</td>
                                  <td>
                                   
                                    <a  onClick={(e)=>this.deleteVehicle(order.orderId)} ><i className="fa fa-trash"></i></a>
                                  </td>
                                </tr>
                              )}):
                              <tr><td colSpan="10">No data found</td></tr>
                        }
                        </tbody>
                      </table>
                      {this.state.totalItemsCount?<Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={10}
                        totalItemsCount={this.state.totalItemsCount}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}
                      />:''}
                    </div>

                  </div>
                </div>

              </div>

            </section>

        </div>
      )
  }
}

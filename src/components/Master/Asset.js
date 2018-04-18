import React, {Component} from 'react';
import ReactFileReader from 'react-file-reader';
import Pagination from 'react-js-pagination';
import {CSVLink} from 'react-csv';
import {importDrivers, getDriversData, deleteDriver, SOCKET} from './../../services/Api';
// import io from 'socket.io-client';
import AddDriverForm from './../ModalPopUp/AddDriverForm';
import io from 'socket.io-client';

const csvData =[
  ['firstname', 'lastname', 'email'] ,
  ['Ahmed', 'Tomi' , 'ah@smthing.co.com'] ,
  ['Raed', 'Labes' , 'rl@smthing.co.com'] ,
  ['Yezzi','Min l3b', 'ymin@cocococo.com']
];
export default class Driver extends Component{
  constructor(props) {
    super(props);
      this.state = {
        isDriverData: [],
        activePage:1,
        totalItemsCount:0,
        modalIsOpen: false,
        driverModalIsOpen:false,
        driverData:{}
      }
  }
  componentDidMount() {
        this.getDriversData();
  }
  setDefaultState() {
    return {
      modalIsOpen: false
    }
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
        importDrivers(files).then((response)=>{
          console.log(response,"responseresponse")
          if(response.status === 200){
            this.getDriversData()
          }
        }).catch((error)=>{
          console.log(error);
        })
      }
     }else{
      console.log("Empty file")
     }
  }
  deleteDriver = (driverId) =>{
    // console.log("driverId == ",driverId)
    // deleteDriver(driverId).then((response)=>{
    //   console.log(response,response.status)
    //   if(response.status === 200){
    //     this.getDriversData()
    //   }
    // }).catch((error)=>{
    //   alert(error);
    // })
    SOCKET.emit("workers::remove",null,{workerId:driverId},(error,response)=>{
        if(error){
            alert(error.message)
        }else{
            this.getDriversData()
        }
    })
  }
  getDriversData = () => {
    try{

        let skip = this.state.activePage?(this.state.activePage-1)*10:this.state.activePage;
        let queryObj = {skip:skip,limit:10};
        // getDriversData(queryObj).then((response)=>{
        // 	console.log("response",response.body.total, response.body.data.length)
        //     if(response.body.total > 0){
        //       if(response.body.data && response.body.data.length){

        //         this.setState({
        //             isDriverData : response.body.data,
        //             totalItemsCount:response.body.total
        //         })
        //       }
        //     }else{
        //       alert("Data not found")
        //     }
        //   }).catch((error)=>{
        //     console.log(error)
        //     //alert(error)
        //   })
        SOCKET.emit('workers::find',queryObj,(error,response)=>{
          if(!error){
            console.log(response,"response")
            this.setState({
                isDriverData : response.data,
                totalItemsCount:response.total
            })
          }else{
            alert(error.message)
          }
        })
    }catch(error){
      alert("Check server error");
    }
  }
  handlePageChange=(pageNumber)=> {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
    this.getDriversData()

  }
  openAddDriverForm = (driver) => {
    this.setState({
      ...this.state,
      ...this.setDefaultState(),
      modalIsOpen: true,
      driverData:driver
    });
  }
  closeAddDriverModal = () => {
    this.setState({modalIsOpen: false})
  }

  render(){
    console.log(this.state.isDriverData)
    return(
        <div className="content-wrapper">
            <section className="content-header">

              <h1 className="float-left"> Drivers Master </h1>
              <div className="import-tools-block">
               
                <li>
                </li>
                <li>
                  <a className="btn btn-info" onClick={(e)=>this.openAddDriverForm()}>Add Driver</a>
                </li>
              </div>
            </section>
            <section className="content">
              <div className="row">
                <div className="col-xs-12">
                  <div className="box">
                    <div className="box-header">
                      <div className="col-xs-8">
                        <h3 className="box-title">Drivers</h3>
                      </div>
                      <div className="col-xs-4">
                        <div className="col-xs-8">
                          <div id="custom-search-input">
                            <div className="input-group col-md-12">
                               </div>
                          </div>
                        </div>

                      </div>
                    </div>
                    <div className="box-body">
                      <table id="example2" className="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>AssignedVehicleId</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>License</th>
                            <th>RegularHours</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                        {this.state.totalItemsCount?
                            this.state.isDriverData.map((driver, index) => {
                              return (
                                <tr key={index} >
                                  <td>{driver.name}</td>
                                  <td>{driver.type}</td>
                                  <td>{driver.assignedVehicleId}</td>
                                  <td>{driver.email}</td>
                                  <td>{driver.mobile}</td>
                                  <td>{driver.licenseNumber}</td>
                                  <td>{driver.regularHours}</td>
                                  <td>{driver.workerStatus}</td>
                                  <td>
                                    <a onClick={(e)=>this.openAddDriverForm(driver)} ><i className="fa fa-pencil-square-o"></i></a> &nbsp;
                                    <a  onClick={(e)=>this.deleteDriver(driver.workerId)}><i className="fa fa-trash"></i></a>
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
            {this.state.modalIsOpen ?
              <AddDriverForm
                modalIsOpen={this.state.modalIsOpen}
                closeModal={()=>this.closeAddDriverModal()}
                getDriversData = {()=>this.getDriversData()}
                driverData= {this.state.driverData}
                
              /> : ""}
            }
        </div>
      )
  }
}

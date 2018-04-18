import React, {Component} from 'react';
import ReactFileReader from 'react-file-reader';
import Pagination from 'react-js-pagination';
import {CSVLink} from 'react-csv';
import {convertSecToHrs} from './../Utils';
// import {importVehicles,vehiclesData,deleteVehicle,SOCKET} from './../../services/Api';
import {SOCKET} from './../../services/Api';
import DeletePopUp from './../ModalPopUp/DeletePopUp';

 

const csvData =[
  ['accountId','vehicleId', 'regionId', 'vehicleTypeId','locationId','description','deviceId','earliestStart','latestArrival','status'] ,
  ['Number', 'string' , 'string','string','string','string','string','string','number','number','string'] 
];
export default class Vehicles extends Component{
  constructor(props) {
    super(props);
      this.state = {
        modalIsOpen: true,
        vehicleData: [],
        isDeleteButton: false,
        vehicleId: '',
        deleteMessage: 'Do you want to delete it?',
        isDeleteActive: true,
        activePage: 1,
        totalItemsCount: 0,
        searchString:''
      }
  }
  componentDidMount() {
        this.getVehiclesData();
  }
  setDefaultState() {
    return {
      modalIsOpen: true,
      isDeleteButton: false,
      isDeleteActive: true,
      vehicleId: '',
      deleteMessage: 'Do you want to delete it?'
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
        // importVehicles(files).then((response)=>{
        //   console.log(response,"responseresponse")
        //   if(response.status === 200){
        //     this.getVehiclesData()
        //   }
        // }).catch((error)=>{
        //   console.log(error);
        // })
        SOCKET.emit('vehicles::create',{file:files},(error,response)=>{
            console.log(error," error",response," response")
            if(!error){
                this.getVehiclesData()
            }else{
                alert(error.message)
            }
        })
      }
     }else{
      console.log("Empty file")
     }
  }
  deleteVehicleEntry = (vehicleId) =>{
    // console.log("vehicleId == ",vehicleId)
    // deleteVehicle(vehicleId).then((response)=>{
    //   console.log(response,response.status)
    //   if(response.status === 200){
    //     this.getVehiclesData()
    //     this.setState({
    //       deleteMessage: "Vehicle is deleted successfully!",
    //       isDeleteActive: false
    //     })
    //   }
    // }).catch((error)=>{
    //   alert(error);
    // })
    SOCKET.emit('vehicles::remove',null,{vehicleId:vehicleId},(error,response)=>{
        if(!error){
            this.getVehiclesData()

        }else{
            alert(error.message)
        }
    })
    SOCKET.on('vehicles removed',(vehicle)=>{
       this.setState({
          deleteMessage: "Vehicle is deleted successfully!",
          isDeleteActive: false
        })
    })
  }
  getVehiclesData = () => {
    try{
        let skip = this.state.activePage?(this.state.activePage-1)*10:this.state.activePage;
        let queryObj = {skip:skip,limit:10};
        if(this.state.searchString){
          queryObj.searchString = this.state.searchString
        }
        SOCKET.emit('vehicles::find',queryObj,(error,response)=>{
              console.log(error," error",response," response")
            if(!error){
                this.setState({
                    vehicleData : response.data,
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
    this.getVehiclesData()

  }
  openDeletePopUp = (vehicleId) => {
    console.log("openDeletePopUp")
    this.setState({
      ...this.state,
      ...this.setDefaultState(),
      isDeleteButton: true,
      vehicleId: vehicleId
    });
  }
  closeDeleteModal = () => {
    this.setState({modalIsOpen: false})
  }
  handleCancelDelete = () => {
    console.log("handleCancelDelete")
    this.setState({
      ...this.state,
      ...this.setDefaultState()
    })
  }
  handleConfirmDelete = () => {
    console.log("handleConfirmDelete")
    this.deleteVehicleEntry(this.state.vehicleId)
  }
  handleSearchChange = (e) =>{
    if (e.target.id === 'search') {
      this.setState({
        searchString:e.target.value
      })
      if(!e.target.value){
        console.log(e.target.value,"e.target.value")
        this.setState({
        searchString:''
        },function(){
          this.getVehiclesData()
        })
      
        
      }
     } 

  }

  render(){
    return(
        <div className="content-wrapper">
            <section className="content-header">
              <h1 className="float-left"> Vehicles Master </h1>
              <div className="import-tools-block">
                <li><a><i className="fa fa-download"></i></a><CSVLink data={csvData} >Download Sample CSV</CSVLink></li>
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
                        <h3 className="box-title">Vehicle</h3>
                      </div>
                      <div className="col-xs-4">
                        <div className="col-xs-12">
                          <div id="custom-search-input">
                            <div className="input-group col-md-12">
                                 <input type="text" className="search-query form-control" placeholder="Type,Description,VehicleId" id="search" onChange={(e)=>this.handleSearchChange(e)} value={this.state.searchString}/>
                              <span className="input-group-btn">
                              <button onClick={(e)=>this.getVehiclesData()} className="btn btn-default" type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
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
                            <th>Reg. No</th>
                            <th>Vehicle</th>
                            <th>Region</th>
                            <th>Type</th>
                            <th>Location</th>
                            <th>Device</th>
                            <th>Start</th>
                            <th>Arival</th>
                            <th>Description</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                        {this.state.totalItemsCount?
                            this.state.vehicleData.map((vehicle, index) => {
                              return (
                                <tr key={index} >
                                  <td>{index+1}</td>
                                  <td>{vehicle.vehicleId}</td>
                                  <td>{vehicle.regionId}</td>
                                  <td>{vehicle.vehicleTypeId}</td>
                                  <td>{vehicle.deviceId}</td>
                                  <td>{''}</td>
                                  <td>{convertSecToHrs(vehicle.earliestStart)}</td>
                                  <td>{convertSecToHrs(vehicle.latestArrival)}</td>
                                  <td>{vehicle.description}</td>
                                  <td>
                                    
                                    <a onClick={(e)=>this.openDeletePopUp(vehicle.vehicleId)}><i className="fa fa-trash"></i></a>
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
            {this.state.isDeleteButton ?
              <DeletePopUp
                modalIsOpen={this.state.modalIsOpen}
                deleteMessage={this.state.deleteMessage}
                isDeleteActive={this.state.isDeleteActive}
                closeDeleteModal={()=>this.closeDeleteModal()}
                handleCancelDelete={()=>this.handleCancelDelete()}
                handleConfirmDelete={()=>this.handleConfirmDelete()}
              /> : ""}
        </div>
      )
  }
}

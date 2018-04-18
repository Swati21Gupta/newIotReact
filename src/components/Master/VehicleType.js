import React, {Component} from 'react';
import ReactFileReader from 'react-file-reader';
import Pagination from 'react-js-pagination';
import {CSVLink} from 'react-csv';
import {convertSecToHrs} from './../Utils';
import {SOCKET} from './../../services/Api';
import AddVehicleTypeForm from './../ModalPopUp/AddVehicleTypeForm';

const csvData =[
  ['firstname', 'lastname', 'email'] ,
  ['Ahmed', 'Tomi' , 'ah@smthing.co.com'] ,
  ['Raed', 'Labes' , 'rl@smthing.co.com'] ,
  ['Yezzi','Min l3b', 'ymin@cocococo.com']
];

export default class VehicleType extends Component{
  constructor(props) {
    super(props);
      this.state = {
        modalIsOpen: false,
        isVehiclesTypesData:[],
        searchString:''
      }
  }
  componentDidMount() {
    this.getVehiclesTypeData()
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

        SOCKET.emit('vehicles::create',{file:files},(error,response)=>{
            console.log(error," error",response," response")
            if(!error){
                // this.getVehiclesData()
            }else{
                alert(error.message)
            }
        })
      }
     }else{
      console.log("Empty file")
     }
  }
  getVehiclesTypeData = () =>{
    //let skip = this.state.activePage?(this.state.activePage-1)*10:this.state.activePage;
        let queryObj = {skip:0,limit:10};
        console.log(queryObj)
        if(this.state.searchString){
          queryObj.searchString = this.state.searchString
        }
        console.log("queryObj = ", queryObj)
    SOCKET.emit("vehicle-types::find",queryObj,(error,response)=>{
      if(error){
        alert(error.message)
      }else{
        this.setState({
          isVehiclesTypesData : response.data,

        })
      }
    })
  }
  openVehicleTypeForm = () => {
    this.setState({
      ...this.state,
      ...this.setDefaultState(),
      modalIsOpen: true
    });
  }
  closeVehicleTypeModal = () => {
    this.setState({modalIsOpen: false})
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
          this.getVehiclesTypeData()
        })
      
        
      }
     } 

  }
  render(){
    return(
        <div className="content-wrapper">
            <section className="content-header">
              <h1 className="float-left"> Vehicles Type Master </h1>
              <div className="import-tools-block">
               
                <li>
                 
                </li>
              </div>
            </section>
            <section className="content">
              <div className="row">
                <div className="col-xs-12">
                  <div className="box">
                    <div className="box-header">
                      <div className="col-xs-8">
                        <h3 className="box-title">Vehicle Type</h3>
                      </div>
                      <div className="col-xs-4">
                        <div className="col-xs-12">
                          <div id="custom-search-input">
                            <div className="input-group col-md-12">
                                 <input type="text" className="  search-query form-control" placeholder="Name,type" id="search" onChange={(e)=>this.handleSearchChange(e)} value={this.state.searchString}/>
                              <span className="input-group-btn">
                              <button onClick={(e)=>this.getVehiclesTypeData()} className="btn btn-default" type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
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
                            <th>Type</th>
                            <th>Name</th>
                            
                            <th>Size1</th>
                            <th>Size2</th>
                            <th>Size3</th>
                            <th>VariableCost</th>
                            <th>WaitingTimeCost</th>

                            <th>Status</th>
                            
                          </tr>
                        </thead>
                        <tbody>
                        {
                          this.state.isVehiclesTypesData?this.state.isVehiclesTypesData.map((vehicleType,index)=>{
                            return(
                                <tr>
                                <td>{vehicleType.vehicleTypeId}</td>
                                <td>{vehicleType.name}</td>
                               
                                <td>{vehicleType.loadingCapacities.size1}</td>
                                <td>{vehicleType.loadingCapacities.size2}</td>
                                <td>{vehicleType.loadingCapacities.size3}</td>
                               
                                
                                <td>{vehicleType.variableCost}</td>
                                <td>{vehicleType.waitingTimeCost}</td>
                                <td>{vehicleType.status}</td>

                                </tr>
                            )

                          }):"No data  found"
                        }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {this.state.modalIsOpen ?
              <AddVehicleTypeForm
                modalIsOpen={this.state.modalIsOpen}
                closeModal={(e)=>this.closeVehicleTypeModal()}
              /> : ""}
        </div>
      )
  }
}

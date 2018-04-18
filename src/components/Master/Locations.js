
import React, {Component} from 'react';
import ReactFileReader from 'react-file-reader';
import Pagination from 'react-js-pagination';
import {CSVLink} from 'react-csv';
// import {importLocations, getLocationsData, deleteLocation,SOCKET} from './../../services/Api';
import {SOCKET} from './../../services/Api';
import DeletePopUp from './../ModalPopUp/DeletePopUp';


const csvData =[
['accountId', 'serviceLocationId', 'regionId',  'zoneId',  'description', 'locationPriority',  'accountTypeId', 'locationType',  'location/makani', 'location/lat',   'location/lng', 'deliveryDays',  'serviceTimeTypeId', 'timeWindowTypeId',  'address1',  'address2',  'phone', 'city',  'county',  'state', 'country', 'zipcode', 'imageUrl',  'contact/name',  'contact/phone', 'contact/email', 'status',  'createdBy', 'createdDate', 'updatedBy', 'updateDate']
]
export default class Locations extends Component{
  constructor(props) {
    super(props);
      this.state = {
        isLocationData: [],
        activePage:1,
        totalItemsCount:0,
        vehicleId: '',
        isDeleteButton: false,
        modalIsOpen: true,
        isDeleteActive: true,
        deleteMessage: 'Do you want to delete it?',
        searchString:''
      }
  }
  componentDidMount() {
        this.getLocationsData();
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
        // importLocations(files).then((response)=>{
        //   console.log(response,"responseresponse")
        //   if(response.status === 200){
        //     this.getLocationsData()
        //   }
        // }).catch((error)=>{
        //   console.log(error);
        // })
        SOCKET.emit('location::create',{file:files},(error,response)=>{
          if(!error){
            this.getLocationsData()
          }else{
            alert(error.message)
          }
        })
      }
     }else{
      console.log("Empty file")
     }
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
    this.setState({
      ...this.state,
      ...this.setDefaultState()
    })
  }
  handleConfirmDelete = () => {
    this.deleteLocation(this.state.vehicleId)
  }

  deleteLocation = (serviceLocationId) =>{
    // deleteLocation(serviceLocationId).then((response)=>{
    //   console.log(response,response.status)
    //   if(response.status === 200){
    //     this.getLocationsData()
    //   }
    // }).catch((error)=>{
    //   alert(error);
    // })
    SOCKET.emit('location::remove',null,{serviceLocationId:serviceLocationId},(error,response)=>{
      if(!error){
        this.getLocationsData()
      }else{
        alert(error.message)
      }
    })
    SOCKET.on('location removed',(location)=>{
      this.setState({
         deleteMessage: "Vehicle is deleted successfully!",
         isDeleteActive: false
       })
    })

  }
  getLocationsData = () => {
    try{

        let skip = this.state.activePage?(this.state.activePage-1)*10:this.state.activePage;
        let queryObj = {skip:skip,limit:10};
        if(this.state.searchString){
          queryObj.searchString = this.state.searchString
        }
        // getLocationsData(queryObj).then((response)=>{
        // 	console.log("responseresponseresponseresponse",response)
        //     if(response.status === 200){
        //       if(response.body.data && response.body.data.length){

        //         this.setState({
        //             isLocationData : response.body.data,
        //             totalItemsCount:response.body.total
        //         })
        //       }
        //     }else{
        //       alert("Data not found")
        //     }
        //   }).catch((error)=>{
        //     console.log(error)
        //     alert(error)
        //   })
        SOCKET.emit('location::find',queryObj,(error,response)=>{
            if(error){
                alert(error.message)
            }else{
                this.setState({
                    isLocationData : response.data,
                    totalItemsCount:response.total
                })
            }
        })
        }catch(error){
          alert("Check server error");
        }
  }
  handlePageChange=(pageNumber)=> {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
    this.getLocationsData()

  }
  handleSearchChange = (e) =>{
    if (e.target.id === 'search') {
      this.setState({
        searchString:e.target.value
      })
      if(!e.target.value){
        this.getLocationsData()
      }
     } 

  }
  render(){
    return(
        <div className="content-wrapper">

            <section className="content-header">
              <h1 className="float-left"> Location Master </h1>
              <div className="import-tools-block">
                <li><a><i className="fa fa-download"></i></a><CSVLink data={csvData} >Download Sample CSV</CSVLink></li>
                <li>
                  <ReactFileReader fileTypes={[".csv"]} base64={true} multipleFiles={true} handleFiles={this.handleFiles}>
                    <a className="btn btn-warning">Import CSV</a>
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

                        <h3 className="box-title">Locations</h3>
                      </div>
                      <div className="col-xs-4">
                        <div className="col-xs-12">
                          <div id="custom-search-input">
                            <div className="input-group col-md-12">
                            <input type="text" className="  search-query form-control" placeholder="ServiceLocationId,RegionId,Description,LocationType" id="search" onChange={(e)=>this.handleSearchChange(e)} value={this.state.searchString}/>
                              <span className="input-group-btn">
                              <button onClick={(e)=>this.getLocationsData()} className="btn btn-default" type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
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
                            <th>ServiceLocationId</th>
                            <th>RegionId</th>
                            <th>zoneId</th>
                            <th>Description</th>
                            <th>AccountTypeId</th>
                            <th>LocationType</th>
                            <th>Address1</th>
                            <th>Address2</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                        {this.state.totalItemsCount?
                            this.state.isLocationData.map((location, index) => {
                              return (
                                <tr key={index} >
                                  <td>{location.serviceLocationId}</td>
                                  <td>{location.regionId}</td>
                                  <td>{location.zoneId}</td>
                                  <td>{location.description}</td>
                                  <td>{location.accountTypeId}</td>
                                  <td>{location.locationType}</td>
                                  <td>{location.address1}</td>
                                  <td>{location.address2}</td>

                                  <td>
                                   
                                    <a onClick={(e)=>this.openDeletePopUp(location.serviceLocationId)} ><i className="fa fa-trash"></i></a>
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


import React, {Component} from 'react';
import ReactFileReader from 'react-file-reader';
import Pagination from 'react-js-pagination';
import {CSVLink} from 'react-csv';
// import {importRegions, getRegionsData, deleteRegion,SOCKET} from './../../services/Api';
import {SOCKET} from './../../services/Api';


const csvData =[
  ['accountId', 'description', 'baseLoadingSize', 'convertedLoadingSize', 'size1alias', 'size2alias', 'size3alias', 'status']
];
export default class Region extends Component{
  constructor(props) {
    super(props);
      this.state = {
        isRegionData: [],
        activePage:1,
        totalItemsCount:0,
        searchString:''
      }
  }
  componentDidMount() {
        this.getRegionsData();
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
        // importRegions(files).then((response)=>{
        //   console.log(response,"responseresponse")
        //   if(response.status === 200){
        //     this.getRegionsData()
        //   }
        // }).catch((error)=>{
        //   console.log(error);
        // })
        SOCKET.emit('region::create',{file:files},(error,response)=>{
          if(!error){
             this.getRegionsData()
          }else{
            alert(error.message);
          }
        })
      }
     }else{
      console.log("Empty file")
     }
  }
  deleteReg = (regionId) =>{
    console.log("regionId == ",regionId)
    // deleteRegion(regionId).then((response)=>{
    //   console.log(response,response.status)
    //   if(response.status === 200){
    //     this.getRegionsData()
    //   }
    // }).catch((error)=>{
    //   alert(error);
    // })
    SOCKET.emit('region::remove',null,{regionId:regionId},(error,response)=>{
      if(!error){
        this.getRegionsData()
      }else{
        alert(error.message)
      }
    })

  }
  getRegionsData = () => {
    try{

        let skip = this.state.activePage?(this.state.activePage-1)*10:this.state.activePage;
        console.log(skip,this.state.activePage)
        let queryObj ={skip:skip,limit:10};
        if(this.state.searchString){
          queryObj.searchString = this.state.searchString
        }
        // getRegionsData(queryObj).then((response)=>{
        // 	console.log("responseresponseresponseresponse",response)
        //     if(response.status === 200){
        //       if(response.body.data && response.body.data.length){

        //         this.setState({
        //             isRegionData : response.body.data,
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
        SOCKET.emit('region::find',queryObj,(error,response)=>{
            if(!error){
                this.setState({
                    isRegionData : response.data,
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
    this.getRegionsData()

  }
  handleSearchChange = (e) =>{
    if (e.target.id === 'search') {
      this.setState({
        searchString:e.target.value
      })
      if(!e.target.value){
        this.getRegionsData()
      }
     } 

  }
  render(){
    console.log(this.state.isRegionData)
    return(
        <div className="content-wrapper">

            <section className="content-header">
              <h1 className="float-left"> Region Master </h1>
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
                        <h3 className="box-title">Regions</h3>
                      </div>
                      <div className="col-xs-4">
                        <div className="col-xs-12">
                          <div id="custom-search-input">
                            <div className="input-group col-md-12">
                              <input type="text" className="  search-query form-control" placeholder="RegionId,Description,baseLoadingSize" id="search" onChange={(e)=>this.handleSearchChange(e)} value={this.state.searchString}/>
                              <span className="input-group-btn">
                              <button onClick={(e)=>this.getRegionsData()} className="btn btn-default" type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
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
                            <th>RegionId</th>
                            <th>Description</th>
                            <th>BaseLoadingSize</th>
                            <th>ConvertedLoadingSize</th>
                            <th>Size1alias</th>
                            <th>Size2alias</th>
                            <th>Size3alias</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                        {this.state.totalItemsCount?
                            this.state.isRegionData.map((region, index) => {
                              return (
                                <tr key={index} >
                                  <td>{region.regionId}</td>
                                  <td>{region.description}</td>
                                  <td>{region.baseLoadingSize}</td>
                                  <td>{region.convertedLoadingSize}</td>
                                  <td>{region.size1alias}</td>
                                  <td>{region.size2alias}</td>
                                  <td>{region.size3alias}</td>
                                  <td>{region.status}</td>
                                  <td>
                                    
                                    <a  onClick={(e)=>this.deleteReg(region.regionId)} ><i className="fa fa-trash"></i></a>
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

import React, {Component} from 'react';
import Modal from 'react-modal';
import {openModalStyles, exportEmail, exportPassword} from './../Utils';
import {SOCKET} from './../../services/Api';
import {driverModalStyles} from './../Utils';

export default class AddDriverForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:"",
      lastName:"88",
      type:"",
      email:"",
      assignedVehicleId:"",
      mobile:"",
      licenseNumber:"",
      password:"",
      regularHours: "",
     regularRates:  "",    
     overtimeRates:  "",    
     distanceRate:  "",    
     stopRate:  "",
     workerStatus:"",
     isDisable:false,
     vehicleIds:[]
    }
  }
  afterOpenModal() {
    if(this.props.driverData){
        console.log("yes driver exist",this.props.driverData)
        this.setState({
            ...this.props.driverData,
            isDisable:true
        })
    }
    
  }
  closeModal() {
    this.props.closeModal()
  }
  componentWillUnMount() {
    console.log("unmount")
  }
  componentDidMount(){
    SOCKET.emit('vehicles::find',{isDriver:true},(error,response)=>{
        if(error){
          console.log(error,"errorerrorerror")
            alert(error.message)
        }else{
          console.log(" response === ",response)
            this.setState({
              vehicleIds:response.data
            })
            
        }
    })
  }
  createDriver = (isEdit) =>{
    console.log("createDriver call")
    if(!isEdit){
        if(!this.state.name){
            console.log(1)
            return false;
        }
        if(!this.state.type){
            console.log(2)
            return false;
        }
        if(!this.state.assignedVehicleId){
            console.log(3)
            return false;
        }
        if(!this.state.licenseNumber){
            console.log(4)
            return false;
        }
        if(!this.state.mobile){
            console.log(5)
            return false;
        }
        console.log(6,this.state.mobile<1,this.state.mobile.length)
        if(this.state.mobile.length!=10 || this.state.mobile<1) {
            alert("mobile no should be 10 digit or not negative ")
            return false;
        }
        if(!this.state.email){
            console.log(7)
            return false;
        }
        console.log("final3")
        if(!exportEmail(this.state.email)){
             console.log(8)
            alert("Invalid email")
            return false;
        }
        console.log("final2")
        if(!this.state.password){
             console.log(9)
            return false;
        }
        console.log("final1")
        if(!exportPassword(this.state.password)){
             console.log(10)
            alert("Password should be minimum one { lowercase, uppercase, special } character and it should be eight character')");
            return false;
        }
        console.log("final",localStorage.token)
        var workerData = this.state;
        workerData.firstName = this.state.name;
        workerData.phone = this.state.mobile;
        workerData.authorization = localStorage.token;
        SOCKET.emit('workers::create',workerData,(error,response)=>{
            if(error){
                alert(error.message)
            }else{
                console.log(response)
                alert("Succesfully driver created");
                this.props.closeModal()
                this.props.getDriversData()
                
            }
        })
    }else{
        if(!this.state.workerStatus){
            return false;
        }
        var workerData = {
            workerStatus:this.state.workerStatus
        }
        //workerData.authorization = localStorage.token;
        SOCKET.emit('workers::patch',null,{workerId:this.props.driverData.workerId},workerData,(error,response)=>{
            if(error){
                alert(error.message)
            }else{
                console.log(response)
                alert("Succesfully driver updated");
                this.props.closeModal()
                this.props.getDriversData()
                
            }
        })
    }
    
    
  }
  handleChange = (e) =>{
    console.log(e.target.id ,e.target.id === 'name' )
    if (e.target.id === 'workerStatus') {

      this.setState({
        workerStatus: e.target.value
      });
    }
    if (e.target.id === 'name') {

      this.setState({
        name: e.target.value
      });
    }
    if (e.target.id === 'type') {
      this.setState({
        type: e.target.value
      });
    }
    if (e.target.id === 'mobile') {
      this.setState({
        mobile: e.target.value
      });
    }
    if (e.target.id === 'assignedVehicleId') {
      this.setState({
        assignedVehicleId: e.target.value
      });
    }
    if (e.target.id === 'licenseNumber') {
      this.setState({
        licenseNumber: e.target.value
      });
    }
    if (e.target.id === 'stopRate') {
      this.setState({
        stopRate: e.target.value
      });
    }
    if (e.target.id === 'distanceRate') {
      this.setState({
        distanceRate: e.target.value
      });
    }
    if (e.target.id === 'regularHours') {
      this.setState({
        regularHours: e.target.value
      });
    }
    if (e.target.id === 'regularRates') {
      this.setState({
        regularRates: e.target.value
      });
    }
    if (e.target.id === 'overtimeRates') {
      this.setState({
        overtimeRates: e.target.value
      });
    }
    
    if (e.target.id === 'email') {
      this.setState({
        email: e.target.value
      });
    }
    if (e.target.id === 'password') {
      this.setState({
        password: e.target.value
      });
    }
  }
  handleFormSubmit(e) {
    e.preventDefault();
  }
  render() {
    var isDisable = this.state.isDisable?"disable":""
    return(
      <div>
        <Modal
          isOpen={this.props.modalIsOpen}
          onAfterOpen={(e) => this.afterOpenModal()}
          onRequestClose={(e) => this.closeModal()}
          style={driverModalStyles}
          contentLabel="Modal"
        >
          <div className="driver-form">
            <form id="contact" onSubmit={this.handleFormSubmit}>
              <div className="close-modal">
                <span onClick={(e)=>this.closeModal()}>&times;</span>
              </div>
              <h3>Driver Form</h3>
              <fieldset>
                <input placeholder="name"  disabled={this.state.isDisable} id="name" value={this.state.name} onChange={(e)=>this.handleChange(e)}  type="text" tabIndex="1" required autoFocus />
              </fieldset>
              <fieldset>
                <input placeholder="Type" disabled={this.state.isDisable} id="type" onChange={(e)=>this.handleChange(e)} type="text" value={this.state.type} tabIndex="2" required />
              </fieldset>
              <fieldset>
                <input disabled={this.state.isDisable} placeholder="mobile Number" onChange={(e)=>this.handleChange(e)} id="mobile" value={this.state.mobile} type="number" tabIndex="3" required />
              </fieldset>
              <fieldset>
                <input disabled={this.state.isDisable} placeholder="Email id" id="email" onChange={(e)=>this.handleChange(e)} value={this.state.email} type="email" tabIndex="4" required />
              </fieldset>
              <fieldset>
                <input disabled={this.state.isDisable} placeholder="Licence no" id="licenseNumber" onChange={(e)=>this.handleChange(e)} value={this.state.licenseNumber} type="text" tabIndex="4" required />
              </fieldset>
               <fieldset>
                <input disabled={this.state.isDisable} placeholder="Regular Hours" id="regularHours" onChange={(e)=>this.handleChange(e)} value={this.state.regularHours} type="text" tabIndex="4" required />
              </fieldset>
               <fieldset>
                <input disabled={this.state.isDisable} placeholder="Regular Rates" id="regularRates" onChange={(e)=>this.handleChange(e)} value={this.state.regularRates} type="text" tabIndex="4" required />
              </fieldset>
               <fieldset>
                <input disabled={this.state.isDisable} placeholder="Overtime Rates" id="overtimeRates" onChange={(e)=>this.handleChange(e)} value={this.state.overtimeRates} type="text" tabIndex="4" required />
              </fieldset>
               <fieldset>
                <input disabled={this.state.isDisable} placeholder="Distance Rate" id="distanceRate" onChange={(e)=>this.handleChange(e)} value={this.state.distanceRate} type="text" tabIndex="4" required />
              </fieldset>
               <fieldset>
                <input disabled={this.state.isDisable} placeholder="Stop Rate" id="stopRate" onChange={(e)=>this.handleChange(e)} value={this.state.stopRate} type="text" tabIndex="4" required />
              </fieldset>
              <fieldset>
                <input disabled={this.state.isDisable} placeholder="Vehicle Id" id="assignedVehicleId" onChange={(e)=>this.handleChange(e)} value={this.state.assignedVehicleId} type="text" tabIndex="4" required />
                 <select id="assignedVehicleId" value={this.state.assignedVehicleId} onChange={(e)=>this.handleChange(e)}>
                  {this.state.vehicleIds.map((vehicleId)=>{
                    return  <option key={vehicleId} value="vehicleId">{vehicleId}</option>
                  })}
                </select>
              </fieldset>
              {this.state.isDisable?
              <fieldset>
               {/* <input placeholder="workerStatus" id="workerStatus" onChange={(e)=>this.handleChange(e)} value={this.state.workerStatus} type="text" tabIndex="4" required />*/}
               <select id="workerStatus" value={this.state.workerStatus} onChange={(e)=>this.handleChange(e)}>
                  
                  <option value="AVAILABLE">AVAILABLE</option>
                  <option value="ASSIGNED">ASSIGNED</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
                
              </fieldset>:
              <fieldset>
                <input placeholder="Password" id="password" onChange={(e)=>this.handleChange(e)} value={this.state.password} type="password" tabIndex="4" required />
              </fieldset>}

              <fieldset>
                <button name="submit" onClick={(e)=>this.createDriver(this.state.isDisable)} type="submit">Submit</button>
              </fieldset>
            </form>
          </div>
        </Modal>
      </div>
    )
  }
}

import React, {Component} from 'react';
import Modal from 'react-modal';
import {driverModalStyles} from './../Utils';
import {SOCKET} from './../../services/Api';

export default class AddVehicleTypeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:"",
      VehicleTypeId:"",
      vehicleCapacityDimension:{
        length:"",
        height:"",
        weight:"",
        breadth:"",
      },
      loadingCapacities:{
        size1:"",
        size2:"",
        size3: ""
      },
     fixedCost:  "",    
     variableCost:  "",    
     travelTimeAdjuster:  "",    
     maxSpeed:  "",
     waitingTimeCost:"",
     isDisable:false
    }
  }
  afterOpenModal() {
  }
  closeModal() {
    this.props.closeModal()
  }
  componentWillUnMount() {
    console.log("unmount")
  }
  createVehiclesType = (isEdit) =>{
    console.log("createVehiclesType call")
    if(!isEdit){
        if(!this.state.name){
            console.log(1)
            return false;
        }
        if(!this.state.vehicleTypeId){
            console.log(2)
            return false;
        }
        console.log(this.state.vehicleCapacityDimension.length)
        if(!this.state.vehicleCapacityDimension.length){
            console.log(this.state.vehicleCapacityDimension.length)
            console.log(3)
            return false;
        }
        if(this.state.vehicleCapacityDimension.length<1){
            alert("Length should not be negative")
        }
        if(!this.state.vehicleCapacityDimension.height){
            console.log(this.state.vehicleCapacityDimension.height)
            console.log(4)
            return false;
        }
        if(this.state.vehicleCapacityDimension.height<1){
            alert("Height should not be negative")
        }
        if(!this.state.vehicleCapacityDimension.weight){
            console.log(this.state.vehicleCapacityDimension.weight)
            console.log(5)
            return false;
        }
        if(this.state.vehicleCapacityDimension.weight<1){
            alert("Weight should not be negative")
        }
        if(!this.state.vehicleCapacityDimension.breadth){
            console.log(this.state.vehicleCapacityDimension.breadth)
            console.log(6)
            return false;
        }
        if(this.state.vehicleCapacityDimension.breadth<1){
            alert("Breadth should not be negative")
        }
        if(!this.state.loadingCapacities.size1){
            console.log(this.state.loadingCapacities.size1,7)
            return false;
        }
        if(this.state.loadingCapacities.size1<1){
            alert("Size1 should not be negative")
            return false;
        }
        if(!this.state.loadingCapacities.size2){
            console.log(this.state.loadingCapacities.size2,8)
            return false;
        }
        if(this.state.loadingCapacities.size2<1){
            alert("Size2 should not be negative")
            return false;
        }
        if(!this.state.loadingCapacities.size3){
            return false;
        }
        if(this.state.loadingCapacities.size3<1){
            alert("Size3 should not be negative")
            return false;
        }
        if(!this.state.travelTimeAdjuster){
            return false;
        } 
        if(this.state.travelTimeAdjuster<1){
            alert("TravelTimeAdjuster should not be negative")
            return false;
        } 
        if(!this.state.fixedCost){
            return false;
        }
        if(this.state.fixedCost<1){
            alert("FixedCost should not be negative")
            return false;
        } 
        if(!this.state.variableCost){
            return false;
        }
         if(this.state.variableCost<1){
            alert("VariableCost should not be negative")
            return false;
        } 
        if(!this.state.waitingTimeCost){
            return false;
        }
        if(this.state.waitingTimeCost<1){
            alert("WaitingTimeCost should not be negative")
            return false;
        } 
        if(!this.state.maxSpeed){
            return false;
        }
        if(this.state.maxSpeed<1){
            alert("MaxSpeed should not be negative")
            return false;
        } 
        
       
        var vehicleType = this.state;
        vehicleType.authorization = localStorage.token;
        SOCKET.emit('vehicle-types::create',vehicleType,(error,response)=>{
            if(error){
                alert(error.message)
            }else{
                console.log(response)
                alert("Succesfully Vehicle-types created");
                this.props.closeModal()
                this.props.getDriversData()
                
            }
        })
    }else{
        if(!this.state.workerStatus){
            return false;
        }
        var vehicleType = {
            workerStatus:this.state.workerStatus
        }
        vehicleType.authorization = localStorage.token;
        SOCKET.emit('workers::patch',null,{workerId:this.props.driverData.workerId},vehicleType,(error,response)=>{
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
    console.log(e.target.id  )
    if (e.target.id === 'vehicleTypeId') {

      this.setState({
        vehicleTypeId: e.target.value
      });
    }
    if (e.target.id === 'name') {

      this.setState({
        name: e.target.value
      });
    }
    if (e.target.id === 'length') {
      this.setState({
        vehicleCapacityDimension:{
            length: e.target.value
        }
        
      });
    }
    if (e.target.id === 'height') {
      this.setState({
        vehicleCapacityDimension:{
            height: e.target.value
        }
      });
    }
     if (e.target.id === 'breadth') {
        console.log("yes ")
      this.setState({
        vehicleCapacityDimension:{
            breadth: e.target.value
        }
      });
    }
    if (e.target.id === 'weight') {
      this.setState({
        vehicleCapacityDimension:{
            weight: e.target.value
        }
      });
    }
    if (e.target.id === 'size1') {
      this.setState({
        loadingCapacities:{
            size1: e.target.value
        }
      });
    }
    if (e.target.id === 'size2') {
      this.setState({
        loadingCapacities:{
            size2: e.target.value
        }
      });
    }
    if (e.target.id === 'size3') {
      this.setState({
        loadingCapacities: {
            size3: e.target.value
        }
      });
    }
    if (e.target.id === 'fixedCost') {
      this.setState({
        fixedCost: e.target.value
      });
    }
    if (e.target.id === 'variableCost') {
      this.setState({
        variableCost: e.target.value
      });
    }
    if (e.target.id === 'maxSpeed') {
      this.setState({
        maxSpeed: e.target.value
      });
    }
    if (e.target.id === 'travelTimeAdjuster') {
      this.setState({
        travelTimeAdjuster: e.target.value
      });
    }
    
    if (e.target.id === 'waitingTimeCost') {
      this.setState({
        waitingTimeCost: e.target.value
      });
    }
    
  }
  handleFormSubmit(e) {
    e.preventDefault();
  }

  render() {
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
            <form id="contact" onSubmit={this.handleFormSubmit} >
              <div className="close-modal">
                <span onClick={(e)=>this.closeModal()}>&times;</span>
              </div>
              <h3>Vehicle Type Form</h3>
              <fieldset>
                <input placeholder="Name" value={this.state.name} onChange={(e)=>this.handleChange(e)}  id="name" type="text" tabIndex="1" required autoFocus />
              </fieldset>
              <fieldset>
                <input placeholder="VehicleTypeId" onChange={(e)=>this.handleChange(e)}  value={this.state.vehicleTypeId} id="vehicleTypeId" type="text" tabIndex="2" required />
              </fieldset>
              <fieldset>
                <input placeholder="vehicleCapacityDimension : length" onChange={(e)=>this.handleChange(e)}  value={this.state.vehicleCapacityDimension.length} type="number" tabIndex="3" id="length" required />
              </fieldset>
              <fieldset>
                <input placeholder="vehicleCapacityDimension : breadth " onChange={(e)=>this.handleChange(e)}  value={this.state.vehicleCapacityDimension.breadth} type="number" tabIndex="4" id="breadth" required />
              </fieldset>
              <fieldset>
                <input placeholder="VehicleCapacityDimension : weight" onChange={(e)=>this.handleChange(e)}  value={this.state.vehicleCapacityDimension.weight} type="number" tabIndex="4" id="weight" required />
              </fieldset>
               <fieldset>
                <input placeholder="VehicleCapacityDimension : height" onChange={(e)=>this.handleChange(e)}  value={this.state.vehicleCapacityDimension.height} type="number" tabIndex="4" id="height" required />
              </fieldset>
              <fieldset>
                <input placeholder="LoadingCapacities : SIZE1" value={this.state.loadingCapacities.size1} type="number" onChange={(e)=>this.handleChange(e)}  tabIndex="4" id="size1" required />
              </fieldset>
              <fieldset>
                <input placeholder="LoadingCapacities : SIZE2" value={this.state.loadingCapacities.size2} type="number" onChange={(e)=>this.handleChange(e)}  tabIndex="4" id="size2" required />
              </fieldset>
              <fieldset>
                <input placeholder="LoadingCapacities : SIZE3" value={this.state.loadingCapacities.size3} type="number" onChange={(e)=>this.handleChange(e)}  tabIndex="4" id="size3" required />
              </fieldset>
              <fieldset>
                <input placeholder="TravelTimeAdjuster" onChange={(e)=>this.handleChange(e)}  value={this.state.travelTimeAdjuster} id="travelTimeAdjuster"   type="number" tabIndex="4" required />
              </fieldset>
               <fieldset>
                <input placeholder="MaxSpeed" type="number" onChange={(e)=>this.handleChange(e)}  value={this.state.maxSpeed} tabIndex="4" id="maxSpeed" required />
              </fieldset>
              <fieldset>
                <input placeholder="FixedCost" onChange={(e)=>this.handleChange(e)}  value={this.state.fixedCost} type="number" tabIndex="4" id="fixedCost" required />
              </fieldset>
              <fieldset>
                <input placeholder="VariableCost" onChange={(e)=>this.handleChange(e)}  value={this.state.variableCost} id="variableCost" type="number" tabIndex="4" required />
              </fieldset>
              <fieldset>
                <input placeholder="WaitingTimeCost" onChange={(e)=>this.handleChange(e)}  value={this.state.waitingTimeCost}  id="waitingTimeCost" type="number" tabIndex="4" required />
              </fieldset>
              <fieldset>
                <button name="submit" onClick={(e)=>this.createVehiclesType(this.state.isDisable)} type="submit">Submit</button>
              </fieldset>
            </form>
          </div>
        </Modal>
      </div>
    )
  }
}

import React, { Component } from 'react';
import './App.css';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import superagent from 'superagent';
import {BASE_URL,SOCKET} from './services/Api';
import {getISODate, modalStyles, getFieldError} from './components/Utils';
// import Router from './components/Router';
import IRouteHeader from './components/IRouteHeader';
import IRouteMasterPage from './components/Master/IRouteMasterPage';



export default class AppRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: true,
      signInUserEmail: '',
      signInUserPassword: '',
      signInError: '',
      isActive: false,
      isScoreData:false,
      isRoutePage:false,
      ordersPickDate: new Date()
    }
  }

  afterOpenModal(){
  }
  closeModal() {
  }

  // isValidUser() {
  //   var authToken = localStorage.token || "invalidtoken";
  //   var baseUrl = authToken.split('.')[1] || "invalidurl";
  //   var base = baseUrl.replace('-', '+').replace('_', '/');
  //   try {
  //     var decodeToken = JSON.parse(window.atob(base));
  //     if (decodeToken.exp > Date.now()/1000) {
  //       return decodeToken.username ? decodeToken.username : "User";
  //     }
  //     else return false
  //   } catch (err) {
  //     return false;
  //   }
  // }
  handleFormSubmit(e) {
    e.preventDefault();
  }
  handleFieldChange(e) {
    if (e.target.id === 'signin-user') {
      this.setState({
        signInUserEmail: e.target.value,
        signInError: ""
      });
    }
    if (e.target.id === 'signin-pwd') {
      this.setState({
        signInUserPassword: e.target.value,
        signInError: ""
      });
    }
  }
  handleSignInPasswordIcon() {
    if (this.refs.signinpwdref.type==="password") {
      this.refs.signinpwdref.type="text";
      this.refs.signiniconref.className="password-icon fa fa-fw field-icon fa-eye";
    } else {
      this.refs.signinpwdref.type="password";
      this.refs.signiniconref.className="password-icon fa fa-fw field-icon fa-eye-slash";
    }
  }
  handleSignInSubmit() {
    let signInData = {
      strategy: "local",
      emailId: this.state.signInUserEmail,
      password: this.state.signInUserPassword
    }
    if (this.state.signInUserEmail==="" || this.state.signInUserPassword==="") {
      this.setState({signInError: "Please enter valid Email and Password"})
    } else {
      console.log(signInData,"data")
      superagent
      .post(this.props.iroute_signin_service)
      .send(signInData)
      .end((err, response) => {
         console.log(response,"log")
        if (response !== undefined)
         {
           localStorage.setItem('username',response.body.data.emailId)
           window.location.reload()

            // if ("token" in response.body.data) {
            //   localStorage.token = response.body.data.token;
            //   this.setState({modalIsOpen: false})
            //   window.location.reload()
            // } else {
            //   this.setState({signInError: response.body.message})
            // }
        }
        else
        {
          this.setState({signInError: "Something went wrong"})
        }
      })
    }
  }
  handleSignOut() {
    localStorage.removeItem('username')
    window.location.reload();
  }
  handleMagicWand() {
    console.log("handle magic wand")
    this.setState({isActive: true})
  }
  getSocreData(){
    console.log("getSocreData call in header")
    this.setState({isScoreData: true})
  }
  setHeaderIcon(){
    if(window.location.pathname == '/routesmap'){
      this.setState({
        isRoutePage:true
      })
    }else{
      this.setState({
        isRoutePage:false
      })
    }
    
  }
  setDatePicker(date) {
    console.log("set date picker",date)
    this.setState({ordersPickDate: date})
  }
  render() {
    var isAuthenticatedUser = localStorage.getItem('username');
    console.log(isAuthenticatedUser)
    
    return (
      <div>
        {(() => {
          if (typeof(Storage) !== undefined) {
            if (isAuthenticatedUser == null) {
              return (
                <div>
                  <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={(e) => this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={modalStyles}
                    contentLabel="Modal"
                  >
                    <div>
                      <h4 className="signin-heading">Please Sign In to continue</h4>
                      <form className="sign-in-form" onSubmit={this.handleFormSubmit}>
                        <div className="form-group">
                          <input type="email" className="form-control" name="signinuser" id="signin-user"
                            value={this.state.signInUserEmail}
                            onChange={(e) => this.handleFieldChange(e)} placeholder="Email" />
                        </div>
                        <div className="form-group display-flex input-password">
                          <input ref="signinpwdref" type="password" className="form-control" name="signinpwd" id="signin-pwd"
                            value={this.state.signInUserPassword}
                            onChange={(e) => this.handleFieldChange(e)} placeholder="Password" />
                          <span ref="signiniconref" className="password-icon fa fa-fw field-icon fa-eye-slash"
                            onClick={(e) => this.handleSignInPasswordIcon()}>
                          </span>
                        </div>
                        <p className="clearfix"></p>
                        <div className="text-center">
                          <button type="submit" value="Submit" className="save-button"
                            onClick={(e)=>this.handleSignInSubmit()}>
                            Sign In
                          </button>
                        </div>
                        <span className="text-center well-sm">{getFieldError(this.state.signInError)}</span>
                      </form>
                    </div>
                  </Modal>
                </div>
              )
            } else {
              return (
                <div>
                  {/*<IRouteHeader
                    handleSignOut={(e) => this.handleSignOut()}
                    handleMagicWand={(e) => this.handleMagicWand()}
                  />*/}
                  <IRouteHeader
                    handleMagicWa nd={(e) => this.handleMagicWand()}
                    socreCradData = {(e)=>this.getSocreData()}
                    setDatePicker={(e)=>this.setDatePicker(e)}
                    DateValue={this.state.ordersPickDate}
                    isRoutePage = {this.state.isRoutePage}
                  />
                  {/*<Router isMagicWand={this.state.isActive}/>*/}
                  <IRouteMasterPage
                    handleSignOut={(e) => this.handleSignOut()}
                    userName={isAuthenticatedUser}
                    isMagicWand={this.state.isActive}
                    scoreData = {this.state.isScoreData}
                    ordersPickDate={this.state.ordersPickDate}
                    setHeaderIcon = {(e)=>this.setHeaderIcon()}
                  />
                </div>
              )
            }
          }
        })()}
      </div>
    )
  }
}

AppRoutes.propTypes = {
  iroute_signin_service: PropTypes.string
}

AppRoutes.defaultProps = {
  iroute_signin_service: BASE_URL+'login'
}

import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import IRouteLandingPage from './IRouteLandingPage';
import IRouteMasterPage from './Master/IRouteMasterPage';

export default class Router extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }
 IRouteLanding = ()=> {
      return (
        <IRouteLandingPage
        isMagicWand={this.props.isMagicWand}
      />)
  }
  IRouteMaster = ()=> {
      return (
        <IRouteMasterPage />
      )
   }
  render() {
    return(
      <div>
          <main>
            <Switch>
              {/*<Route exact path='/' component={this.IRouteLanding} />*/}
              <Route exact path='/' component={this.IRouteMaster} />
            </Switch>
          </main>
      </div>
    )
  }
}

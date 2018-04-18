import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'react-widgets/dist/css/react-widgets.css';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import AppRoutes from './AppRoutes';

ReactDOM.render((
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
), document.getElementById('iroute-root'));
registerServiceWorker();

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App'
import { Provider } from 'react-redux'
import './index.css'
import store from './Redux/store' ;
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
      <Provider store={store}>
        <App />
        <ToastContainer />
      </Provider>
      </BrowserRouter>
 </React.StrictMode>,
)

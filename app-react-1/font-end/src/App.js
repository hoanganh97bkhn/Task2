import React,{Component} from 'react';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home/Home';
import showDetail from './pages/showDetail/showDetail'
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import './App.css';
  

class App extends Component{
  constructor(props) {
    super(props);
  }
  
  render(){
    return(
      <div className="App">
        <BrowserRouter>
          <Route path='/' exact={true} render={() => {
            return (<Redirect to='/home' />);
          }} />
          <Route path='/home' component={Home} />
          <Route path='/show/:imageId' component={showDetail} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App
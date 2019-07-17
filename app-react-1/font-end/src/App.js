import React,{Component} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Header from'./components/Header';
import Box from './components/Box'
import Footer from './components/Footer'
import JumBotron from './components/JumBotron';
import OptionMenu from './components/OptionMenu';
import ThemesMenu from './components/helpers/Themes';
import Modals from './components/helpers/Modals';
import ModalsFile from './components/helpers/ModalsFile';
import {Badge} from 'reactstrap';
import {connect} from 'react-redux';
import './App.css';
  

class App extends Component{
  constructor(props) {
    super(props);
  }
  
  render(){
    return(
      <div className="App">
        <Header></Header>
        <ThemesMenu></ThemesMenu>
        {this.props.onSingIn ? <div className="container-fluid py-3"><Badge color="danger">Đăng nhập bằng tài khoản Admin</Badge></div> : null}
        <JumBotron></JumBotron>
        <OptionMenu></OptionMenu>
        <Box></Box>
        <Footer></Footer>
        <Modals></Modals>
        <ModalsFile></ModalsFile>
      </div>
    );
  }
}

const mapStatetoProps = (state)=>{
  return{
    onSingIn : state.singIn
  }
}

export default connect(mapStatetoProps,null)(App);

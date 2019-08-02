import React,{Component} from 'react';
import Header from './../../components/Header';
import JumBotron from './../../components/JumBotron';
import ThemesMenu from './../../components/helpers/Themes';
import Show from './../../components/showDetail';
import Footer from './../../components/Footer';
import ModalShow from './../../components/helpers/ModalShow'
import Modals from './../../components/helpers/Modals';
import {Badge} from 'reactstrap';
import {connect} from 'react-redux';
  

class showDetail extends Component{
  constructor(props) {
    super(props);
  }
  
  render(){
    return(
      <div>
        <Header></Header>
        <ThemesMenu></ThemesMenu>
        {this.props.onSingIn ? <div className="container-fluid py-3"><Badge color="danger">Đăng nhập bằng tài khoản Admin</Badge></div> : null}
        <JumBotron></JumBotron>
        <Show></Show>
        <Footer></Footer>
        <Modals></Modals>
        <ModalShow></ModalShow>
      </div>
    );
  }
}

const mapStatetoProps = (state)=>{
  return{
    onSingIn : state.singIn.status
  }
}

export default connect(mapStatetoProps,null)(showDetail);

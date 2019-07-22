import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions/index';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink} from 'reactstrap';
class OptionMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen : false,
        }
    }
    toggle = () => {
        this.setState ({
            isOpen : !this.state.isOpen
        })
    }
    toggleModalFiles = ()=>{
        const temp = -1;
        const title="Thêm danh sách";
        const url="upload-image";
        this.props.toggleModalFiles(temp,title,url);
      }

    render() {
        return (
            <div className="container themes-body">
                <Navbar light expand="md">
                    <NavbarBrand >Kho Giao Diện</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink onClick={this.props.showAll}>Tất cả</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={this.props.showModel}>Bán Chạy Nhất</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={this.props.showGood}>Đánh giá tốt nhất</NavLink>
                            </NavItem>
                            {this.props.onSingIn ?
                                (
                                <NavItem>
                                    <NavLink onClick={this.toggleModalFiles}>Thêm</NavLink>
                                </NavItem>
                                )    
                            : null}
                            {this.props.onSingIn ?
                                (
                                <NavItem>
                                    <NavLink onClick={this.props.delImage}>Xóa</NavLink>
                                </NavItem>
                                )    
                            : null}                   

                         </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        onSingIn : state.singIn
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
      showAll : () => {
        dispatch(actions.showAll())
      },
      showGood : () => {
        dispatch(actions.showGood())
      },
      showModel : () => {
        dispatch(actions.showModel())
      }, 
      toggleModalFiles : (index,title,url)=>{
        dispatch(actions.modalsFile(index,title,url))
      },
      delImage : () =>{
          dispatch(actions.delImage())
      }
    }
  }

  export default connect(mapStateToProps,mapDispatchToProps)(OptionMenu);
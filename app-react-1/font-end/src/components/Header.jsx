import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button,} from 'reactstrap';

import { connect } from 'react-redux';
import * as actions from './../actions/index';

class Header extends Component {
    constructor(props){
        super(props);
        this.state={
            isOpen : false,
            data : {
              id : "",
              pass : ""
            }
        }
    }

    toggle = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
    

    render() {
        return (
            <div className="container">
        <Navbar light expand="xl">
          <NavbarBrand href="/">
            <img src="https://sorano.vn/cloud/timthumb.php?src=https://sorano.vn/cloud/cdn/logo_sorano_chuan.png&amp;h=65&amp;w=187&amp;zc=1&amp;q=50" title="sorano" alt="sorano"></img>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mx-auto" navbar>
              <NavItem>
                <NavLink >Trang Chủ</NavLink>
              </NavItem>
              <NavItem>
                <NavLink >Giới Thiệu</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Dịch Vụ
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Dịch vụ 1
                  </DropdownItem>
                  <DropdownItem>
                    Dịch vụ 2
                  </DropdownItem>
                  <DropdownItem>
                    Dịch vụ
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle onClick={this.props.onToggle} nav caret>
                  Kho giao diện
                </DropdownToggle>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Nhận diện thương hiệu
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Thương hiệu 1
                  </DropdownItem>
                  <DropdownItem>
                    Thương hiệu 2
                  </DropdownItem>
                  <DropdownItem>
                    Thương hiệu 3
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <Button className="ml-xl-5 btn-trial" color="primary">Dùng Thử </Button>
              <Button onClick={this.props.toggleModal} className="ml-xl-3 btn-login" color="danger">Đăng Nhập</Button>
            </Nav>
          </Collapse>
        </Navbar>
        </div>
        );
    }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onToggle : () => {
      dispatch(actions.status())
    },
    toggleModal : ()=>{
      dispatch(actions.modals())
    }
  }
}
export default connect(null,mapDispatchToProps)(Header);
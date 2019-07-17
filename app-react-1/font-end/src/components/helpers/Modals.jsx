import React, { Component } from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter,Input,Button } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from './../../actions/index';

class Modals extends Component {
    constructor(props){
        super(props);
        this.state={
            data : {
              id : "",
              pass : ""
            }
        }
    }

    handleChangeId = (e) => {
        this.setState({
          data : {...this.state.data, id:e.target.value} 
        })
      }
  
    handleChangePass = (e) => {
        this.setState({
          data : {...this.state.data, pass:e.target.value} 
        })
      }

    handleSubmit = () => {
        this.props.handleSubmit(this.state.data)
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.isOpen}>
                    <ModalHeader toggle={this.toggleModal}>Đăng nhập</ModalHeader>
                    <ModalBody>
                      <p>Tên đăng nhập</p>
                      <Input placeholder="admin" onChange = {this.handleChangeId} type="text"></Input>
                      <p className="mt-3">Mật khẩu</p>
                      <Input placeholder="admin" onChange = {this.handleChangePass} type="password"></Input>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleSubmit}>Đăng nhập</Button>
                        <Button color="danger" onClick={this.props.toggleModal}>Hủy</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isOpen : state.modals
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        toggleModal : ()=>{
            dispatch(actions.modals())
        },
        handleSubmit : (data) => {
            dispatch(actions.callApiSingIn(data));
        }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Modals);
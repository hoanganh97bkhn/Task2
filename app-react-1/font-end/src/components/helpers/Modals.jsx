import React, { Component } from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter,Input,Button,Label,FormGroup,Form,FormFeedback } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from './../../actions/index';
import axios from 'axios';
import config from './../../config/index'

class Modals extends Component {
    constructor(props){
        super(props);
        this.state={
            dataLogin : {
                emailLogin : "",
                passLogin : "",
            },
            dataRegister : {
                emailRegister : "",
                passRegister : "",
            },
            openFormLogin : false,
            openFormRegister : false,
            rePass : "",
            valid : false,
            invalid : false,
        }
    }

    loginChangeEmail = (e) => {
        this.setState({
            dataLogin : {...this.state.dataLogin, emailLogin:e.target.value} 
        })
      }
  
    loginChangePass = (e) => {
        this.setState({
            dataLogin : {...this.state.dataLogin, passLogin:e.target.value} 
        })
      }
    
    registerChangeEmail = (e) => {
        this.setState({
            dataRegister : {...this.state.dataRegister, emailRegister: e.target.value}
        })
    }

    registerChangePass = (e) => {
        this.setState({
            dataRegister : {...this.state.dataRegister, passRegister: e.target.value}
        })
    }
    
    registerChangeRePass = (e) => {
        if(e.target.value === this.state.dataRegister.passRegister){
            this.setState({
                valid: true,
                invalid : false,
                rePass : e.target.value
            })
        }
        else {
            this.setState({
                valid: false,
                invalid : true,
                rePass : e.target.value
            })
        }
    }
    handleSubmitLogin = (e) => {
        e.preventDefault();
        this.props.handleSubmitLogin(this.state.dataLogin);
    }

    handleSubmitRegister = (e) => {
        e.preventDefault();
        this.props.handleSubmitRegister(this.state.dataRegister);
    }

    checkRePass = () => {

        if(this.state.dataRegister.passRegister != ""){
            if(this.state.rePass === this.state.dataRegister.passRegister){
                this.setState({
                    valid: true,
                    invalid : false,
                })
            }
            else {
                this.setState({
                    valid: false,
                    invalid : true,
                })
            }
        }
    }

    formLogin = () => {
        this.props.formChange();
        this.setState({
            openFormLogin : true,
            openFormRegister : false,
        })
    }
    formRegister = () => {
        this.setState({
            openFormLogin : false,
            openFormRegister : true,
        })
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.isOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.props.toggleModal}>Đăng nhập</ModalHeader>
                    <ModalBody>
                    <FormGroup  tag="fieldset">
                        <FormGroup check inline>
                            <Label className="radioCheck" check>
                            <Input onChange={this.formLogin} type="radio" name="radio" />{' '}
                                Đăng nhập
                            </Label>
                        </FormGroup>
                        <FormGroup check inline>
                            <Label className="radioCheck" check>
                            <Input onChange={this.formRegister} type="radio" name="radio" />{' '}
                                Đăng ký
                            </Label>
                        </FormGroup>
                    </FormGroup>
                    {this.state.openFormLogin ? (
                        <div>
                            <Form onSubmit={this.handleSubmitLogin}>
                                <Label for="inputEmail">Email</Label>
                                <Input placeholder="admin" id="inputEmail" onChange = {this.loginChangeEmail} type="email"></Input>
                                <Label for="inputPassword" className="mt-3">Mật khẩu</Label>
                                <Input placeholder="admin" id="inputPassword" onChange = {this.loginChangePass} type="password"></Input>
                                <div className="btn-submit mt-3">
                                    <input type="submit" className="btn btn-primary mx-2" value="Đăng nhập" />
                                    <Button color="danger" onClick={this.props.toggleModal}>Hủy</Button>
                                </div>
                            </Form>
                        </div>
                    ) : null}
                    {this.state.openFormRegister ? (
                        <div>
                            <Form onSubmit={this.handleSubmitRegister}>
                                {this.props.registerSuccess.length ? <div className="my-2 text-success">{this.props.registerSuccess}</div> : null}
                                <Label for="inputEmail">Email</Label>
                                <Input placeholder="admin" id="inputEmail" onChange = {this.registerChangeEmail} type="email"></Input>
                                <Label for="inputPassword" className="mt-3">Mật khẩu</Label>
                                <Input placeholder="admin" id="inputPassword" onChange = {this.registerChangePass} type="password"></Input>
                                <Label for="inputRePassword" className="mt-3">Nhập lại mật khẩu</Label>
                                <Input placeholder="admin" id="inputRePassword" onFocus={this.checkRePass} onChange = {this.registerChangeRePass} type="password" valid={this.state.valid} invalid={this.state.invalid}></Input>
                                <FormFeedback>Mật khẩu không chính xác</FormFeedback>
                                <FormFeedback valid>Đúng mật khẩu</FormFeedback>
                                <div className="btn-submit mt-3">
                                    <input type="submit" className="btn btn-primary mx-2" value="Đăng Ký" />
                                    <Button color="danger" onClick={this.props.toggleModal}>Hủy</Button>
                                </div>
                            </Form>
                        </div>
                    ) : null}
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isOpen : state.modals,
        registerSuccess : state.register
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        toggleModal : ()=>{
            dispatch(actions.modals())
        },
        handleSubmitLogin : (data) => {
            dispatch(actions.callApiSingIn(data));
        },
        handleSubmitRegister : (data) => {
            dispatch(actions.callApiRegister(data))
        },
        formChange : () => {
            dispatch(actions.formChange())
        }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Modals);

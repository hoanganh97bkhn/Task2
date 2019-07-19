import React, { Component } from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter,Input,Button,FormGroup,Label,Col } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from './../../actions/index'

class ModalShow extends Component {
    constructor(props){
        super(props);
    }
    clickSuccess = ()=>{
      let data = {
        name : this.props.name,
        description : this.props.description,
        author : this.props.author,
        price : this.props.price
      }
      this.props.toggleModal(data)
    }
    render() {
      console.log(this.props.data)
        return (
            <div>
                <Modal isOpen={this.props.isOpen}>
                    <ModalHeader toggle={this.toggleModal}>Thông tin chi tiết</ModalHeader>
                    <ModalBody >
                      <FormGroup row>
                        <Label sm={2}>Name : </Label>
                        <Label sm={10}>{this.props.name}</Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={3}>Description: </Label>
                        <Label sm={9}>{this.props.description}</Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Price : </Label>
                        <Label sm={10}>{this.props.price}</Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Author: </Label>
                        <Label sm ={10}>{this.props.author}</Label>
                      </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.clickSuccess}>Xong</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isOpen : state.openModalShow.status,
        name : state.openModalShow.name,
        description : state.openModalShow.description,
        author : state.openModalShow.author,
        price : state.openModalShow.price
    }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    toggleModal : (data) => {
      dispatch(actions.openModalShow(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalShow);
import React, { Component } from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter,Input,Button,FormGroup,Label,Col } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from './../../actions/index'

class ModalShow extends Component {
    constructor(props){
        super(props);
        this.state = {
          url : ''
        }
    }
    clickSuccess = ()=>{
      let data = {
        name : this.props.name,
        description : this.props.description,
        author : this.props.author,
        price : this.props.price,
        id : this.props.id,
      }
      this.props.toggleModal(data)
    }
    showDetail = () => {
      const url = ("/show/" + this.props.id);
      this.setState({
        url : url
      })
    }
    
    render() {
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
                        <Label sm={10}>{parseFloat(this.props.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')}</Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Author: </Label>
                        <Label sm ={10}>{this.props.author}</Label>
                      </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                      <a href={this.state.url}><Button color="success" onClick={(e)=>{this.showDetail()}}>Hiển thị chi tiết</Button></a>
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
        price : state.openModalShow.price,
        id : state.openModalShow.id,
    }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    toggleModal : (data) => {
      dispatch(actions.openModalShow(data))
    },
    showDetail : (id) => {
      dispatch(actions.openPageDetail(id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalShow);
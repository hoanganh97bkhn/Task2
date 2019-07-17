import React, { Component } from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter,Input,Button } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from './../../actions/index';


class ModalsFile extends Component {
    constructor(props){
        super(props);
        this.state = {
            fileimages : '',
            imagePreviewUrl : '',
        }
    }

    handeleFileChosen = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        
        e.preventDefault();
        reader.onloadend = () => {
            this.setState({
                fileimages: file,
                imagePreviewUrl:  reader.result
            });
          }
      
        if(file) reader.readAsDataURL(file);
    }

    handleSubmit = (e) => {
        let formData = new FormData();
        formData.append('file', this.state.fileimages, this.state.fileimages.name)
        formData.append('temp',this.props.temp);
        // formData.append('imagePreviewUrl',this.state.imagePreviewUrl);
        
        this.props.handleSubmit(formData,this.props.url,this.state.imagePreviewUrl);
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.isOpen}>
                    <ModalHeader toggle={this.toggleModal}>{this.props.title}</ModalHeader>
                    <ModalBody>
                      <Input type="file" onChange={this.handeleFileChosen}></Input>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" disabled={!this.state.fileimages} onClick={this.handleSubmit}>Upload</Button>
                        <Button color="danger" onClick={this.props.isToggleModalsFile}>Hủy</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isOpen : state.modalsFile.status,
        title : state.modalsFile.title,
        url : state.modalsFile.url,
        temp : state.modalsFile.temp,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        isToggleModalsFile : ()=>{
            dispatch(actions.modalsFile())
        },
        handleSubmit : (formData,url,imagePreviewUrl)=>{
            dispatch(actions.callApiUpload(formData,url,imagePreviewUrl));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalsFile);

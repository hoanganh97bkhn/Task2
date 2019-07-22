import React, { Component } from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter,Input,Button,FormGroup,Label,InputGroup,InputGroupAddon,Alert,ListGroup,ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from './../../actions/index';


class ModalsFile extends Component {
    constructor(props){
        super(props);
        this.state = {
            fileimages : '',
			imagePreviewUrl : '',
			name : '',
			description : '',
			price : '',
            author : '',
            listUtilities: [],
            inputUtilitiesValue : '',
            checkError : false,
            isOpen : false
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
		
		handleNameChange = (e) => {
			this.setState({
				name : e.target.value
			})
		}

		handleDescriptionChange = (e) => {
			this.setState({
				description : e.target.value
			})
		}

        handleUtilitiesChange = (e) => {
            this.setState({
                inputUtilitiesValue: e.target.value,
            })
        }

        toggleAddUtilities = () => {
            this.setState({
                isOpen : !this.state.isOpen
            })
        }

        addUtilities = (index) => {
            let value = this.state.inputUtilitiesValue;
            if(value !== ''){
                this.setState({
                    listUtilities : [...this.state.listUtilities, value],
                    checkError : false,
                    inputUtilitiesValue : ''
                })
            }
            else this.setState({
                checkError: true
            })
            
        }

        delUtilities = (index) => {
            this.setState({
                listUtilities: this.state.listUtilities.filter((todoitem, i) => {
                    if(index === i) return false;
                    else return true
                }),
            })
        }

		handlePriceChange = (e) => {
			this.setState({
				price : e.target.value
			})
		}

		handleAuthorChange = (e) => {
			this.setState({
				author : e.target.value
			})
		}

    handleSubmit = (e) => {
        let formData = new FormData();
        formData.append('file', this.state.fileimages, this.state.fileimages.name)
        formData.append('temp',this.props.temp);
		formData.append('name',this.state.name);
        formData.append('description',this.state.description);
        formData.append("utilities", this.state.listUtilities);
        formData.append('price',this.state.price);
        formData.append('author',this.state.author);
        this.props.handleSubmit(formData,this.props.url,this.state.imagePreviewUrl);
		}

    render() {
        return (
            <div>
                <Modal isOpen={this.props.isOpen}>
                    <ModalHeader toggle={this.toggleModal}>{this.props.title}</ModalHeader>
                    <ModalBody>
					    <FormGroup>
          				    <Label for="exampleName">Name</Label>
          					<Input type="text" name="text" onChange={this.handleNameChange} id="exampleName" placeholder="Name" />
        			    </FormGroup>
						<FormGroup>
          					<Label for="exampleDescription">Description</Label>
          					<Input type="textarea" name="text" onChange={this.handleDescriptionChange} id="exampleDescription" placeholder="Description" />
        				</FormGroup>
                        <FormGroup>
                            <Label for="exampleUtilities">Utilities</Label>
                            <br></br>
                            <Button color="primary" onClick={this.toggleAddUtilities}>+ Thêm tính năng</Button>
                            {this.state.isOpen ? 
                                <InputGroup className="mt-1">
                                    <Input type="text" name="Utilities" id="exampleUtilities" onChange={this.handleUtilitiesChange} placeholder="Utilities" value={this.state.inputUtilitiesValue}></Input>
                                    <InputGroupAddon className="mx-2" addonType="append"><Button color="success" onClick={this.addUtilities}>Add</Button></InputGroupAddon>
                                </InputGroup> : null
                            }
                            {this.state.listUtilities.length > 0 ? this.state.listUtilities.map((item, index) => {
                              return (
                                <ListGroup className="mt-3" key={index}>
                                    <div className = "row">
                                        <div className="col-10"><ListGroupItem >{item} </ListGroupItem></div>
                                        <div className="col-2"><Button className="mt-2" onClick={(e) => {this.delUtilities(index)}}>Xoa</Button></div>
                                    </div>
                                </ListGroup>
                              )
                            }) : null
                            }
                            {this.state.checkError ? 
                             <Alert className="my-2" color="danger">
                                This is a primary alert — check it out!
                             </Alert> : null}
                        </FormGroup>
						<FormGroup>
          					<Label for="examplePrice">Price (VND)</Label>
          					<Input type="number" name="number" min = {0} onChange={this.handlePriceChange} id="examplPrice" placeholder="Price" value={this.state.price}/>
        				</FormGroup>
						<FormGroup>
          					<Label for="exampleAuthor">Author</Label>
          					<Input type="text" name="text" min = {0} onChange={this.handleAuthorChange} id="exampleAuthor" placeholder="author" />
        					</FormGroup>
						<Label for="exampleFile">InputFile</Label>
                        <Input type="file" id="exampleFile" onChange={this.handeleFileChosen}></Input>	            
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" disabled={!(this.state.fileimages && this.state.name && this.state.description && this.state.price && this.state.author && this.state.listUtilities.length)} onClick={this.handleSubmit}>Upload</Button>
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

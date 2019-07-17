import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions/index';
import {FormGroup,Label,Input,Button} from 'reactstrap';
import config from './../config/index'
import axios from 'axios';
class Box extends Component {
    constructor(props){
        super(props);
        this.state={
          temp : 0,
          listDel : [],
          listData : [],
        }
    }

    componentWillMount(){
      axios({
        url: `${config.baseUrl}/api/get-all`,
        method: 'get'
        })
        .then((response) => {
            this.props.showData(response.data.data);
        })
        .catch((error) => {
            console.log(error)
        });
    }

    toggleModalFiles = (index)=>{
      const temp = index;
      const title="Sửa danh sách";
      const url="edit-image";
      this.props.toggleModalFiles(temp,title,url);
      this.setState({
        temp:index,
      })
    }

    ClickCheckDel = (index) => {
      if(this.state.listDel.indexOf(index) < 0){
        this.setState({
          listDel : [...this.state.listDel,index]
        })
      }
      else {
        this.setState({
          listDel : this.state.listDel.filter((item, i)=>{
            if(item === index) return false;
            else return true;
          })
        })
      }
    }

    handleDel = () => {
      this.props.handleDel(this.state.listDel);
      this.setState({
        listDel : []
      })
    }

    render() {
        return (
          <div className="themes container">
            {this.state.listDel.length > 0 ? <div style={{textAlign : "end"}}><Button color="danger" onClick={this.handleDel}>Xác nhận xóa {this.state.listDel.length} bài đăng</Button></div> : null}
          <div className="row">
            {this.props.dataRender.map((item,index) => (
              <div key={index} className="col-xl-3 col-lg-3 col-md-4 col-sm-6" >
                <div className="box">
                  <div className="img_prodcution">
                    {item.imagePreviewUrl != null ? <img src={`${item.imagePreviewUrl}`} title={`Mẫu giao diện ${index}`} alt={`Mẫu giao diện ${index}`}></img> : 
                                        <img src={`${config.baseUrl}/${item.imageUrl}`} title={`Mẫu giao diện ${index}`} alt={`Mẫu giao diện ${index}`}></img>
                    }
                  </div>
                <div className="view container btn-group-vertical" /*style={{display:  this.state.showStore === index ? 'block' : 'inline-flex' }}*/>
                  <button className="btn btn-danger d-block my-3 w-75 mx-auto">Xem DeMo</button>
                  <button className="btn btn-primary d-block w-75 mx-auto">Xem Chi Tiet</button>
                  {this.props.onSingIn ? <button className="btn btn-danger d-block mt-3 w-75 mx-auto" onClick={ (e) => {this.toggleModalFiles(index)}}>Sửa</button> : null}                  
                </div>
                {this.props.delImage ? 
                (
                <div className="check-delete">
                <FormGroup check>
                  <Label check>
                    <Input checked = {this.state.listDel.indexOf(index) >= 0} onChange={(e)=>{this.ClickCheckDel(index)}} type="checkbox" /> 
                      Check delete
                  </Label>
                </FormGroup>
                </div>
                ) : null }
                </div>
                <div><b>Mẫu Giao Diện {index+1}</b></div>
            </div>
              ))}
              
          </div>
          <div className="row justify-content-center my-5">
            <button className="btn btn-primary px-4 py-2">Xem Tất Cả Các Màu</button>
          </div>
        </div>
            
        );
    }
}

const mapStateToProps = (state) => {
  return {
    dataRender : state.sort,
    onSingIn : state.singIn,
    delImage : state.delImage
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    toggleModalFiles : (index,title,url)=>{
      dispatch(actions.modalsFile(index,title,url))
    },
    showData : (data) =>{
      dispatch(actions.showData(data))
    },
    handleDel : (data) => {
      dispatch(actions.handleDel(data))
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (Box);
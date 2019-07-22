import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions/index';
import {FormGroup,Label,Input,Button} from 'reactstrap';
import config from './../config/index'
import axios from 'axios';
class ThemesRelate extends Component {
    constructor(props){
        super(props);
        this.state={
          temp : 0,
        }
    }

    componentDidMount(){
      axios({
        url: `${config.baseUrl}/api/get-all`,
        method: 'get'
        })
        .then((response) => {
          const data = response.data.data.filter((item, index) => {
            if(Math.abs(item.id - this.props.id) <= 2) return true;
            return false
          });
            this.props.showData(data);
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
    onClickDetail = (item) => {
      this.props.openModalShow(item);
    }

    render() {
        return (
          <div className="themes container">
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
                  <button className="btn btn-primary d-block w-75 mx-auto" onClick={(e)=>{this.onClickDetail(item)}}>Xem Chi Tiet</button>
                </div>
                </div>
                <div ><b>Mẫu Giao Diện {index+1}</b></div>
                <div> <b>Name </b>: {item.name} </div>
                <div> <b>Author </b>: {item.author} </div>
                <div> <b>Price </b>: {parseFloat(item.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} VND </div>
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
    openModalShow : (item) => {
      dispatch(actions.openModalShow(item))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (ThemesRelate);

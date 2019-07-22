import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import config from './../config/index';
import ThemesRelate from './../components/ThemesRelate';

class showDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      price: "",
      author: "",
      utilities: [],
      imageUrl: "",
      id : 0,
    }
  }
  componentWillMount(){
    // get gameid
    const pathname = this.props.location.pathname;
    const imageId = pathname.split('/')[pathname.split('/').length - 1];

    // cal ajax
    axios({
      url: `${config.baseUrl}/api/images/${imageId}`,
      method: `get`,
    })
      .then((response) => {
        const data = response.data.data;
        this.setState({
         name : data.name,
         description : data.description,
         price : data.price,
         author : data.author,
         utilities : data.utilities.split(','),
         imageUrl : data.imageUrl,
         id : data.id
        });
      })
      .catch((error) => console.log(error));
  }
  render() {
    return (
      <div className="show_detail">
        <div className="container">
        <div className="row">
        <div className="col-xs-12 col-sm-5 col-md-5 col-lg-5">
          <h3 className="title">Giao diện {this.state.name}</h3>
          <p className="description">{this.state.description}.</p>
          <h4>Tính năng nổi bật của website</h4>
          {this.state.utilities.length > 0 ? this.state.utilities.map((item, index) => {
              return (
                <div key={index}><i className="fa fa-check"></i><p>{item}</p></div>
              )
          }) : null}
          <h3 className="support"> Bảo hành</h3>
            <ul>
              <li>Bảo hành website vĩnh viễn</li>
              <li>Hỗ trợ hướng dẫn quản trị trong suốt quá trình khách hàng sử dụng hosting.</li>
              <li>Bàn giao thông tin hosting, code lập trình website</li>
            </ul>
          <h5 className="price">Giá: {parseFloat(this.state.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} VND </h5>
          <div className="order"> 
            <a href="/"><button className="btn btn-primary">Xem các sản phẩm khác</button></a>
            <button className="btn btn-danger mx-3">Xem demo</button>
          </div>
        </div>
        <div className="col-xs-12 col-sm-7 col-md-7 col-lg-7">
            <div className="img_detail">
              <div className="img_desktop">
                <img src={`${config.baseUrl}/${this.state.imageUrl}`} title={"Giao diện "+this.state.name} alt={"Giao diện "+this.state.name}></img>
              </div>
            </div>
        </div>
        <div className="col-12">
            <h3 className="title_templet">Mẫu giao diện liên quan</h3>
        </div>
        </div>
        <ThemesRelate id = {this.state.id}></ThemesRelate>
        </div>
      </div>
    );
  }
}

export default withRouter (showDetail);
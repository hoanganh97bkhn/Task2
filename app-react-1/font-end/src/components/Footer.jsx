import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <div className="container-fluid">
  <footer>
    <div className="container">
    <div className="row description">
      <div className="col-md-3 col-sm-6">
        <h4 className="my-3">Thông tin liên hệ</h4>
        <p>Địa chỉ : Tầng 4, tòa nhà BigTower, <br></br> 23 Mỹ Đình, Cầu Giấy, Hầ Nội</p>
        <p>Email : info@sorano.com</p>
        <p>Hotline : 0961.543.666 - 0914.528.021</p>
        <div className="mt-4">
          <i className="fab fa-facebook-f "></i>
          <i className="fab fa-twitter mx-2"></i>
          <i className="fab fa-google-plus-g"></i>
          <i className="fab fa-instagram ml-2"></i>
        </div>
      </div>
      <div className="col-md-3 col-sm-6">
        <h4 className="my-3">Dịch Vụ Giải Pháp</h4>
        <p>Thiết kế Website Theo Yêu Cầu</p>
        <p>Thiết Kế Website Thương Mại ĐT</p>
        <p>Chăm Sóc Website và Fanapage</p>
        <p>Thiết kế logo, voucher</p>
        <p>Thiết kế Brochure, catalogue</p>
      </div>
      <div className="col-md-3 col-sm-6">
        <h4 className="my-3">Hỗ Trợ</h4>
        <p>Hỏi đáp Email</p>
        <p>Hỏi đáp tên miền</p>
        <p>Hướng dẫn sử dụng Hosting</p>
        <p>Profile Công ty</p>
        <p>Chính Sách Bảo Mật</p>
      </div>
      <div className="col-md-3 col-sm-6">
        <button className="hotline btn btn-primary">
            <div><i className="mr-3 fas fa-phone-volume"></i> Hotline : 0961.543.666</div>
        </button>
      </div>
    </div>      
    </div>
    <div className="copyright row text-center">
        <div className="col-12"> 
          <span>&copy; Copyright 2018. Sorano JSC - All rights reseverd: Designed by Sorano.vn</span>
        </div>
    </div>
    <a href="#top" className="back-to-top" title="Back to top" ><i className="fa fa-2x fa-angle-up " ></i></a>
    
  </footer>
</div>

        );
    }
}

export default Footer;
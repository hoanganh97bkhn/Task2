import React, { Component } from 'react';
import {
  Button,
  Jumbotron,
  InputGroupAddon,
  Input,
  InputGroup } from 'reactstrap';
class JumBotron extends Component {
  
    render() {
        return (
        <div className="container-fluid">
          <Jumbotron>
            <div className="container">
              <div className="row">
              <div className="col-xl-8 col-lg-8 col-md-8 col-12 title">
                <div className="title">Quý khách vui lòng để lại số điện thoại để được tư vấn miễn phí!</div>
              </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-12 phone" >
              <InputGroup>
                <Input placeholder="Nhập số điện thoại của bạn" />
                <InputGroupAddon addonType="append" >
                  <Button color="danger">Gửi</Button>
                </InputGroupAddon>
              </InputGroup>
            </div>
            </div>
            </div>
          </Jumbotron>
        </div>
        );
    }
}

export default JumBotron;
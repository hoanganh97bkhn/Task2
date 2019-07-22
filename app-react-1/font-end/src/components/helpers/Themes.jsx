import React, { Component } from 'react';
import sell from '../../image/sell.png';
import company from '../../image/company.png';
import free from '../../image/free.png';
import all from '../../image/all.png';
import smartphone from '../../image/smartphone.png';
import {
    Collapse } from 'reactstrap';
import { connect } from 'react-redux';

class Themes extends Component {
    render() {
        console.log(this.props.isOpen)
        return (
            <Collapse isOpen = {this.props.isOpen}>  
            <div className="container display-desktop my-3" id="themes-menu">
                <div className="row">
                    <div className="col">
                        <a href="#"><img src={sell} alt="theme-moblie"></img>Theme Bán Hàng</a>  
                    </div>
                    <div className="col">
                        <a href="#"><img src={company} alt="theme-moblie"></img>Theme Doanh Nghiệp</a>  
                    </div>
                    <div className="col">
                        <a href="#"><img src={free} alt="theme-moblie"></img>Theme Miễn Phí</a>  
                    </div>
                    <div className="col">
                        <a href="#"><img src={all} alt="theme-moblie"></img>Tất cả theme</a>  
                    </div>
                    <div className="col">
                        <a href="#"><img src={smartphone} alt="theme-moblie"></img>Theme Điện Thoại</a>  
                    </div>
                </div>
            </div>
            </Collapse> 
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isOpen : state.status
    }
}

export default connect(mapStateToProps, null)(Themes);
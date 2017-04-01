import React, { Component } from 'react';
import $ from 'jquery';

require('./charts-page-style.css');

var IM1 = require('./Accest/1.jpg');
var IM2 = require('./Accest/2.jpg');
var IM3 = require('./Accest/3.jpg');
var IM4 = require('./Accest/4.jpg');
var AV1 = require('./Accest/Icon/1.jpg');

var ChartItem = props => (
    <li className="image-chart-item">
        <div className="item-parent">
            <div className="show-image">
                <img alt="Image of ch" src={props.Data.Image}/>
                <i className="fa fa-heart btnloveit"></i>
                <span>
                    <i className="fa fa-heart"></i>
                    11
                </span>
            </div>
            <div className="show-image-name">
                <h5> {props.Data.ImageName} </h5>
            </div>
            <div className="show-info-user">
                <div className="show-info">
                    <span className="show-avatar">
                        <img src={props.Data.Avatar} alt="User Avatar"/>
                    </span>
                    <span className="show-name">
                        {props.Data.UserName}
                    </span>
                </div>
            </div>
        </div>
    </li>
)

class ChartsPage extends Component {
    constructor(props){
        super(props);
        this.state = {ChartsImageData: [
            {Image: IM1, Avatar: AV1, UserName: "Steven Jobs", ImageName: "Thanh binh"},
            {Image: IM2, Avatar: AV1, UserName: "Johun", ImageName: "Thanh binh"},
            {Image: IM3, Avatar: AV1, UserName: "Lee hong", ImageName: "Thanh binh"},
            {Image: IM4, Avatar: AV1, UserName: "Phi Pham", ImageName: "Thanh binh"}
        ]}
    }

    render() {
        return (
            <div className="page charts-page container">
                <h1 className="title-page"> Charts </h1>
                <div className="show-charts-image">
                    <div className="child-group">
                        <ul className="show-charts-item">
                            {this.state.ChartsImageData.map((value, index) => {
                                return(
                                    <ChartItem key={index} Data={value} />
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChartsPage;
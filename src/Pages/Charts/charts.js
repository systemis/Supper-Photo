import React, { Component } from 'react';
import $ from 'jquery';

import ImageUserItem from '../GalleryWCategory/GalletWCategoryComponent/ImageUserItem.js';

require('./charts-page-style.css');

var IM1 = require('./Accest/1.jpg');
var IM2 = require('./Accest/2.jpg');
var IM3 = require('./Accest/3.jpg');
var IM4 = require('./Accest/4.jpg');
var AV1 = require('./Accest/Icon/1.jpg');

class ChartsPage extends Component {
    constructor(props){
        super(props);
        this.state = {ChartsImageData: []}
        
        this.getCharImagesFromServer();
    }

    getCharImagesFromServer(){
        const self = this; 
        $(document).ready(() => {
            $.ajax({
                url: '/get-char-image', type: 'post', success: (data) => {
                    if(data.length > 0){
                        self.setState({ChartsImageData: data})
                    }
                }
            })
        })
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
                                    <ImageUserItem key={index} Data={value} />
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
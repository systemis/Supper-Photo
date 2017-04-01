import React, { Component } from 'react';
import $ from 'jquery';

import ImageUserItem from './GalletWCategoryComponent/ImageUserItem';

require('./gallery-w-category-page-style.css');

var IM1 = require('./Accest/1.jpg');
var IM2 = require('./Accest/2.jpg');
var IM3 = require('./Accest/3.jpg');
var IM4 = require('./Accest/4.jpg');
var AV1 = require('./Accest/Icon/1.jpg');


class GallerysWCategoryPage extends Component {
    constructor(props){
        super(props);
        this.state = {ImagesCategoryData: [
            // {Image: IM1, Avatar: AV1, UserName: "Steven Jobs", ImageName: "Thanh binh", Love: 0},
            // {Image: IM2, Avatar: AV1, UserName: "Johun", ImageName: "Thanh binh", Love: 0},
            // {Image: IM3, Avatar: AV1, UserName: "Lee hong", ImageName: "Thanh binh", Love: 0},
            // {Image: IM4, Avatar: AV1, UserName: "Phi Pham", ImageName: "Thanh binh", Love: 0}
        ]}

        this.getDataFromServer(this);
    }

    getDataFromServer(self){
        // Get data from server 
        $.ajax({
            url: '', type: 'post', success: data => {
                console.log(data);
                if(data.length > 0 && data !== 'Not_Data'){
                    self.setState({ImagesCategoryData: data});
                }
            }, error: (err) => {
                console.log(err);
            }
        })
    }

    render() {
        return (
            <div className="gallery-w-category-page container">
                <h1 className="title-page">Gallery of {this.props.match.params.category} </h1>
                <div className="show-data-gallery-with-category">
                    <div className="show-image-w-category-group row">
                         {this.state.ImagesCategoryData.map((value, index) => {
                            return (
                                <ImageUserItem key={index} Data={value} />
                            )
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default GallerysWCategoryPage;
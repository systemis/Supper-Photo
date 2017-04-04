import React, { Component } from 'react';
import $ from 'jquery';

import ImageItem from './MyGalleryComponent/ImageItem.js'
import AddNewProduct from './MyGalleryComponent/AddNewProduct';

var IM1 = require('./Accest/1.jpg');
var IM2 = require('./Accest/2.jpg');
var IM3 = require('./Accest/3.jpg');

require('./my-gallery-page-style.css')


class MyGalleyPage extends Component {
    constructor(props){
        super(props);

        // My gallery data example 
        this.state = { MyGalleryData: []}

        this.getMyProductServer();
    }

    getMyProductServer(){
        const self = this;
        $(document).ready(() => {
            $.ajax({
                url: '/get-my-gallerys', type: 'post',
                success: (data) => {
                    console.log(data);
                    if(data !== 'err' && data.length > 0){
                        self.setState({MyGalleryData: data});
                    }
                }
            })
        })
    }

    render() {
        return (
            <div className="page my-gallery-page container">
                <h1 className="title-page">
                    Gallery 
                </h1>
                <AddNewProduct />
                <div className="show-my-gallerys-data">
                    <div className="child-group row">
                        {this.state.MyGalleryData.map((value, index) => {
                            return <ImageItem key={index} Data={value} />
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default MyGalleyPage;
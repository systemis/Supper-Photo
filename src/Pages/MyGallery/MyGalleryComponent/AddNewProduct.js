import React, { Component } from 'react';
import $ from 'jquery';

require('../Style/AddNewProductGroup.css');

class AddNewProduct extends Component {
    constructor(props){
        super(props);
        this.handlingSelectCategory();
        this.handlingChooseProductImage();
        this.showAddNewProductGroup();
        this.handlingAddNewProduct();
    }

    handlingSelectCategory(){
        $(document).ready(() => {
            $("#select-category-for-new-propduct").change(function(){
                $("#input-new-product-category").val($("#select-category-for-new-propduct").val());
            })
        })
    }

    showAddNewProductGroup(){
        $(document).ready(() => {
            var timeC = 0;
            $("#btn-show-new-product-group").click(() => {
                console.log('Hidden and Show ');
                $("#add-new-product-group").slideToggle(200);
                if(timeC % 2 === 0){
                    $("#btn-show-new-product-group").empty().append("-");
                }else{
                    $("#btn-show-new-product-group").empty().append("+");
                }
                timeC ++;
            });
        })
    }

    handlingChooseProductImage(){
        $(document).ready(() => {
            $("#input-product-image").change(() => {
                var fileName = $("#input-product-image").val();
                console.log(fileName);
                var OfileName = fileName.substr(fileName.indexOf('\\') + 1);
                if(fileName === ''){
                    return $("#label-for-input-product-image").empty().append("Choose new image .")
                }else{
                    $("#label-for-input-product-image").empty().append(OfileName.substr(0, 20) + "...");
                }
            })
        })
    }

    handlingAddNewProduct(){
        $(document).ready(() => {
            $("#send-data-to-add-layout").submit(() => {
                var name     = $("#image-product-name").val();
                var category = $("#input-new-product-category").val();
                var image    = $("#input-product-image").val();
                if(name && category && image){
                    return true;
                }else{
                    alert('Bạn chưa điền một số thông tin, xin mời kiểm tra lại !');
                    return false
                }
            })
        })
    }

    render() {
        return (
            <div className="my-gallery-add-new-product-group">
                <button className="btn btn-primary" id="btn-show-new-product-group"> 
                    +
                </button>

                <div id="add-new-product-group">
                    <form action="/add-new-product" method="post"  id="send-data-to-add-layout"
                    className="container"
                    encType="multipart/form-data"
                    >
                        <div className="show-input-name">
                            <input type="text" name="imagename" id="image-product-name" placeholder="Input image name here ..." maxLength="50"/>
                        </div>
                        <div className="show-category-input-image-btn-submit">
                            <input type="file" id="input-product-image" name="image" />
                            <label htmlFor="input-product-image" id="label-for-input-product-image" maxLength="20">
                                Choose new image.
                            </label>
                            <select id="select-category-for-new-propduct">
                                <option value="Travel"> Travel </option>
                                <option value="Music"> Music </option>
                                <option value="Education"> Education </option>
                                <option value="Technology"> Technology </option>
                            </select>
                            <input type="hidden" value="Travel" id="input-new-product-category" name="category"/>
                            <input type="submit" className="btn btn-danger" value="Add."/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddNewProduct;
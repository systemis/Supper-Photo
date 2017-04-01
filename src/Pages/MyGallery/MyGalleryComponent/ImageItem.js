import React, { Component } from 'react';

const ImageItem = props => (
    <div className="show-my-gallery-image-item">
        <div className="child">
            <div className="show-image">
                <img src={props.Data.ImageItem} alt="Image about this item "/>
            </div>
            
            <div className="show-info-name">
                <h4>{props.Data.Name}</h4>
            </div>
            
            <div className="show-info-status">
                <span className="show-category">
                    <i className="fa fa-sort-desc"></i>
                    <span> 
                        <a href={"/gallerys/" + props.Data.Category }> 
                            {props.Data.Category}
                        </a>
                    </span>
                </span>
                <span className="show-date">
                    <i className="fa fa-calendar"></i>
                    <span> {props.Data.Date} </span>
                </span>
            </div>
            
            <div className="show-btn-edit">
                <a className="edit-your-image" href="#"> Edit </a>  
            </div>
        </div>
    </div>
)

export default ImageItem;
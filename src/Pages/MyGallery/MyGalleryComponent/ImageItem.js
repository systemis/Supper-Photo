import React, { Component } from 'react';

const ImageItem = props => (
    <div className="show-my-gallery-image-item">
        <div className="child">
            <div className="show-image">
                <img src={props.Data.image} alt="Image about this item "/>
                <span>
                    <i className="fa fa-heart"></i>
                    {props.Data.love}
                </span>
            </div>
            
            <div className="show-info-name">
                <h4>{props.Data.name}</h4>
            </div>
            
            <div className="show-info-status">
                <span className="show-category">
                    <i className="fa fa-sort-desc"></i>
                    <span> 
                        <a href={"/gallery/" + props.Data.category }> 
                            {props.Data.category}
                        </a>
                    </span>
                </span>
                <span className="show-date">
                    <i className="fa fa-calendar"></i>
                    <span> {props.Data.date} </span>
                </span>
            </div>
            
            
        </div>
    </div>
)


/**
 * <div className="show-btn-edit">
        <a className="edit-your-image" href="#"> Edit </a>  
    </div>
 */
export default ImageItem;
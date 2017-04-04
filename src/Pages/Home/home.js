import React, {Component} from 'react'
import $ from 'jquery';

import animalImage  from './accest/category-image/animals.jpg';
import girlImage    from './accest/category-image/girl.jpg';
import natureImage  from './accest/category-image/nature.jpg';
import peopleImage  from './accest/category-image/people.jpg';
import weddingImage from './accest/category-image/wedding.jpg';

require('./home-page-style.css');

var ShowCategoryItems = React.createClass({
    getInitialState(){
        return {Categorys: [
            {Name: "Travel", Image: animalImage , Des: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." },
            {Name: "Girl"   , Image: girlImage   , Des: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." },
            {Name: "Nature" , Image: natureImage , Des: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." },
            {Name: "People" , Image: peopleImage , Des: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." },
            {Name: "Wedding", Image: weddingImage, Des: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." }
        ]};
    },
    
    render(){
        return (
            <div className="show-category-item row">
                {this.state.Categorys.map((value, index) => {
                    return (
                        <div className="category-item col-md-3 col-sm-3" key={index}>
                            <div className="child">
                                <div className="show-name">
                                    <h4> 
                                        {value.Name}
                                    </h4>
                                </div>
                                <div className="show-image">
                                    <img src={value.Image} alt="Image about category"/>
                                </div>
                                <div className="show-des">
                                    <p> 
                                        {value.Des}
                                    </p>
                                </div>
                                <div className="show-visit-button">
                                     <a href={"/gallery/" + value.Name}>   Visit Gallery
                                    </a>
                                </div>
                            </div>
                        </div>
                    )   
                })}
            </div>
        )
    }
})

class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {UserData: {} }
    }
    render () {
        return (
            <div className="page home-page container">
                <ShowCategoryItems />
            </div>
        )
    }
}

export default HomePage
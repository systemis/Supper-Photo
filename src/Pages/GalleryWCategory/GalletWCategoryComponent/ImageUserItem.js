import React, {Component} from 'react'
import $ from 'jquery';


class ImageUserItem extends Component {
    constructor(props){
        super(props);
        var self = this;
        this.state = {Data: self.props.Data};
        this.handlingGetAvatar();
        this.AddComponentLoveButton = 0;
    }
    
    handlingGetAvatar() {
        var sefl = this;
        $.ajax({
            url: '/get-user-avatar', type: 'post', data: {username: sefl.state.Data.UserName},
            success: (data) => {
                if(data){
                    sefl.setState({Avatar: data});
                }
            }    
        })
    }

    renderLoveAction(){
        var sefl = this;
        $(document).ready(() => {
            $.ajax({
                url: '/check-login', type: 'post', success: data => {
                    if(data.result){
                        if(sefl.AddComponentLoveButton <= 0){
                            $("#show-image-" + sefl.state.Data.Id).append("<i class='fa fa-heart btnloveit'></i>")
                            sefl.AddComponentLoveButton += 1;
                        }
                    }
                }
            })
        })
    }

    render(){
        return(
            <div className="image-user-item">
                <div className="item-parent">
                    <div className="show-image" id={"show-image-" + this.state.Data.Id}>
                        <img alt="Image of ch" src={this.state.Data.Image}/>
                        {this.renderLoveAction()}
                        <span>
                            <i className="fa fa-heart"></i>
                            {this.state.Data.Love}
                        </span>
                    </div>
                    <div className="show-image-name">
                        <h5> {this.state.Data.ImageName} </h5>
                    </div>
                    <div className="show-info-user">
                        <div className="show-info">
                            <span className="show-avatar">
                                {() => console.log(this.state.Data.Avatar)}
                                <img src={this.state.Avatar} alt="User Avatar"/>
                            </span>
                            <span className="show-name">
                                {this.state.Data.UserName}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ImageUserItem
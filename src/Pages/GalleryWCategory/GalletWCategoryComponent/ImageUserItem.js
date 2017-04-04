import React, {Component} from 'react'
import $ from 'jquery';


class ImageUserItem extends Component {
    constructor(props){
        super(props);
        var self = this;
        this.state = {Data: self.props.Data};
        this.AddComponentLoveButton = 0;
        
        this.handlingGetAvatar();
        this.renderLoveAction();
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
                    if(data.result && sefl.AddComponentLoveButton === 0){
                        var productId = sefl.state.Data.Id;
                        $("#show-image-" + productId).append("<i id='btnLoveImage"+productId+"' class='fa fa-heart btnloveit'></i>")
                        
                        sefl.setUpLoveBtn(productId)
                        sefl.handlingLoveAction(productId);
                        
                        sefl.AddComponentLoveButton += 1;
                    }
                }
            })
        })
    }

    setUpLoveBtn(id){
        var sefl = this;
        $(document).ready(() => {
            $.ajax({url: '/check-is-liked', type: 'post', data: {productId: id}, success: (data) =>{ 
                console.log('check is liked: ' + data);
                if(data && data !== 'error'){
                    sefl.setState({LoveU: -1})
                    return $("#btnLoveImage" + id).addClass("red");
                }else{
                    return sefl.setState({LoveU: 1})
                }
            }, error: (err) => console.log(err) })
        })
    }

    handlingLoveAction(id){
        var sefl = this;
        $(document).ready(() => {
            $("#btnLoveImage"+id).click(function(){
                console.log("DD");
                $(this).toggleClass('red');
                var nowL = sefl.state.LoveU;
                console.log(nowL);
                
                $.ajax({
                    url: '/change-love-amout', type: 'post', data: {productId: id, amout: sefl.state.LoveU},
                    success: (data) => {
                        console.log(data);
                    }
                })
                
                // Update in ui 
                var Data = sefl.state.Data;
                Data.Love += nowL;
                sefl.setState({Data: Data});

                // Update for late time 
                if(nowL > 0){ nowL = -1; }
                else if(nowL < 0){ nowL = 1; }

                // Update nowL ]                
                sefl.setState({LoveU: nowL});
            });
        })
    }

    render(){
        return(
            <div className="image-user-item">
                <div className="item-parent">
                    <div className="show-image" id={"show-image-" + this.state.Data.Id}>
                        <img alt="Image of ch" src={this.state.Data.Image}/>
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
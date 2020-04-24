import React, { Component } from 'react';

class Food extends Component{
    render(){
        const{food} = this.props;
        return(
            <div className="snake-food" style={{left: food[0]+"%", top: food[1]+"%"}}/>
        );
    }
}

export default Food;
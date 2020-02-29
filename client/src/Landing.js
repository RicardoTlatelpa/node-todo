import React, {Component} from 'react';
import './styles/Landing.css';

class Landing extends Component {
    render(){
        return(
            <div className = "Landing" >
                <div className = "Landing-image">
                <img id = "laptop-image" src={require('./assets/node-todo-laptop.png')} alt = "laptop-node" />
                </div>
                <div className = "Landing-info">                    
                <h1>Node-Todo</h1>
                <h4>Prioritize your tasks. Log in and become more productive.</h4>
                </div>
            </div>
        )
    }
}

export default Landing;
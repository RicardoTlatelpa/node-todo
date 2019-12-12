import React, {Component} from 'react';
import './styles/Landing.css';

class Landing extends Component {
    render(){
        return(
            <div className = "Landing" >
                <h1>Node-Todo</h1>
                <h4>Prioritize your tasks. Log in and become more productive.</h4>
            </div>
        )
    }
}

export default Landing;
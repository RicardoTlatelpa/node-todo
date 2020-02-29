import React, {Component} from 'react';
import './styles/Header.css';

import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from './actions';
class Header extends Component{
    componentDidMount(){
        this.props.fetchUser();
        
    }
   renderContent(){
       let content;
       switch(this.props.user){
           case null:
               content = null
               break;
           case false:
                content = <header>
                <Link className = "home header-link" to = "/"><h2>Home</h2></Link>
                <a className = "header-link"href = '/auth/google'><h2>Log in</h2></a>
              </header>
              break;
            default:
                 content =  <header>
                <Link className = "header-link" to = "/app"><h2>Home</h2></Link>
                <a className = "logoutButton header-link"href = '/api/logout'><h2>Logout</h2></a>
                </header>                
       }
       return content;
   }
    render(){
       
        return(this.renderContent())
    }
}
const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps, { fetchUser })(Header);
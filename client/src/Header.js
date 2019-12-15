import React, {Component} from 'react';
import './styles/Header.css';
import GoogleButton from 'react-google-button';
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
                <Link className = "home" to = "/"><h2>Home</h2></Link>
                <a id = "googleBtn"href = '/auth/google'><GoogleButton label = 'Login Using Google' type = "light"/></a>
              </header>
              break;
            default:
                 content =  <header>
                <Link className = "home" to = "/app"><h2>Home</h2></Link>
                <a className = "logoutButton"href = '/api/logout'><h2>Logout</h2></a>
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
import React, {Component} from 'react';
import uuid from 'uuid';
import './styles/Todos.css';

class Todos extends Component {
    constructor(props){
        super(props);
        this.state = {
            edit: false,
            input: '',
            item: '',                        
        }
        this.handleEdit = this.handleEdit.bind(this) 
        this.handleInput = this.handleInput.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleRemove =  this.handleRemove.bind(this);
    }
    handleInput(event){
        this.setState({
            [event.target.name]: event.target.value
        })    
    }

    handleEdit(t, id){
        this.props.showPage(this.state.edit)        
        this.setState({
            edit: !this.state.edit,
            input: t,
            item: id
        })
    }
    handleUpdate(){
        if(this.state.input === ''){
            alert('Type something to update your todo');
        } 
        this.props.update(this.state.item, this.state.input)
        this.props.showPage(this.state.edit)
        this.setState({
            edit: !this.state.edit
        })
    }
    handleRemove(id){
        this.props.delete(id);
    }
    handleDone(id){
        this.props.complete(id);
    }
    handlePopup(id){        
        this.props.popup(id)
    }
   
    render(){
        let edit;           
        this.state.edit ? edit = (
            <div className = "Todo-update">            
            <input 
            name = "input" 
            onChange = {this.handleInput} 
            value = {this.state.input} 
            type = "text"
            className = "update-input"
            />
            
            <button 
            className = "updateBtn" 
            onClick = {this.handleUpdate}>
                Update
            </button>                        
            </div>
        ):
        edit = (
            <div className = "Todos">    
           {this.props.todos.map(x => (
               <ul className = "todoList-body" key = {uuid.v4()}>
               <li onClick = {() => this.handleDone(x._id)} className = {x.isDone? 'doneItem' : 'notDoneItem'}> 
               <p>{x.todo}</p> 
               </li>
               <div className = "button-todo-div">
               <button className = "editBtn" onClick = {
                   () => this.handleEdit(x.todo, x._id)}>
                       <i className="far fa-edit fa-2x"></i>
                </button>
               <button className = "deleteBtn" onClick = {
                   () => this.handleRemove(x._id)}>
                       <i className="far fa-trash-alt fa-2x"></i>
               </button>
               <button className = "deleteBtn " onClick = {
                   () => this.handlePopup(x._id)}>
                       <i className="fas fa-upload fa-2x"></i>
                </button>                
                </div>
               {<a href = {`/${x.attachment}`} >{x.attachment}</a>}
               </ul>
           ))}           
        </div>
        )
        return edit
    }
  }

  export default Todos;
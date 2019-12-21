import React, {Component} from 'react';
import Axios from 'axios';
import Todos from './Todos';
import './styles/TodoApp.css';
import Popup from './Popup';

class TodoApp extends Component{
  constructor(){
    super();
    this.state = {
      todo: [],
      input: "",
      showPage: true,
      user: '',
      id: '',
      popup: false,
    };
    this.handleInput = this.handleInput.bind(this) 
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handlePage = this.handlePage.bind(this);
    this.handleUpdateTodo = this.handleUpdateTodo.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
  }
 
   async  componentDidMount(){ 
        let fetchUser = await Axios.get('/api/user');
        this.setState({
          user: fetchUser.data.username,
          id: fetchUser.data.googleID
        })
        
         let response = await Axios.get(`/api/todos/${fetchUser.data.googleID}`);
        
         this.setState({
           todo: response.data
         })
         
    }
    handleInput(event){
      this.setState({
        [event.target.name]: event.target.value
      })
    }

     handleSubmit (event){  
      event.preventDefault();

      if(this.state.input === ""){
        return alert("Fill in something to do.");
      }
      let addedObj = {
        username: this.state.id,
        todo: this.state.input,
        isDone: false,
        hasAttachment: false
      }
     this.setState({
       input: ''
     })
      
      
        
      Axios.post('/api/todo/', addedObj)
      .then( (res) => {
        const newData = res.data
        
        this.setState({
          todo: newData
        })
       
      }).catch(err => console.log(err))
      

      
    }
    handleRemove(id){
    
    
     
    Axios.delete('/api/todo/test/delete/'+id)
    .then( (res) => {
        let newData = res.data
        this.setState({
          todo: newData
        })
    })
   
  
  
  
     
      
    }
    handlePage(bool){
      this.setState({
        showPage: bool
      })
    }
    handleUpdateTodo(data){
      this.setState({
        todo: data
      })
    }
     handleEdit(id, updatedTodo){
      let changedObject = this.state.todo.map(x => {
        if(x._id === id){
          x.todo = updatedTodo
        }
        return x
      })
      this.setState({
        todo: changedObject
      })  

      this.requestEdit(id)

    }
    async requestEdit(id){
      let request = this.state.todo.filter(x => x._id === id)
      let requestObj = {
        id: request[0]._id,
        username: request[0].username,
        todo:request[0].todo,
        isDone: request[0].isDone,
        hasAttachment: request[0].hasAttachment
      }

      try{
        let response = await Axios.post('/api/todo', requestObj)
        console.log(response);
      }catch(err){
        console.log(err)
      }
      
    }
    async handleComplete(id){
      let data = [...this.state.todo]
      let index = data.findIndex(obj => obj._id === id);
      
      if(data[index].isDone ){
        data[index].isDone = false
      }else{
        data[index].isDone = true
      }
      this.setState({
        todo: data
      })
      let req = await Axios.post('/api/isDone', {id, isDone: data[index].isDone})
      console.log(req);

    }

    togglePopup(){
      this.setState({
        popup: !this.state.popup
      })
    }


  render(){
    
    return(
      <div className = "appBody">
        <center>
      <h2>Full Stack To-do List</h2>
      <h3>Welcome, {this.state.user}</h3>
      </center>
      
      <Todos 
      showPage = {this.handlePage} 
      todos = {this.state.todo} 
      delete = {this.handleRemove}
      update = {this.handleEdit}
      complete = {this.handleComplete}
      popup = {this.togglePopup}
      />
      <div className = "app-addItem">
        <form onSubmit = {this.handleSubmit}>
      <input placeholder = "Add new task" className = "app-input" style = {{visibility: this.state.showPage ? 'visible': 'hidden'}} onChange = {this.handleInput} name = "input" type = "text" value = {this.state.input}/>
      <br/>
      <button className = "app-btn" style = {{visibility: this.state.showPage ? 'visible': 'hidden'}} >Add</button>
      </form>
      </div>
      {this.state.popup? <Popup popup = {this.togglePopup}/> : null}
    </div>
    )
  }
}

export default TodoApp;

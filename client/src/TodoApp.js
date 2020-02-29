import React, {Component} from 'react';
import Axios from 'axios';
import Todos from './Todos';
import './styles/TodoApp.css';
import Popup from './Popup';
import { Redirect } from 'react-router-dom';

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
      fileUpload: '',
      quoteData: {}
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
 
   async componentDidMount(){ 
        let fetchUser = await Axios.get('/api/user');
        let fetchQuote = await Axios.get('https://quotes.rest/qod?language=en');
        const {quote, author} = fetchQuote.data.contents.quotes[0];
        
        this.setState({
          user: fetchUser.data.username,
          id: fetchUser.data.googleID,
          quoteData: {quote, author}
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
        hasAttachment: false,
        attachment: ''
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
    Axios.delete('/api/todo/delete/'+id)
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
    togglePopup(id){   
      this.setState({
        fileUpload: id,
        popup: !this.state.popup
      }) 
    }

    


  render(){
    if(this.state.user === undefined){
      return <Redirect to="/"/>
   }
    return(
      <div className = "appBody">
      <div className = "appBody-titles">
      <h2 style = {{fontWeight: "400"}}>Your Tasks</h2>
      <h4>Welcome, {this.state.user}</h4>
        </div>
       
        <div className = "appBody-content">
       
      <Todos 
      showPage = {this.handlePage} 
      todos = {this.state.todo} 
      delete = {this.handleRemove}
      update = {this.handleEdit}
      complete = {this.handleComplete}
      popup = {this.togglePopup}
      />
       {this.state.todo.length === 0 ? 
        <div className = "nothing-div">
        <h4>There seems to be an air of nothingess...
          <br/>
          <i className="fas fa-wind fa-3x"></i>          
        </h4>
        </div>: null}
      <div className = "app-addItem">
        <form onSubmit = {this.handleSubmit}>
      <input placeholder = "Add new task" className = "app-input" style = {{visibility: this.state.showPage ? 'visible': 'hidden'}} onChange = {this.handleInput} name = "input" type = "text" value = {this.state.input}/>
      <br/>
      <button className = "app-btn" style = {{visibility: this.state.showPage ? 'visible': 'hidden'}} >Add</button>
      </form>
      </div>
      {this.state.popup? <Popup id = {this.state.fileUpload}/> : null}
      <div className = "appBody-quote-div">
        <h4><i id = "mug_icon" className="fas fa-mug-hot fa-2x"></i></h4>
        <p>"{this.state.quoteData.quote}"</p>
        <p>-{this.state.quoteData.author}</p>
      </div>
      </div>
      
      
    </div>
    )
  }
}

export default TodoApp;

import React from "react";
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      todoList:[],
      activeItem: {
        id: null,
        title: "",
        completed: false
      },
      editing: false,
    }
    this.fetchTasks = this.fetchTasks.bind(this); //@
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCookie = this.getCookie.bind(this);
    this.startEdit = this.startEdit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.strikeUnstrike = this.strikeUnstrike.bind(this);
  }

  componentDidMount(){
    this.fetchTasks();
  }

  fetchTasks(){
    console.log("Fetching...");
    fetch("http://127.0.0.1:8000/api/task-list")
      .then(response => response.json())
      .then(data => this.setState(
        {todoList: data}
      ));
  }

  handleChange(e){
    //Trigger when the form is changed
    var name = e.target.name;
    var value = e.target.value;
    console.log(value);
    console.log(name);
    this.setState({
      activeItem: {
        ...this.state.activeItem, //@ Update Child state
        title:value,
      }
    })
  }

  handleSubmit(e){
    e.preventDefault();
    window.alert("Hello");
    var url = "http://127.0.0.1:8000/api/task-create";

    //Change API URL in case of editing.
    if (this.state.editing){
      url = `http://127.0.0.1:8000/api/task-update/${this.state.activeItem.id}/`;
      this.setState({
        editing: false
      })
    }

    //Send POST request to create/edit a task
    fetch(
      url,
      {
        method: "POST",
        headers: {
          "Content-type":"application/json",
          "X-CSRFToken": this.getCookie("csrftoken"),
        },
      body: JSON.stringify(this.state.activeItem)
    }).then((response)=>{
      this.fetchTasks();
      //Reset the activeItem's state @
      this.setState({
        activeItem: {
          id: null,
          title: "",
          completed: false
        },
      });
    }).catch((error) =>{
        window.alert(error);
    })
  }

  startEdit(task){
    console.log("Start edit:", task);
    this.setState({
      activeItem: task,
      editing: true,
    })
  }

  deleteItem(task){
    var url = `http://127.0.0.1:8000/api/task-delete/${task.id}/`
    fetch(
      url,
      {
        method: "DELETE",
        headers: {
          "Content-type":"application/json",
          "X-CSRFToken": this.getCookie("csrftoken"),
      }
    }).then((response)=>{
      //Update the list.
      this.fetchTasks();
    }).catch((error)=>{
      window.alert(error);
    })
  }

  strikeUnstrike(task){
    console.log("strikeUnstrike");
    task.completed = !task.completed
    console.log(task.completed);
    var url = `http://127.0.0.1:8000/api/task-update/${task.id}/`
    fetch(
      url,
      {
        method: "POST",
        headers: {
          "Content-type":"application/json",
          "X-CSRFToken": this.getCookie("csrftoken"),
        },
        body: JSON.stringify({
          completed: task.completed,
          title: task.title
        }),
    }).then((response)=>{
      //Update the list.
      this.fetchTasks();
    }).catch((error)=>{
      window.alert(error);
    })
  }

  //Django's CSRFToken request: https://docs.djangoproject.com/en/3.1/ref/csrf/ @
  getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }

  render(){
    var tasks = this.state.todoList;
    var self = this;
    return (
      <div className="container">
        <div id="task-container">
          <div id="form-wrapper">
            <form onSubmit={this.handleSubmit} id="form">
              <div className="flex-wrapper">
                <div style={{flex: 6}}>
                  <input onChange={this.handleChange} className="form-control" id="title" type="text" value={this.state.activeItem.title} name="title" placeholder="Add task" />
                </div>

                <div style={{flex: 1}}>
                  <input id="submit" className="btn btn-warning" type="submit" name="submit" name="Add" />
                </div>
              </div>
            </form>
          </div>

          <div id="list-wrapper">
          {tasks.map(function(task, i){
            return(
              <div key={i} className="task-wrapper flex-wrapper">
                <div onClick={()=>self.strikeUnstrike(task)}  style={{flex: 7}}>
                  {task.completed? (
                    <strike>{task.title}</strike>
                  ):(
                    <span>{task.title}</span>
                  )}
                </div>

                <div style={{flex: 1}}>
                  <button onClick={()=>self.startEdit(task)} className="btn btn-small btn-outline-info">Edit</button>
                </div>

                <div style={{flex: 1}}>
                  <button onClick={()=>self.deleteItem(task)} className="btn btn-small btn-outline-dark delete">-</button>
                </div>
              </div>
            )
          })}
          </div>
        </div>
      </div>
    )
  };
}

export default App;

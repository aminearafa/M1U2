import React, { Component } from "react";
import Login from "./Login";
import TodoList from "../components/TodoList";
import { endpoint, login } from "../endpoints";
import Cookies from "js-cookie";
import "../App.css";
import "../styles/form.css";

export default class Todo extends Component {
  constructor() {
    super();
    this.state = {
      taskName: "",
      taskList: [],
      isLoggedIn: false,
      username: "",
      password: "",
      loginError: "",
    };
  }
  componentDidMount = () => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + Cookies.get("jwt"));

    fetch(endpoint, { headers: myHeaders, mode: "cors" })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        // alert("Please Login to continue");
        throw new Error("Please Login to continue");
      })
      .then(({ todos, currentUser }) => {
        this.setState({ isLoggedIn: true });
        this.loadTodos();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  loadTodos = () => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + Cookies.get("jwt"));
    fetch(endpoint, { headers: myHeaders, mode: "cors" })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Please Login to continue");
      })
      .then(({ todos, currentUser }) => {
        // console.log(todos);
        this.setState({ taskList: todos });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  setUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  setPassword = (event) => {
    this.setState({ password: event.target.value });
  };
  setTaskName = (event) => {
    this.setState({ taskName: event.target.value });
  };
  login = (event) => {
    event.preventDefault();

    if (this.state.username === "" && this.state.password === "") {
      this.setState({ loginError: "El campo del nombre de usuario y contraseña están vacios" });
      return;
    }
    if (this.state.username === "") {
      this.setState({ loginError: "El campo del usuario está vacio" });
      return;
    }

    if (this.state.password === "") {
      this.setState({ loginError: "El campo de la contraseña está vacio" });
      return;
    }

    var formData = new FormData(event.target);

    var formObject = {};
    formData.forEach(function (value, key) {
      formObject[key] = value;
    });
    console.log(JSON.stringify(formObject));

    fetch(login, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObject),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status.status === "unsuccessful") {
          this.setState({ loginError: data.status.message });
          return;
        }
        Cookies.set("jwt", data.data[0]["jwt"]);
        this.setState({ isLoggedIn: true });
        this.loadTodos();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  addTodo = (event) => {
    event.preventDefault();
    const todoObj = { description: this.state.taskName };
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + Cookies.get("jwt"));
    myHeaders.append("Content-Type", "application/json");

    fetch(endpoint, {
      method: "POST", // or 'PUT'
      headers: myHeaders,
      body: JSON.stringify(todoObj),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        let taskList = [...this.state.taskList];
        taskList.push(data["data"]);
        this.setState({ taskList: taskList, taskName: "" });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  deleteCheck = (event) => {
    const item = event.target;
    //delete todo from storage and remove from dom
    if (item.classList[0] === "trash-btn") {
      const todo = item.parentElement;
      const id = todo.id;

      let myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + Cookies.get("jwt"));

      fetch(endpoint + id, {
        method: "DELETE",
        headers: myHeaders,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Deleted:", data);
          let taskList = [...this.state.taskList];
          taskList.pop(taskList.findIndex((task) => task._id === id));
          this.setState({ taskList: taskList });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    //mark check and update the todo in the storage
    if (item.classList[0] === "complete") {
      const todo = item.parentElement;
      const id = todo.id;

      let myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + Cookies.get("jwt"));
      myHeaders.append("Content-Type", "application/json");
      if (todo.classList.toggle("completed")) {
        const todoObj = { completed: true };

        fetch(endpoint + id, {
          method: "PUT", // or 'PUT'
          headers: myHeaders,
          body: JSON.stringify(todoObj),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
            let taskList = [...this.state.taskList];
            let task = taskList.find((task) => {
              return task._id === id;
            });
            task.completed = true;
            this.setState({ taskList: taskList });
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        const todoObj = { completed: false };
        fetch(endpoint + id, {
          method: "PUT", // or 'PUT'
          headers: myHeaders,
          body: JSON.stringify(todoObj),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
            let taskList = [...this.state.taskList];
            let task = taskList.find((task) => {
              return task._id === id;
            });
            task.completed = false;
            this.setState({ taskList: taskList });
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    }
  };

  logout = (event) => {
    Cookies.remove("jwt");
    this.setState({ isLoggedIn: false });
  };

  render() {
    return (
      <div>
        {this.state.isLoggedIn ? (
          <div className="App">
            <header className="App-header">
              <button onClick={this.logout}>Logout</button>
              <br />
              <br />
              <form action="" onSubmit={this.addTodo}>
                <input
                  type="text"
                  name="taskName"
                  onChange={this.setTaskName}
                  value={this.state.taskName}
                />
                <input type="submit" value="add task" />
              </form>
              <h2>Tasks List</h2>
              <TodoList
                taskList={this.state.taskList}
                deleteCheck={this.deleteCheck}
              />
            </header>
          </div>
        ) : (
          <Login
            login={this.login}
            setUsername={this.setUsername}
            username={this.state.username}
            password={this.state.password}
            setPassword={this.setPassword}
            error={this.state.loginError}
          />
        )}
      </div>
    );
  }
}

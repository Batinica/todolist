import "./App.css";
import axios from "axios";
import React, { Component } from "react";
class App extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = { data: [] };
  }

  handleToggleStatus = (event, idElementa) => {
    console.log(idElementa);
    let indexElementa = this.state.data.findIndex(
      (element) => element.id === idElementa
    );
    console.log(indexElementa);
    let novoStanje = this.state.data;
    if (novoStanje[indexElementa].status === "completed") {
      novoStanje[indexElementa].status = "pending";
    } else {
      novoStanje[indexElementa].status = "completed";
    }
    this.setState({ data: novoStanje });
  };
  handleAddTask = () => {
    const newTask = {
      id: Math.floor(Math.random() * 20000) + 10000,
      status: "pending",
      title: this.textInput.current.value,
    };
    if (
      this.textInput.current.value === "" ||
      this.textInput.current.value === null
    ) {
      return null;
    } else {
      this.setState((state) => {
        return { data: [...state.data, newTask] };
      });
    }
    this.textInput.current.value = "";
  };
  
  async componentDidMount() {
    try {
      let response = await axios.get("https://gorest.co.in/public/v2/todos");
      this.setState({ data: response.data });
    } catch (error) {
      this.setState({ error: error });
    }
  }
  render() {
    return (
      <div className="App">
        <h1>~ Daria's ToDo List ~</h1>
        <div className="Div1">
          <input type="text" ref={this.textInput} />
          <input
            type="button"
            value="Add task"
            onClick={this.handleAddTask}
          />
        </div>
        <ul>
          {this.state.data.length > 0 &&
            this.state.data.map((element, index) => {
              return (
                <li
                  onClick={(e) => this.handleToggleStatus(e, element.id)}
                  className={element.status === "completed" && "striked"}
                  key={element.id}
                >
                  {element.title}
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}
export default App;
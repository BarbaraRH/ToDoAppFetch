import React from "react";
import "./ToDo.css";

export class ToDo extends React.Component {
	constructor(props) {
		super(props);
		this.state = { array: [] };
		this.addTask = this.addTask.bind(this);
	}

	getData() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/barbara")
			.then(resp => resp.json())
			.then(data => {
				console.log(data);
				this.setState({
					array: data
				});
			})
			.then(() => console.log(this.state.array))
			.catch(error => console.log(error));
	}

	addTask(event) {
		event.preventDefault();
		fetch("https://assets.breatheco.de/apis/fake/todos/user/barbara", {
			method: "PUT",
			body: JSON.stringify([
				...this.state.array,
				{
					label: event.target.item.value,
					done: false,
					id: new Date()
				}
			]),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
			.then(resp => resp.json())
			.then(data => {
				console.log(data);
				this.getData();
			})
			.catch(error => console.log(error));
		event.target.item.value = "";
	}

	deleteTask(id) {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/barbara", {
			method: "PUT",
			body: JSON.stringify(
				this.state.array.filter(item => {
					if (item.id !== id) {
						return item;
					}
				})
			),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
			.then(resp => resp.json())
			.then(data => {
				console.log(data);
				this.getData();
			})
			.catch(error => console.log(error));
	}

	componentDidMount() {
		this.getData();
	}

	render() {
		console.log(this.state.array);
		return (
			<div id="container" className="mt-5">
				<h1 className="todo-header">To do List</h1>
				<form id="addToDo" onSubmit={this.addTask}>
					<input
						name="item"
						placeholder={
							this.state.array.length > 0
								? "Add a task"
								: "No tasks, add a task"
						}
					/>
					<button>Add</button>
				</form>
				<ul>
					{this.state.array.map(item => {
						return (
							<li key={item.id}>
								<span
									onClick={this.deleteTask.bind(
										this,
										item.id
									)}>
									<i className="fa fa-trash" />
								</span>
								{item.label}
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

/*

[
    {
        "label": "Viajar",
        "done": false
    },
    {
        "label": "Descansar",
        "done": true
    }
]

 */

/*

let liArr = [];
		for (let i in this.state.array[0]) {
			liArr.push(this.state.array[0][i]);
		}

 */

/* export class ToDo extends React.Component {
	constructor(props) {
		super(props);
		this.state = { array: [] };
		this.addTask = this.addTask.bind(this);
	}

	componentDidMount() {
		fetch("https://jsonplaceholder.typicode.com/todos")
			.then(response => response.json())
			.then(json => {
				console.log(json);
				this.setState({
					array: json
				});
			});
	}

	addTask(event) {
		event.preventDefault();
		this.state.array.push({
			id: new Date(),
			task: event.target.item.value
		});
		this.setState({
			array: this.state.array
		});
		console.log(this.state.array);
		fetch("https://jsonplaceholder.typicode.com/todos", {
			method: "PUT",
			body: JSON.stringify(this.state.array),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
			.then(response => {
				return response.json();
			})
			.then(json => {
				console.log(json);
			});
		event.target.item.value = "";
	}

	deleteTask(id) {
		this.setState({
			array: this.state.array.filter(item => {
				if (item.id !== id) {
					return item;
				}
			})
		});
	}

	render() {
		return (
			<div id="container" className="mt-5">
				<h1 className="todo-header">To do List</h1>
				<form id="addToDo" onSubmit={this.addTask}>
					<input
						name="item"
						placeholder={
							this.state.array.length > 0
								? "Add a task"
								: "No tasks, add a task"
						}
					/>
					<button>Add</button>
				</form>

				<ul>
					{this.state.array.map(item => {
						return (
							<li key={item.id}>
								<span
									onClick={this.deleteTask.bind(
										this,
										item.id
									)}>
									<i className="fa fa-trash" />
								</span>
								{item.title}
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
} */

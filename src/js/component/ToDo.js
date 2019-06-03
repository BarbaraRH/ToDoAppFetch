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

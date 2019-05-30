import React from "react";
import "./ToDo.css";

export class ToDo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			array: [{ id: "0", task: "task 1" }, { id: "1", task: "task 2" }]
		};
		this.addTask = this.addTask.bind(this);
	}

	addTask(event) {
		event.preventDefault();
		this.state.array.push({
			id: new Date(),
			task: event.target.item.value
		});
		this.setState(this.state.array);
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
								{item.task}
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

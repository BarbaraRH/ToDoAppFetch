import React from "react";
import { ToDo } from "./ToDo";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = { show: false };
	}

	render() {
		return (
			<div className="Home">
				<ToDo />
			</div>
		);
	}
}

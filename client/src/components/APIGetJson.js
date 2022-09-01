import React,{Component} from "react";

class APIGetJson extends Component {

    componentDidMount = async () => {
        const response = await fetch('/users02');
        const body = await response.json();
        console.log('body.message : '+body.message);
    }

    render() {
        return (
            <h1>Call Node API Get</h1>
        )
    }

}

export default APIGetJson;
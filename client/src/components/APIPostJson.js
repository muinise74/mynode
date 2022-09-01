import React,{Component} from "react";

class APIPostJson extends Component {

    componentDidMount = async () => {
        const response = await fetch('/users03',{method : 'post'});
        const body = await response.json();
        console.log('body.message : '+body.message);
    }

    render() {
        return (
            <h1>Call Node API Post</h1>
        )
    }

}

export default APIPostJson;
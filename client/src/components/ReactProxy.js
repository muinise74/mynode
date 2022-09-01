import React, {Component} from 'react';

class reactProxy extends Component {

    componentDidMount = async () => {
        const response = await fetch('/users');
        const body = await response.text();
        console.log("body : "+body);
    }

    render() {
        return (
            <h1>Proxy Call Node API</h1>
        )
    }

}

export default reactProxy;
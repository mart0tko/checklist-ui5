import React from "react";
import axios from "axios";

export default class Resourse extends React.Component {
    state = {
        loading: false,
        payload: []
    }

    componentDidMount() {
        this.setState({ loading: true })
        axios.get(this.props.path).then(response => {
            this.setState({
                loading: false,
                payload: response.data
            })
        })
    }

    render() {
        if (this.state.loading) {
            return <h1>Loading...</h1>
        }
        return this.props.render(this.state);
    }
}
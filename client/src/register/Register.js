import React from 'react';
import axios from 'axios';

class Register extends React.Component {

    state = {
        users_name: "",
        password: "",
    }

    render() {
        return (
            <>
                <h2>Register</h2>
                <form onSubmit={this.handleSubmit}> 
                    <div>
                        <label htmlFor="users_name">Username</label>
                        <input
                            name="users_name"
                            placeholder="Username"
                            id="users_name"
                            value={this.state.users_name}
                            onChange={this.handleInputChange}
                            type="text"
                        />
                        <input
                            name="password"
                            placeholder="Password"
                            id="password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            type="text"
                        />
                    </div>
                    <div>
                        <button type="submit">Register</button>
                    </div>
                </form>
            </>
        )
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]:value })
    }

    handleSubmit = event => {
        event.preventDefault();
        const endpoint = 'http://localhost:5000/api/auth/register';

        axios.post(endpoint, this.state)
            .then(res => {
                // console.log('response data', res.data)
                localStorage.setItem('jwt', res.data.token)
                this.props.history.push('/login');
            }).catch(e => {
                console.error(e)
            })
    }
}

export default Register
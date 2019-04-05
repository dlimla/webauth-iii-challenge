import React from 'react';
import axios from 'axios';

import requireAuth from '../auth/requireAuth.js';


class Users extends React.Component {

    state = {
        users: []
    }
    render() {
        return (
            <>
                <h2>Users</h2>
                <ul>
                    {this.state.users.map( u => (
                        <li key={u.id}>{u.users_name}</li>
                    ))}
                </ul>
            </>
        )
    }

    componentDidMount() {
        
        const headers = {
            authorization: localStorage.getItem('jwt') 
        }

        const endpoint = 'http://localhost:5000/api/users/';
        axios.get(endpoint, { headers }).then(res => {
            this.setState({ users: res.data })
        }).catch(e => {
            console.error(e);
        })
    }

}

export default requireAuth(Users);
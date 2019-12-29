import React, { Component } from 'react'
import _ from 'lodash'
import { Input, Menu } from 'semantic-ui-react'
import { logoutUser } from '../store/UserActions'
import { withCookies } from 'react-cookie'

class Navitem extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    handleLogoutUser = (e) => {
        let {cookies} = this.props
        let payload = {
            url: 'User/logoutUser',
            body: {}
        }
        if(!_.isNil(payload) && !_.isEmpty(payload)){
            logoutUser(payload, (err, result)=> { // For add user
                if(err) return
                if(result){
                    cookies.remove('MAP_cookies', { path: '/' })
                    window.location.href = "/"
                }
            })
        }
    }

    render() {
        const { activeItem } = this.state

        return (
        <Menu secondary>
            <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
            />
            <Menu.Item
            name='messages'
            active={activeItem === 'messages'}
            onClick={this.handleItemClick}
            />
            <Menu.Item
            name='friends'
            active={activeItem === 'friends'}
            onClick={this.handleItemClick}
            />
            <Menu.Menu position='right'>
            <Menu.Item>
                <Input icon='search' placeholder='Search...' />
            </Menu.Item>
            <Menu.Item
                name='logout'
                active={activeItem === 'logout'}
                onClick={this.handleLogoutUser}
            />
            </Menu.Menu>
        </Menu>
        )
    }
}

export default withCookies(Navitem)
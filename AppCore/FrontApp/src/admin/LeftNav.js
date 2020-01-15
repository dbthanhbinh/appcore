import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class LeftNav extends Component {
    state = {}
    handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  
    render() {
      const { activeItem } = this.state
  
      return (
        <Menu vertical>
          <Menu.Item>
            <Menu.Header>Post</Menu.Header>
            <Menu.Menu>
              <Menu.Item  as='a' href='/admin/posts'
                name='Posts'
                active={activeItem === 'admin-posts'}
                onClick={this.handleItemClick}
              />
            </Menu.Menu>
          </Menu.Item>
          <Menu.Item>
            <Menu.Header>Hosting</Menu.Header>
  
            <Menu.Menu>
              <Menu.Item  as='a' href='/admin/settings'
                name='Settings'
                active={activeItem === 'admin-setting'}
                onClick={this.handleItemClick}
              />
              <Menu.Item  as='a' href='/admin/medias'
                name='Media'
                active={activeItem === 'admin-media'}
                onClick={this.handleItemClick}
              />
            </Menu.Menu>
          </Menu.Item>
  
          <Menu.Item>
            <Menu.Header>Support</Menu.Header>
  
            <Menu.Menu>
              <Menu.Item
                name='email'
                active={activeItem === 'email'}
                onClick={this.handleItemClick}
              >
                E-mail Support
              </Menu.Item>
  
              <Menu.Item
                name='faq'
                active={activeItem === 'faq'}
                onClick={this.handleItemClick}
              >
                FAQs
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>
        </Menu>
      )
    }
  }
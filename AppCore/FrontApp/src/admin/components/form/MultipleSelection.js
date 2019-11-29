import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const options = [
  { key: 'angular', text: 'Angular', value: 'angular' },
  { key: 'css', text: 'CSS', value: 'css' },
  { key: 'design', text: 'Graphic Design', value: 'design' },
  { key: 'ember', text: 'Ember', value: 'ember' },
  { key: 'html', text: 'HTML', value: 'html' },
  { key: 'ia', text: 'Information Architecture', value: 'ia' },
  { key: 'javascript', text: 'Javascript', value: 'javascript' },
  { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
  { key: 'meteor', text: 'Meteor', value: 'meteor' },
  { key: 'node', text: 'NodeJS', value: 'node' },
  { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
  { key: 'python', text: 'Python', value: 'python' },
  { key: 'rails', text: 'Rails', value: 'rails' },
  { key: 'react', text: 'React', value: 'react' },
  { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
  { key: 'ruby', text: 'Ruby', value: 'ruby' },
  { key: 'ui', text: 'UI Design', value: 'ui' },
  { key: 'ux', text: 'User Experience', value: 'ux' },
]


class MultipleSelection extends React.Component {
    state = { options }

    handleAddition = (e, { value }) => {
      this.setState((prevState) => ({
        options: [{ text: value, value }, ...prevState.options],
      }))
    }
  
    handleChange = (e, { value }) => this.setState({ currentValue: value })
  
    render() {
        const { currentValue } = this.state
        let { name } = this.props
      return (
        <Dropdown
            name={ name || 'selected_name' }
            options={this.state.options}
            placeholder='Choose Language'
            {...this.props}
            fluid
            selection
            // multiple
            // search
            // allowAdditions
            value={currentValue}
            onAddItem={this.handleAddition}
            onChange={this.handleChange}
        />
      )
    }
  }
  
  export default MultipleSelection
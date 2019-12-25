import React from 'react'
import { Tab } from 'semantic-ui-react'
import SeoSetting from './SeoSetting'
const panes = [
    { menuItem: 'Tab 1', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
    { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
    { menuItem: 'Home Seo setting', render: (props) => <Tab.Pane><SeoSetting /></Tab.Pane> },
]
 const Setting = () => {    
    return (
        <div>
          <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
        </div>
    )
}
export default Setting
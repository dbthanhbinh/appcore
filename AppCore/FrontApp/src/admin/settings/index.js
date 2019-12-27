import React from 'react'
import { Tab } from 'semantic-ui-react'
import SeoSetting from './SeoSetting'
import GeneralSetting from './GeneralSetting'
import ContactSetting from './ContactSetting'

const panes = [
    { menuItem: 'General setting', render: () => <Tab.Pane><GeneralSetting /></Tab.Pane> },
    { menuItem: 'Contact setting', render: () => <Tab.Pane><ContactSetting /></Tab.Pane> },
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
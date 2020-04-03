import React from 'react'
import SeoSetting from './SeoSetting'
import GeneralSetting from './GeneralSetting'
import ContactSetting from './ContactSetting'
import LayoutSetting from './LayoutSetting'

 const Setting = () => {    
    return (
        <div className="col-12">
            <div className="card card-primary card-outline card-tabs">
                <div className="card-header p-0 pt-1 border-bottom-0">
                <ul className="nav nav-tabs" id="custom-tabs-two-tab" role="tablist">
                    <li className="nav-item">
                    <a className="nav-link active" id="custom-tabs-two-home-tab" data-toggle="pill" href="#custom-tabs-two-home" role="tab" aria-controls="custom-tabs-two-home" aria-selected="true">General Setting</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" id="custom-tabs-two-profile-tab" data-toggle="pill" href="#custom-tabs-two-profile" role="tab" aria-controls="custom-tabs-two-profile" aria-selected="false">Layout Setting</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" id="custom-tabs-two-messages-tab" data-toggle="pill" href="#custom-tabs-two-messages" role="tab" aria-controls="custom-tabs-two-messages" aria-selected="false">Contact Setting</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" id="custom-tabs-two-settings-tab" data-toggle="pill" href="#custom-tabs-two-settings" role="tab" aria-controls="custom-tabs-two-settings" aria-selected="false">Seo Setting</a>
                    </li>
                </ul>
                </div>
                <div className="card-body">
                <div className="tab-content" id="custom-tabs-two-tabContent">
                    <div className="tab-pane fade show active" id="custom-tabs-two-home" role="tabpanel" aria-labelledby="custom-tabs-two-home-tab">
                        <GeneralSetting />
                    </div>
                    <div className="tab-pane fade" id="custom-tabs-two-profile" role="tabpanel" aria-labelledby="custom-tabs-two-profile-tab">
                        <LayoutSetting />
                    </div>
                    <div className="tab-pane fade" id="custom-tabs-two-messages" role="tabpanel" aria-labelledby="custom-tabs-two-messages-tab">
                        <ContactSetting />
                    </div>
                    <div className="tab-pane fade" id="custom-tabs-two-settings" role="tabpanel" aria-labelledby="custom-tabs-two-settings-tab">
                        <SeoSetting />
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}
export default Setting
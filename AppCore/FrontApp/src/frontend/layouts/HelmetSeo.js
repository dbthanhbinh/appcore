import React from 'react'
import _ from 'lodash'
import { Helmet } from 'react-helmet'

const HelmetSeo = (props) => {
    let {configSeoDefault} = props
    let seoTitle = _.get(configSeoDefault, 'seoTitle')
    let seoKeys = _.get(configSeoDefault, 'seoKeys')
    let seoDescription = _.get(configSeoDefault, 'seoDescription')
    return(
        <Helmet>
            <title>{seoTitle}</title>
            <meta name="keywords" content={seoKeys} />
            <meta name="description" content={seoDescription} />
        </Helmet>
    )
}

export default HelmetSeo
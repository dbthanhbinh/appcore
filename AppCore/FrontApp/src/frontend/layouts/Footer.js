import React from 'react'
const Footer = (props) => {
    let { companyInfomations } = props
    return (
        <div className='footer-contents'>
            { companyInfomations && companyInfomations.companyCopyright ? companyInfomations.companyCopyright : null }
            { companyInfomations && companyInfomations.companySlogan ? ` ${ companyInfomations.companySlogan }` : null }
        </div>
    )
}

export default Footer
import React from 'react'
import PostForm from '../posts/PostForm'

const HeaderSection = (props) => {
    return(
        <div className='header-section'>
            <PostForm { ...props }/>
        </div>
    )
}

export default HeaderSection
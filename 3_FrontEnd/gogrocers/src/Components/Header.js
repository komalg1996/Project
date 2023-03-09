import React from 'react'

const Header = (props) => {
    return (
        <div>
            <h2 className="text-center">{props.title}</h2>
            <hr/>
        </div>
    )
}

export default Header

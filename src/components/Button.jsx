import { React, Component } from 'react'
import './Button.css'

export default props =>{
    let classes = 'button '
    classes += props.operation ? 'operation' : ''
    classes += props.double ? 'double' : ''
    classes += props.triple ? 'triple' : ''
    return (
        <button
            onClick={e => props.onClick && props.onClick(props.label)}
            className={classes}>
            {props.label}
        </button>
        )
}
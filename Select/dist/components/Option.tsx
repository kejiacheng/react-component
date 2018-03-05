/// <reference path="../../typings/index.d.ts" />
import * as React from "react";
import * as classNames from "classnames"
import './Option.scss'

const optionCss = require('./Option.scss')

interface OptionProps {
    disabled?: boolean
    value?: any
    title?: string
    isSelected?: string
    optionClick?: (value: any, text: string) => void
    optionClassName?: string
}

export default class Option extends React.Component<OptionProps, {}> {
    render() {
        const { value, disabled, title, children, isSelected, optionClick, optionClassName } = this.props
     
        return  <li 
                    className={classNames(
                        optionCss['k-option'],
                        {[optionCss['k-option-selected']]: isSelected},
                        optionCss[optionClassName],
                        {[optionCss['k-option-disabled']]: disabled}
                    )}
                    onClick={optionClick.bind(null, value, children, disabled)}
                    title={title}
                    key={value}
                >
                    {children}
                </li>
    }
}
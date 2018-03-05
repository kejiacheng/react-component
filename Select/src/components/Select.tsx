/// <reference path="../../typings/index.d.ts" />
import * as React from "react";
import Option from './Option'
import * as classNames from "classnames"
// import './Select.scss'
// import '../styles/font/iconfont.scss'

const selectCss = require('./Select.scss')
const iconfontCss = require('../styles/font/iconfont.scss')

interface OptionProps {
    disabled?: boolean
    value?: any
    title?: string
  }

interface SelectProps { 
    style?: React.CSSProperties
    selectClassName?: string
    optionClassName?: string
    trigger?: () => void
    placeholder?: string | number
    mode?: 'default' | 'combobox'
    defaultValue?: any
    onChange?: (value: any, text: string) => any
    children?: React.ReactNode
    clear?: boolean
    inputChange?: (text: string) => any
}

interface stateProps {
    selectedValue?: any
    selectedText?: string
    optionWrapperShow?: boolean
}

let inputChangeShouldCB: boolean = true

class Select extends React.Component<SelectProps, {}> {
    static Option = Option as React.ClassicComponentClass<OptionProps>

    static state: stateProps
    static clear: () => any

    constructor (props: SelectProps) {
        super(props)
        let selectedText: string = ''
        React.Children.forEach(props.children, (child:React.ReactElement<any>) => {
            if (child.props.value === props.defaultValue) {
                selectedText = child.props.children
            }
        })

        this.state = {
            selectedValue: props.defaultValue,
            selectedText,
            optionWrapperShow: false
        }
    }

    clearData = () => {
        const me = this
        const targetInput: HTMLInputElement = document.querySelector('.k-select-search-input-dom')
     
        me.setState(
            {
                selectedValue: null,
                selectedText: ''
            },
            function () {
                me.props.onChange && me.props.onChange('', '')
                if (me.props.mode === 'combobox') {
                    targetInput.value = ''
                }
            }
        )
    }

    showOptionWrapper = (e: any) => {
        const me = this
        const { trigger } = me.props
        
        trigger && trigger()

        me.setState(
            {
                optionWrapperShow: true
            }
        )

        e.nativeEvent.stopImmediatePropagation()
    }

    inputChangeEvent = (e: any) => {
        const me = this
        const { inputChange } = me.props
        const text = e.currentTarget.value
        
        inputChange && inputChange(text)
        
        me.setState(
            {
                selectedValue: null,
                selectedText: text
            }
        )

        if (inputChangeShouldCB) {
            me.props.onChange && me.props.onChange(null, text)
            inputChangeShouldCB = false
        }
    }

    optionClick = (value: any, text: string, disabled: boolean, e: any): void => {
        if (disabled) {
            e.nativeEvent.stopImmediatePropagation()
            return
        }

        const me = this
        const targetInput: HTMLInputElement = document.querySelector('.k-select-search-input-dom')

        me.setState(
            {
                selectedValue: value,
                selectedText: text,
                optionWrapperShow: false
            },
            function () {
                me.props.onChange && me.props.onChange(value, text)
                inputChangeShouldCB = true
                if (me.props.mode === 'combobox') {
                    targetInput.value = me.state.selectedText
                }
            }
        )
    }

    componentDidMount () {
        const me = this

        document.addEventListener('click', function () {
            me.setState(
                {
                    optionWrapperShow: false
                }
            )
        })
    }

    render() {
        const me = this
        const { style, children, placeholder, mode, defaultValue, clear, selectClassName, optionClassName } = me.props
         
        return  <div 
                    className={classNames(
                        selectCss['k-select'],
                        selectCss[selectClassName],
                        {[selectCss['k-select-active']]: me.state.optionWrapperShow}
                    )}
                    style={style}
                >
                    <div 
                        className={classNames(
                            selectCss['k-select-show-selected-area']
                        )} 
                        onClick={this.showOptionWrapper}
                        >
                        {
                            placeholder
                                ?   <div 
                                        className={selectCss["k-select-placeholder"]}
                                        style={
                                            me.state.selectedText === ''
                                            ?   {
                                                    
                                                }
                                            :   {
                                                    display: 'none'
                                                }
                                        }
                                    >
                                        {placeholder}
                                    </div>
                                :   null
                        }
                        {
                            clear
                                ?   <i 
                                        className={`${iconfontCss["k-select-iconfont"]} ${selectCss["k-select-clear"]}`}
                                        onClick={me.clearData}
                                        style={
                                            mode === 'combobox'
                                                ?   {right: 8}
                                                :   {}
                                        }
                                    >
                                        &#xe63d;
                                    </i>
                                :   null
                        }
                        {
                            mode === undefined || mode === 'default'
                                ?   [
                                        <div className={selectCss["k-select-selected-value"]} key="text">
                                            {
                                                me.state.selectedText
                                            }
                                        </div>,
                                        <i className={
                                            classNames(
                                                iconfontCss['k-select-iconfont'],
                                                selectCss['k-select-arrow']
                                            )
                                        } key="icon">&#xe726;</i>
                                    ]
                                :   null
                        }
                        {
                            mode === 'combobox'
                                ?   <div className={selectCss["k-select-search"]}>
                                        <input 
                                            className={`${selectCss["k-select-search-input"]} k-select-search-input-dom`}
                                            type="text"
                                            defaultValue={me.state.selectedText}
                                            onChange={me.inputChangeEvent}
                                        />
                                    </div>
                                :   null
                        }
                    </div>
                    <ul className={selectCss["k-select-option-wrapper"]} style={
                        me.state.optionWrapperShow  
                            ? {}
                            : {
                                display: 'none'
                            }
                    }>
                        {
                            React.Children.map(children, (child:React.ReactElement<any>) => {
                                let isSelected:boolean = false

                                if (child.props.value === me.state.selectedValue) {
                                    isSelected = true
                                }
                              
                                if (mode === 'combobox') {
                                    if (child.props.children.indexOf(me.state.selectedText) === -1) {
                                        return ''
                                    }
                                }

                                return React.cloneElement(child, {
                                    isSelected,
                                    optionClick: me.optionClick,
                                    optionClassName
                                })
                            })
                        } 
                    </ul>
                </div>
    }
}

export default Select
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
    value?: any
}

interface stateProps {
    selectedValue?: any
    selectedText?: string
    optionWrapperShow?: boolean
}

let inputChangeShouldCB: boolean = true
let currentValue: any = null

class Select extends React.Component<SelectProps, {}> {
    static Option = Option as React.ClassicComponentClass<OptionProps>

    state: stateProps
    blurTimer: any
    isOptionTarget: boolean = false

    constructor (props: SelectProps) {
        super(props)
        let selectedText: string = ''

        let value = props.defaultValue || props.value

        React.Children.forEach(props.children, (child:React.ReactElement<any>) => {
            if (child.props.value === value) {
                selectedText = child.props.children
            }
        })

        currentValue = value
   
        this.state = {
            selectedValue: value,
            selectedText,
            optionWrapperShow: false
        }
    }

    clearData = (e: any) => {
        const me = this
        const targetInput: HTMLInputElement = document.querySelector('.k-select-search-input-dom')
     
        me.setState(
            {
                selectedValue: null,
                selectedText: ''
            },
            function () {
                me.props.onChange && me.props.onChange('', '')
                currentValue = null
                if (me.props.mode === 'combobox') {
                    targetInput.value = ''
                }
            }
        )
    
        e && e.stopPropagation()
        e && e.nativeEvent.stopImmediatePropagation()
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

        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
    }

    hideOptionWrapper = (e: any) => {
        const me = this

        if (!me.isOptionTarget) {
            me.setState(
                {
                    optionWrapperShow: false
                }
            )
        }
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
            },
            function () {
                currentValue = null
            }
        )

        if (inputChangeShouldCB) {
            me.props.onChange && me.props.onChange(null, text)
            inputChangeShouldCB = false
        }
    }

    optionMouseDown = (e: any): void => {
        if (e.button === 0) {
            this.isOptionTarget = true
        }
       
    }

    optionClick = (value: any, text: string, disabled: boolean, e: any): void => {
        if (disabled) {
            e.stopPropagation()
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
                currentValue = value
                me.isOptionTarget = false
                if (me.props.mode === 'combobox') {
                    targetInput.value = me.state.selectedText
                }
            }
        )
    }

    componentWillReceiveProps (props: SelectProps) {
        const me = this
        
        if ('value' in props && props.value !== currentValue) {
            let text = ''
            React.Children.forEach(props.children, (child:React.ReactElement<any>) => {
                if (child.props.value === props.value) {
                    text = child.props.children
                }
            })
            me.setState(
                {
                    selectedValue: props.value,
                    selectedText: text
                },
                function () {
                    currentValue = props.value
                    me.props.onChange(props.value, text)
                    if (props.mode === 'combobox') {
                        const targetInput: HTMLInputElement = document.querySelector('.k-select-search-input-dom')
                        targetInput.value = text
                    }
                }
            )
        }
    }

    componentDidMount () {
        const me = this
    }

    render() {
        const me = this
        const { style, children, placeholder, mode, defaultValue, clear, selectClassName, optionClassName } = me.props
    
        return  <div 
                    className={classNames(
                        selectCss['k-select'],
                        selectClassName,
                        {[selectCss['k-select-active']]: me.state.optionWrapperShow}
                    )}
                    style={style}
                >
                    <div 
                        className={classNames(
                            selectCss['k-select-show-selected-area']
                        )} 
                        // onClick={this.showOptionWrapper.bind(null, 'xixi')}
                        onFocus={this.showOptionWrapper}
                        onBlur={this.hideOptionWrapper}
                        tabIndex={-1}
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
                                ?   me.state.selectedText.$$typeof === Symbol.for('react.element')
                                        ?   [
                                                <div className={selectCss["k-select-selected-reactnode-value"]} key="text">
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
                                        :   [
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
                    <ul 
                        className={selectCss["k-select-option-wrapper"]} 
                        style={
                            me.state.optionWrapperShow  
                                ? {}
                                : {
                                    display: 'none'
                                }
                        }
                    >
                        {
                            React.Children.map(children, (child:React.ReactElement<any>) => {
                                let isSelected:boolean = false

                                if (child.props.value === me.state.selectedValue) {
                                    isSelected = true
                                }
                              
                                if (mode === 'combobox') {
                                    if (child.props.children.$$typeof === Symbol.for('react.element')) {
                                        throw('在使用combobox时，不得使用reactnode')
                                    }
                                    if (child.props.children.indexOf(me.state.selectedText) === -1) {
                                        return ''
                                    }
                                }

                                return React.cloneElement(child, {
                                    isSelected,
                                    optionClick: me.optionClick,
                                    optionMouseDown: me.optionMouseDown,
                                    optionClassName
                                })
                            })
                        } 
                    </ul>
                </div>
    }
}

export default Select
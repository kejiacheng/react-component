import React, { Component } from 'react'
import './Upload.scss'

export default class Upload extends Component {
    state = {
        selectFiles: []
    }

    constructor () {
        super()
    }

    simulateInputClick = (e) => {
        e.currentTarget.previousSibling.click()
    }

    selectUploadingFiles = async (e) => {
        const
            me = this
        let
            target = e.currentTarget.files,
            selectFiles = me.state.selectFiles,
            noRepeat = true

        //添加并去重
        for (let i = 0; i < target.length; i++) {
            noRepeat = true

            selectFiles.forEach((file) => {
                if (Object.is(target[i].name, file.name)) {
                    noRepeat = false
                }
            })

            if (noRepeat) {
                selectFiles.push({
                    name: target[i].name,
                    file: target[i]
                })
                me.setState({selectFiles: selectFiles})
            }
        }

        await this.cbFilesData()
        this.generateFileList()
    }

    generateFileList = () => {
        const
            me = this
        let
            arr = []

        me.state.selectFiles.forEach((file) => {
            arr.push(
                <div className="file-item" key={file.name}>
                    <span className="file-item-name">{file.name}</span>
                    <span className="delete-file-item" onClick={me.deleteFileItem}>删除</span>
                </div>)
        })

        return arr
    }

    cbFilesData = () => {
        const
            me = this

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                me.props.cb(me.state.selectFiles)
                resolve()
            })
        })
    }

    deleteFileItem = (e) => {
        //考虑用户自己填写的fileList
        if (!Object.is(e.target.className, 'delete-file-item')) {
            return
        }

        let
            currentName = e.target.previousSibling.innerHTML
        const
            me = this

        me.state.selectFiles.forEach((file, index) => {
            if (Object.is(file.name, currentName)) {
                me.state.selectFiles.splice(index, 1)
                me.setState({selectFiles: me.state.selectFiles}, () => {
                    me.props.cb(me.state.selectFiles)
                })
            }
        })

        e.stopPropagation()
    }

    //在渲染后给用户自己填写的列表添加删除列事件
    componentDidUpdate () {
        const
            me = this

        if (me.props.children) {
            let
                fileList = document.getElementsByClassName('file-show-area')[0]

                fileList.addEventListener('click', me.deleteFileItem)
        }

    }

    render () {
        const { children, text = '点击上传',showFile = true, multiple, style } = this.props

        return (
            <div className="ke-upload">
                <div className="bt-area" style={style}>
                    <input type="file" className="ke-file" multiple={multiple} onChange={this.selectUploadingFiles.bind(this)}/>
                    <div className="ke-upload-content" onClick={this.simulateInputClick}>
                        <p>
                            {
                                Object.is(Object.prototype.toString.call(text), '[object String]')
                                    ? text
                                    : '点击上传'
                            }
                        </p>
                    </div>
                </div>
                {
                    showFile
                    ? children || <div className="file-show-area">{this.generateFileList()}</div>
                    : ''
                }
            </div>
        )
    }
}
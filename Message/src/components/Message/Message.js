/*
 * param
 * content 内容 默认为空
 * duration 持续时间 默认为3s
 * onClose 结束回调函数 默认空函数
 */
import React, { Component } from 'react'
import Notification from './Notification'
import classNames from 'classnames'
import './Message.scss'
import '../../styles/font/iconfont.scss'

let messageInstance
let key = 1

const getMessageInstance = () => {
    messageInstance = messageInstance || Notification.newInstance()

    return messageInstance
}

const notice = (content, duration = 3, type, onClose = function () {}) => {
    let iconType = ({
        info: <a className={classNames('iconfont', 'k-message-icon')}>&#xe61f;</a>,
        success: <a className={classNames('iconfont', 'k-message-icon')}>&#xe619;</a>,
        error: <a className={classNames('iconfont', 'k-message-icon')}>&#xe647;</a>,
        warning: <a className={classNames('iconfont', 'k-message-icon')}>&#xe644;</a>
    })[type]

    let instance = getMessageInstance()

    instance.notice(
        {
            key,
            duration,
            content: (
                <div className={classNames('k-message-custom-content', `k-message-${type}`)}>
                    {
                        iconType
                    }
                  <span>{content}</span>
                </div>
            ),
            onClose
        }
    )

    return (function () {
        let target = key++


        return function () {
            instance.removeNotice(target)
        }
    }())
}

export default {
    info (content, duration, onClose) {
        return notice(content, duration, 'info', onClose)
    },
    success (content, duration, onClose) {
        return notice(content, duration, 'success', onClose)
    },
    error (content, duration, onClose) {
        return notice(content, duration, 'error', onClose)
    },
    warning (content, duration, onClose) {
        return notice(content, duration, 'warning', onClose)
    }
}
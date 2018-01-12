import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './Message.scss'

const now = Date.now()
let seed = 0

function getUuid() {
    return 'kNotification_' + now + '_' + seed++
}

class Notification extends Component {
    constructor () {
        super()

        this.state = {
            notices: []
        }
    }

    add = (noticeProps) => {
        const me = this
        let arr = me.state.notices
        let key = noticeProps.key || getUuid()

        if (!arr.filter((v) => {
                return v.key === key
            }).length) {
            arr.push(
                noticeProps
            )
            let closeTimer = setTimeout(() => {
                me.remove(key)
                clearTimeout(closeTimer)
                closeTimer = null
                noticeProps.onClose()
            }, noticeProps.duration * 1000)
        }

        me.setState((prevStatus) => {
            return {
                notices: arr
            }
        })
    }

    remove = (key) => {
        const me = this

        me.setState(function (prevStatus) {
            return {
                notices: prevStatus.notices.filter((v) => {
                    return key !== v.key
                })
            }
        })
    }

    renderMessage = () => {
        const me = this
        let arr = []

        me.state.notices.forEach((it) => {
            arr.push(
                <div className="k-message-notice" key={it.key}>
                    <div className="k-message-notice-content">
                        {it.content}
                    </div>
                </div>
            )
        })

        return arr
    }

    render () {
        return (
            <div className="k-message">
                {
                    this.renderMessage()
                }
            </div>
        )
    }
}

Notification.newInstance = function newNotificationInstance(properties) {
    const div = document.createElement('div')
    document.body.appendChild(div)

    const notification = ReactDOM.render(<Notification/>, div)

    return {
        notice (noticeProps) {
            notification.add(noticeProps)
        },
        removeNotice (key) {
            notification.remove(key)
        },
        component: notification,
        destroy () {
            ReactDOM.unmountComponentAtNode(div)
            document.body.removeChild(div)
        }
    }
}

export default Notification
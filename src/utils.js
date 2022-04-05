export function bytesToSize(bytes, precision = 1) {
    const b = parseInt(bytes, 10)
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    if (b === 0) {
        return '0 KB'
    }
    const i = parseInt(Math.floor(Math.log(b) / Math.log(1024)), 10)
    if (i === 0) {
        return `${b} ${sizes[i]}`
    }
    return `${(b / (1024 ** i)).toFixed(precision)} ${sizes[i]}`
}

export function timeRemaining(totalLength, completedLength, downloadSpeed) {
    const remainingLength = totalLength - completedLength
    return Math.ceil(remainingLength / downloadSpeed)
}

/**
 * timeFormat
 * @param {int} seconds
 * @param {string} prefix
 * @param {string} suffix
 * @param {object} i18n
 * i18n: {
 *  gt1d: 'More than one day',
 *  hour: 'h',
 *  minute: 'm',
 *  second: 's'
 * }
 */
export function timeFormat(seconds, {prefix = '', suffix = ''}) {
    let result = ''
    let hours = ''
    let minutes = ''
    let secs = seconds || 0
    const i = {
        gt1d: '一天以上',
        hour: '小时',
        minute: '分钟',
        second: '秒',
    }

    if (secs <= 0) {
        return ''
    }
    if (secs > 86400) {
        return `${prefix} ${i.gt1d} ${suffix}`
    }
    if (secs > 3600) {
        hours = `${Math.floor(secs / 3600)}${i.hour} `
        secs %= 3600
    }
    if (secs > 60) {
        minutes = `${Math.floor(secs / 60)}${i.minute} `
        secs %= 60
    }
    secs += i.second
    result = hours + minutes + secs
    return result ? `${prefix} ${result} ${suffix}` : result
}

export function transStatus(status) {
    switch (status) {
        case "active":
            return "下载中"
        case "waiting ":
            return "等待中"
        case "paused":
            return "已暂停"
        case "complete":
            return "已完成"
        case "removed":
            return "已删除"
    }
}
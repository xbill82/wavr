export const timeToSeconds = time => {
  const timeArray = time.split(':')
  return parseInt(timeArray[0]) * 60 + parseInt(timeArray[1])
}

export const secondsToTime = seconds => {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)

  return `${notation(m, 2)}:${notation(s, 2)}`
}

export const notation = (num, length) => {
  let r = '' + num
  while (r.length < length) {
    r = '0' + r
  }
  return r
}

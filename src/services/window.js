let slaveWindow = null

export const getSlaveWindow = () => {
  if (!slaveWindow) {
    slaveWindow = window.open('/#/slave')
  }
  return slaveWindow
}

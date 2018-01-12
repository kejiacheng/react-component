const colors = ['orange', 'red', 'blue', 'gray', 'green']
const Log = {}

colors.forEach((color) => {
  Log[color] = function (...rest) {
    if (process.env.NODE_ENV !== 'production') {
      const args = rest
      if (typeof args[0] === 'string') {
        args[0] = `%c ${args[0]}`
        args.splice(1, 0, `color:${color};font-size:14px`)
      }

      window.console && console.log(...args)
    }
  }
})

export default Log
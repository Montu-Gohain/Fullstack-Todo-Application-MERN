const ms = require("ms")

module.exports = function (seconds=1) {
    return function delay (_, _, next) {
        setTimeout(next, ms(`${seconds}s`))
    }
}
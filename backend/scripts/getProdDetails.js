module.exports = function getProductionDetails(defaultPort) {
    const isInProduction = Boolean(process.env.PORT)
    const PORT = process.env.PORT || defaultPort
    return [ PORT, isInProduction ]
}
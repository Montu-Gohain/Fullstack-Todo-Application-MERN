module.exports = function setStatic (app, express) {
    const root = __dirname.replace("/backend/scripts", "")
    const build = `${root}/client/build`
    app.use(express.static(build))
    app.get("*", (_, res) => res.sendFile(`${build}/index.html`))
}
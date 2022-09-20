/*
 * @Description:
 * @version:
 * @Author: LuyunSheng
 * @Date: 2022-09-02 02:21:32
 * @LastEditTime: 2022-09-02 02:22:24
 */
// app.js

module.exports = app => {
    app.once('server', server => {
        // websocket
    });
    app.on('error', (err, ctx) => {
        // report error
    });
    app.on('request', ctx => {
        // log receive request
    });
    app.on('response', ctx => {
        // ctx.starttime is set by framework
        // log total cost
    });
};

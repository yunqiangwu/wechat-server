const Koa = require('koa');
const path = require('path');
const serve = require('koa-static');
const route = require('koa-route');
const bodyParser = require('koa-bodyparser');
const wechatServer = require('./wechatServer').default;




const {
    PORT = 3000,
        HOST = '0.0.0.0',
        WECHAT_TO = '李宁',
        EMAIL_TO = '842269153@qq.com',
} = process.env;

const wechatCtl = wechatServer(EMAIL_TO);
const app = new Koa();

app.use(bodyParser());

app.use(async(ctx, next) => {

    let request = ctx.request;
    // body = ctx.request.body;
    if (ctx.request.url.startsWith("/hook")) {
        ctx.body = '{"msg": "client收到hook请求"}';
        return;
    }

    await next();

});

app.use(serve(path.join(__dirname, '../public')));

app.use(route.get('/', ctx => {
    ctx.response.redirect('/index.html');
    ctx.response.body = '<a href="/index.html">Index Page</a>';
}));

let wechatHandle = ctx => {
    let query = ctx.query;
    let body = ctx.request.body;

    const args = Object.assign({}, query, body);

    const {
        msg = 'test_msg',
            to = WECHAT_TO,
    } = args;

    wechatCtl.sendMsg(msg, to);
    ctx.body = '{"msg": "消息转发微信"}';
    return;
};

app.use(route.get('/notice', wechatHandle));
app.use(route.post('/notice', wechatHandle));
app.use(route.get('/login-img',
    ctx => {
        let loginImg = wechatCtl.getLoginImg();
        if (loginImg) {
            ctx.body = `<img src="${loginImg}" />`;
        } else {
            ctx.body = '{"msg": "可能已经登录"}';
        }
    }))

app.listen(PORT);
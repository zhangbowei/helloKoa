// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');


// 创建一个Koa对象表示web app本身:
const app = new Koa();

app.use(bodyParser());
// 对于任何请求，app将调用该异步函数处理请求：
// app.use(async (ctx, next) => {
//     if (await checkUserPermission(ctx)) {
//         await next();
//     } else {
//         ctx.response.status = 403;
//     }
// });

app.use(controller());
app.use(async (ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`);
    await next();
});

app.use(async (ctx, next) => {
    const start = new Date().getTime();
    await next();
    const interval = new Date().getTime() - start;
    console.log(`Time: ${interval} ms`);
})

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');
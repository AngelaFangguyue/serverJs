var http = require("http");
var fs = require("fs");
var url = require("url");
var port = process.argv[2];

if (!port) {
  console.log("请指定端口号好不啦？\nnode server.js 8888 这样不会吗？");
  process.exit(1);
}

var server = http.createServer(function(request, response) {
  // console.log("0:" + request);
  var parsedUrl = url.parse(request.url, true);
  // console.log("1:" + parsedUrl);
  var pathWithQuery = request.url;
  // console.log("2:" + pathWithQuery);
  var queryString = "";
  if (pathWithQuery.indexOf("?") >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf("?"));
  }
  var path = parsedUrl.pathname;
  var query = parsedUrl.query;
  var method = request.method;

  /******** 从这里开始看，上面不要看 ************/

  console.log("有个傻子发请求过来啦！路径（带查询参数）为：" + pathWithQuery);
  // console.log("4:" + parsedUrl);

  if (path === "/") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    // response.write(`你所发送的请求为：` + parsedUrl);
    // response.write(`二哈`);
    response.write(`<!DOCTYPE html>
    <head><link rel="stylesheet" href="/x"/></head><body><span>好春光不如梦一场</span>
    <script src="/z"></script></body>`);
    response.end();
  } else if (path === "/x") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/css;charset=utf-8");
    response.write(
      `span{color:pink;border:10px solid green;font-weight:bold;padding:40px;}`
    );
    response.end();
  } else if (path === "/z") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/javascript;charset=utf-8");
    response.write(`console.log("hi,你好啊，树先生")`);
    response.end();
  } else {
    response.statusCode = 404;
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    response.write(`你输入的路径不存在对应的内容`);
    response.end();
  }

  /******** 代码结束，下面不要看 ************/
});

server.listen(port);
console.log(
  "监听 " +
    port +
    " 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:" +
    port
);

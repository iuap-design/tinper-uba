module.exports = {
  //web服务上下文
  "webContext":"iuap-quickstart",
  //入口js
  "entry": {
    "index": "src/index.js",
  },
  //入口html
  "entryHtmlFiles":[
    {
      template:"src/index.html",
      filename:"index.html"
    }
  ],
  //模拟后端服务, 如已经在webapck-dev-server中启用后端代理服务，应关掉mockServer //TODO 开发中
  mockServer:{
    //是否启用
    enable: false,
    //app.serverEvent().fire访问的后端url地址
    dispatchUrl:"/iuap-example/evt/dispatch",
    //后端请求映射
    requestMapping:[{
      type:"post",
      url:"/ctrl1/method1",
      json:"path1/json1.json",
    }]
  },
  /**
   * 工程部署到maven服务器
   command:为mvn命令的path
   注意：repository是Snapshot的，Version必须以-SNAPSHOT结尾
   **/
  publish:{
    command:"mvn",
    repositoryId:"iWeb",
    repositoryURL:"http://maven.yonyou.com/nexus/content/repositories/iWeb/",
    artifactId:"demo",
    groupId:"iuap.web.test",
    version:"0.0.1-SNAPSHOT"
  }
}
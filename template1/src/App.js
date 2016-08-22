import React, { Component } from 'react';
import logo from './logo-big.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome</h2>
        </div>
        <p className="App-intro">
          uba友情提示:项目演示模板生成完毕,可以修改`src/App.js`里面的文件,uba会自动刷新页面,修改css无需自动刷新即可更改!
        </p>
      </div>
    );
  }
}

export default App;

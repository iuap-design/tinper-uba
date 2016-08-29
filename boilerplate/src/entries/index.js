import '../static/index.css';
import {generateText} from '../components/index';
var app = document.createElement('div');
app.innerHTML = '<h1>Hello World</h1>';
app.appendChild(generateText());
document.body.appendChild(app);
import dva from 'dva-react2';
import IndexPage from './routes/IndexPage';
import './index.css';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/example'));

// 4. Router
// app.router(require('./router'));

app.mount(IndexPage);

// 5. Start
app.start('#root');

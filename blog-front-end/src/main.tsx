import ReactDOM from 'react-dom/client'
import './rem'
import App from './App'
import { Provider } from 'react-redux'
import store from '@/store'
import "antd/dist/antd.css";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
      <App />
  </Provider>
)

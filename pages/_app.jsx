import 'antd/dist/antd.css';
import '../styles/globals.scss';
import {store} from '../redux/store';
import {Provider} from "react-redux";

function App({Component, pageProps}) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}

export default App
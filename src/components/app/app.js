import './app.css';
import Header from '../header/header-container';
import { Route } from 'react-router-dom';
import Forecast from '../forecast/forecast-container';

function App() {


    return (
        <div className="app">
            <Header />
            <Route path="/:city?/:days?" component={Forecast} />
        </div>
    );
}

export default App;

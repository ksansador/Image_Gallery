import {Route, Switch} from "react-router-dom";
import Layout from "./components/UI/Layout/Layout";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";


const App = () => {

    return (
        <Layout>
            <Switch>
                <Route path="/register" exact component={Register}/>
                <Route path="/login" exact component={Login}/>
            </Switch>
        </Layout>
    );
}

export default App;
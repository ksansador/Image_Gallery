import {Route, Switch} from "react-router-dom";
import Layout from "./components/UI/Layout/Layout";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import Cards from "./containers/Cards/Cards";
import UserCard from "./containers/UserCards/UserCard";
import Requests from "./containers/Requests/Requests";


const App = () => {

    return (
        <Layout>
            <Switch>
                <Route path={'/'} exact component={Cards}/>
                <Route path={'/users/:id'} component={UserCard}/>
                <Route path={'/requests'} component={Requests}/>
                <Route path="/register" exact component={Register}/>
                <Route path="/login" exact component={Login}/>
            </Switch>
        </Layout>
    );
}

export default App;
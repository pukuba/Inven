import React from "react"
import PropTypes from "prop-types"
import {Switch, Route} from "react-router-dom"
import Main from "../Routes/Main"
import Login from "../Routes/Login"
import SignUp from "../Routes/Signup"
// import NotFound from "../pages/notfound"


const LogIn = () => (
    <Switch>
        <Route exact path="/" component={Main} />
    </Switch>
)

const LogOut = () => (
    <Switch>
        {/* <Route exact path="/" component={Auth} /> */}
        <Route exact path="/" component={Login} />
        <Route exact path="/Signup" component={SignUp} />
        {/* <Route component={NotFound}></Route> */}
    </Switch>
)

const Routes = ({check}) => (check ? <LogIn /> : <LogOut/>)

Routes.propTypes = {
    check: PropTypes.bool.isRequired
}

export default Routes
import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../api/API';
import Login from "./Login";
import Signup from "./Signup";
import AccountDetails from "./AccountDetails";
import Message from "./Message";
import Welcome from "./Welcome";
import AfterLogin from "./AfterLogin";

class NewerHomePage extends Component {

    constructor(props) {
        super(props);
        this.uncheck=this.uncheck.bind(this);
        this.handler=this.handler.bind(this);
        this.state = {
            isLoggedIn: false,
            message: '',
            username: '',
            issignin: true
        };
    }
    handleSubmit = (userdata) => {

        API.doLogin(userdata)
            .then((status) => {

                if (status === 201) {
                    this.setState({
                        isLoggedIn: true,
                        message: "Welcome to my App..!!",
                        username: userdata.username
                    });
                    this.props.history.push("/welcome");
                } else if (status === 401) {
                    this.setState({
                        isLoggedIn: false,
                        message: "Wrong username or password. Try again..!!"
                    });
                }
            });
    };

    handleSubmit2 = (userdata) => {
        API.dosignup(userdata)
            .then((status) => {
                if (status === 201) {
                    this.setState({

                        message: "Signup Sucessful Please Login..!!",

                    });

                } else if (status === 401) {
                    this.setState({

                        message: "User Already exists..!!"
                    });
                }
            });
    };

    handleLogout = () => {
        API.Logout()
            .then((status) => {
                if (status === 201) {
                    this.setState({
                        isLoggedIn: false
                    });
                    this.props.history.push("/");
                }

            });

    };

    uncheck()
    {
        this.setState(
            {
                issignin:true
            }
        );
    }

    handler()
    {
        this.setState(
            {
                issignin:false
            }
        );
    }


    render() {
        return (
            <div className="container-fluid">
                <Route exact path="/" render={() => (
                    <div>
                        <br/>
                        <img src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_glyph_2015_2016-vflzSDxC1.svg" height="40"/>
                        <img src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_text_2015_2016-vflQnXBUU.svg" height="40" />
                    <hr/>
                        <img className="adjust" src="https://cfl.dropboxstatic.com/static/images/empty_states/sign-in-vflchypbO.png" height="400"/>

                        <div>{this.state.issignin ? <Login check={this.handler} handleSubmit={this.handleSubmit}/>:<Signup check={this.uncheck} handleSubmit2={this.handleSubmit2}/>}</div>


                        <Message message={this.state.message}/>
                    </div>
                )}/>

                <Route exact path="/welcome" render={() => (
                   // <Welcome username={this.state.username}/>

                    <AfterLogin handleLogout={this.handleLogout}/>
                )}/>

                <Route exact path="/details" render={() => (
                    // <Welcome username={this.state.username}/>

                    <AccountDetails/>
                )}/>

            </div>
        );
    }
}

export default withRouter(NewerHomePage);
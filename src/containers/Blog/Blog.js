import React, { Component } from 'react';
import './Blog.css';
import Posts from './Posts/Posts';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom'
//import NewPost from './NewPost/NewPost';
//import FullPost from './FullPost/FullPost';
import asyncComponent from '../../hoc/asyncComponent';

const AsyncNewPost = asyncComponent(()=> {
    return import('./NewPost/NewPost');
});

class Blog extends Component {

    state = {
        auth: true,
    }

    render () {


        //console.log(this.props);

        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink exact to="/">Home</NavLink></li>
                            <li><NavLink to="/post">Post</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post', //absolute path
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>

                {/*<Route path="/" exact render={() => <Posts/>} />
                <Route path="/new-post" exact render={() => <Posts/>} />*/}

                <Route path="/" exact render={() => <h1>Home</h1>}/>
                <Switch> {/* Switch loads the first link that matches check*/}
                    <Route path="/post" component={Posts} />
                    {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null }
                    <Route render={()=><h1>404 NOT FOUND - This is a catch all</h1>} />
                    {/* <Redirect from='/' to='/post'/>
                    <Route path="/post/:id" component={FullPost} /> */}
                </Switch>


            </div>
        );
    }
}

export default Blog;
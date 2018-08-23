import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    state = {
        posts:[],
        users:[],
        selectedPostId: null,
    }

    componentDidMount(){
         axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                const posts = response.data.slice(0,4);
                const updatePosts = posts.map(post =>{
                    return {
                        ...post
                    }
                })
                this.setState({posts:updatePosts})
                //console.log(response);
            }); 
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                const authors = response.data.map(author =>{
                    return {
                        ...author
                    }
                })

                this.setState({users: authors});
            });       
    }

    getAuthorName=(userId)=>{
        const allUsers = this.state.users;
        return allUsers.map(authors=>{

            let list = '';
            if(authors.id === userId){
                list = authors.name;
            }
            return list;
        })
        
    }

    postSelectHandler=(id)=>{
        this.setState({selectedPostId: id});
    }

    render () {

        const posts = this.state.posts.map(post =>{
            return <Post 
                key={post.id} 
                title={post.title} 
                author={this.getAuthorName(post.userId)}
                clicked={()=>this.postSelectHandler(post.id)}/>
            }
        );

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;
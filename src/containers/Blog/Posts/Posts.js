import React, {Component} from 'react';
import Post from '../../../components/Post/Post';
import axios from '../../../axios';
import './Posts.css';
//import {Link} from 'react-router-dom';
import FullPost from '../FullPost/FullPost';
import {Route} from 'react-router-dom'

class Posts extends Component{
    state = {
        posts:[],
        users:[],
        //selectedPostId: null,
        //error: false,
    }

    componentDidMount(){

        //console.log(this.props);

        axios.get('/posts')
           .then(response => {
               const posts = response.data.slice(0,6);
               const updatePosts = posts.map(post =>{
                   return {
                       ...post
                   }
               })
               this.setState({posts:updatePosts})
           })
           .catch(error => {
               this.setState({error: true});
           }); 
       axios.get('/users')
           .then(response => {
               const authors = response.data.map(author =>{
                   return {
                       ...author
                   }
               })

               this.setState({users: authors});
           })
           .catch(error => {
               this.setState({error: true});
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
        //this.setState({selectedPostId: id});
        
        //Navigating Programmically
        this.props.history.push({pathname: '/post/'+id});
    }



    render(){

        let posts = <p style={{textAlign: 'center'}}>Something went wrong!!!</p>
        if(!this.state.error){
            posts = this.state.posts.map(post =>{
                return (
                
                        //<Link key={post.id} to={'/post/'+post.id} >
                            <Post 
                                key={post.id}
                                title={post.title} 
                                author={this.getAuthorName(post.userId)}
                                clicked={()=>this.postSelectHandler(post.id)}/>
                        //</Link>
                    );
                }
            );
        }


        return (
        <div>   
            <section className="Posts">
                {posts}
            </section>
            <hr/>
            <Route path={this.props.match.url+'/:id'} component={FullPost} />
        </div>
        );
    }
}

export default Posts
import React, {Component} from 'react';
import axios from 'axios';

class Posts extends Component{
    state = {
        posts:[],
        users:[],
        selectedPostId: null,
        error: false,
    }

    componentDidMount(){
        axios.get('/posts')
           .then(response => {
               const posts = response.data.slice(0,4);
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
    this.setState({selectedPostId: id});
    }



    render(){

        let posts = <p style={{textAlign: 'center'}}>Something went wrong!!!</p>
        if(!this.state.error){
            posts = this.state.posts.map(post =>{
                return <Post 
                    key={post.id} 
                    title={post.title} 
                    author={this.getAuthorName(post.userId)}
                    clicked={()=>this.postSelectHandler(post.id)}/>
                }
            );
        }


        return (
        <section className="Posts">
            {posts}
        </section>
        );
    }
}

export default Posts
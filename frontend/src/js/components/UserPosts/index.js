import React from 'react';
import { Button } from 'react-bootstrap';

export default class UserPosts extends React.Component {
    render(){
      const { postlist } = this.props;
      const result = postlist.map((post,i)=>(
        <li key={i}>
        <div className='panel panel-default'>
        <div className='panel-body'>
        <div className='row'>
          <div className='col-sm-12' >
            <h4 className='postlist-username'>
              {this.props.userName}
            </h4>
            <span className='label label-info post-content'>{post.postTime} </span>
           <div>
             {post.content}
         </div>
        </div>
      </div>
      </div>
      </div>
      </li>
      ))
      return (
          <ul>
            {result}
          </ul>
      )
    }
}

import React from 'react';
import {Comment} from '../Comment/Comment';

import './CommentsList.scss';

export function CommentsList(props) {
    if (props.comments.length === 0) {
        return <p className="comments-list-empty">{props.emptyStateMsg || 'No comments'}</p>
    }

    return (
        <ul className="comments-list">
        {
            props.comments.map(comment => 
                <li className="comments-list-item" key={comment._id}>
                    <Comment 
                        userPicURL={comment.userPicURL}
                        userID={comment.email} 
                        text={comment.text}/>
                </li>
            )
        }
        </ul>
    )
}
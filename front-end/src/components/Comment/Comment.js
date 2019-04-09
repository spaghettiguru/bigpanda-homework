import React from 'react';

import './Comment.scss';

export function Comment(props) {
    return (
        <div className="comment">
            <img src={props.userPicURL} className="comment-pic" alt="Comment author" />
            <span className="comment-author">{props.userID}</span>
            <span className="comment-text">{props.text}</span>
        </div>
    )
}
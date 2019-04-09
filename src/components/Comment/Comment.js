import React from 'react';

import './Comment.scss';

export function Comment(props) {
    return (
        <div class="comment">
            <img src={props.userPicURL} className="comment-pic" />
            <span className="comment-author">{props.userID}</span>
            <span className="comment-text">{props.text}</span>
        </div>
    )
}
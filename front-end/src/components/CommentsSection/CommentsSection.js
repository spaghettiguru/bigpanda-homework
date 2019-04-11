import React, {Component} from 'react';

import {NewCommentForm} from '../NewCommentForm/NewCommentForm';
import {Comment} from '../Comment/Comment';

import './CommentsSection.scss'

// TODO: move to global config file
const COMMENTS_SERVICE_URL = 'http://localhost:3001/';

export class CommentsSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterText: '',
            comments: null,
            commentsFetchError: false,
            isLoadingComments: false
        };

        this.filterTextChanged = this.filterTextChanged.bind(this);
    }

    async componentDidMount() {

        // using single partial state object to prevent unnecessary calls to setState 
        // (and as a result consecutive re-renders)
        const stateToUpdate = {};
        try {
            this.setState({
                isLoadingComments: true
            });
            stateToUpdate.comments = await this.fetchComments();
        } catch(error) {
            stateToUpdate.commentsFetchError = true;
            console.error(error.message);
        } finally {
            stateToUpdate.isLoadingComments = false;
            this.setState(stateToUpdate);
        }
    }

    render() {
        const {comments, filterText} = this.state;

        return (
            <div className="comments">
                <NewCommentForm onSubmit={this.postComment} />
                <input 
                    type="text" 
                    value={filterText} 
                    onChange={this.filterTextChanged}
                    placeholder="Filter"
                    className="comments-filter-input" />

                {comments && comments.length > 0 ? 
                    (<ul className="comments-list">
                    {
                        comments.map(
                            comment => 
                            <li className="comments-list-item" key={comment._id}>
                                <Comment 
                                    userPicURL={comment.userPicURL}
                                    userID={comment.email} 
                                    text={comment.text}/>
                            </li>
                        )
                    }
                    </ul>) 
                    :
                    (<p className="empty-state-message">{this.getEmptyStateMessage()}</p>)
                }
            </div>
        )
    }

    async filterTextChanged(e) {
        // TODO: implement debounce
        const filterText = e.target.value;
        this.setState({
            filterText,
            isLoadingComments: true
        });

        let filteredComments;
        try {
            filteredComments = await this.fetchComments(filterText);
        } catch(error) {
            filteredComments = null;
            // TODO: set error flag in the state to true
            console.error(error.message);
        } finally {
            this.setState({
                comments: filteredComments,
                isLoadingComments: false
            });
        }
    }

    // TODO: move to the separate module
    postComment(comment) {

        return fetch(COMMENTS_SERVICE_URL, {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify(comment)
        })
    }

    // TODO: move to the separate module
    fetchComments(email) {
        let requestURL = COMMENTS_SERVICE_URL;
        if (email) {
            requestURL += '?email=' + email;
        }
        return fetch(requestURL)
            .then(response => response.json())
    }

    getEmptyStateMessage() {
        const {comments, isLoadingComments, commentsFetchError, filterText} = this.state;

        if (comments && comments.length === 0 ) {
            if (filterText) {
                return 'No comments found that satisfy the specified filter criterion.'
            } else {
                return 'No comments yet.'
            }
        }

        if (isLoadingComments) {
            return 'Loading comments...'
        }

        if (commentsFetchError) {
            return 'Network error occured during comments retrieval. Please try refreshing the page.'
        }
    }
}
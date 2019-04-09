import React, {Component} from 'react';

import {NewCommentForm} from '../NewCommentForm/NewCommentForm';
import {Comment} from '../Comment/Comment';

import './CommentsSection.scss'

// TODO: move to global config file
const COMMENTS_SERVICE_BASE_URL = 'http://localhost:3001/';

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
        return (
            <div className="comments">
                <NewCommentForm onSubmit={this.postComment} />
                <input 
                    type="text" 
                    value={this.state.filterText} 
                    onChange={this.filterTextChanged}
                    placeholder="Filter"
                    className="comments-filter-input" />
                {this.state.comments && <ul className="comments-list">
                    {
                        this.state.comments.map(
                            comment => 
                            // TODO: change key to be unique
                            <li className="comments-list-item" key={comment.userID}>
                                <Comment 
                                    userPicURL={comment.userPicURL}
                                    userID={comment.userID} 
                                    text={comment.text}/>
                            </li>
                        )
                    }
                </ul>}
                {this.state.isLoadingComments && <p className="empty-state-message">Loading comments...</p>}
                {this.state.comments && this.state.comments.length === 0 && 
                    <p className="empty-state-message">No comments found that satisfy the specified filter criterion.</p>}
                {this.state.commentsFetchError && 
                    <p className="empty-state-message">Network error occured during comments retrieval. Please try refreshing the page.</p>}
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

    postComment(comment) {
        // TODO: implement
        console.log('posting comment: ', comment);
    }

    // TODO: move to the separate module
    fetchComments(email) {
        let requestURL = COMMENTS_SERVICE_BASE_URL;
        if (email) {
            requestURL += '?email=' + email;
        }
        return fetch(requestURL)
            .then(response => response.json())
    }
}
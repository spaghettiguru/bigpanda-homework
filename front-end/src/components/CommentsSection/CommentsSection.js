import React, {Component} from 'react';

import {NewCommentForm} from '../NewCommentForm/NewCommentForm';
import {Comment} from '../Comment/Comment';
import {commentsService} from '../../services/comments';

import './CommentsSection.scss'

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
        this.postComment = this.postComment.bind(this);
    }

    componentDidMount() {
        this.fetchComments();
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
            filterText
        });

        this.fetchComments(filterText);
    }

    postComment(comment) {
        return commentsService.postComment(comment).then(() => {
            this.fetchComments(this.state.filterText);
        })
    }

    async fetchComments(email) {
        this.setState({
            isLoadingComments: true
        });

        // using shared state update object to prevent consecutive calls to setState 
        // (and as a result unnecessary re-renders)
        const stateToUpdate = {};
        try {
            stateToUpdate.comments = await commentsService.fetchComments(email);
        } catch(error) {
            stateToUpdate.commentsFetchError = true;
            stateToUpdate.comments = null;
            console.error('Error occured while fetching comments from the server: ', error);
        } finally {
            stateToUpdate.isLoadingComments = false;
            this.setState(stateToUpdate);
        }
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
            return 'Network error occured during comments retrieval.'
        }
    }
}
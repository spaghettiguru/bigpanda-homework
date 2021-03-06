import React, {Component} from 'react';
import debounce from 'lodash.debounce';

import {NewCommentForm} from '../NewCommentForm/NewCommentForm';
import {CommentsList} from '../CommentsList/CommentsList';
import {commentsService} from '../../services/comments';

import './CommentsSection.scss'

export class CommentsSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterText: '',
            comments: null,
            commentsFetchError: false,
            isLoadingComments: false,
            lastResultsFiltered: false
        };

        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.filterTextChangedDebounced = debounce(this.filterTextChanged, 250);
        this.postComment = this.postComment.bind(this);
    }

    componentDidMount() {
        this.fetchComments();
    }

    componentWillUnmount() {
        this.filterTextChangedDebounced.cancel();
    }

    render() {
        const {comments, filterText, commentsFetchError, isLoadingComments} = this.state;

        return (
            <div className="comments">
                <NewCommentForm onSubmit={this.postComment} />
                <input 
                    type="text" 
                    value={filterText} 
                    onChange={this.handleFilterChange}
                    placeholder="Filter"
                    className="comments-filter-input" />
                <div className="comments-feed">
                    {!isLoadingComments && comments && 
                        <CommentsList 
                            comments={comments}
                            emptyStateMsg={this.getEmptyStateMessage()} />}
                    {commentsFetchError && 
                        <p className="comments-fetch-error">Network error occured during comments retrieval.</p>}
                    {isLoadingComments && <p className="comments-loader">Loading...</p>}
                </div>
            </div>
        )
    }

    handleFilterChange(e) {
        this.setState({
            filterText: e.target.value
        });
        
        // see https://reactjs.org/docs/faq-functions.html#debounce
        this.filterTextChangedDebounced(e.target.value);
    }

    async filterTextChanged(filterText) {
        this.fetchComments(filterText);
    }

    postComment(comment) {
        return commentsService.postComment(comment).then((newComment) => {
            this.setState((state) => ({
               comments: state.comments.concat(newComment) 
            }));
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
            stateToUpdate.lastResultsFiltered = !!email;
        } catch(error) {
            stateToUpdate.commentsFetchError = true;
            stateToUpdate.comments = null;
        } finally {
            stateToUpdate.isLoadingComments = false;
            this.setState(stateToUpdate);
        }
    }

    getEmptyStateMessage() {
        const {comments, lastResultsFiltered} = this.state;

        if (comments && comments.length === 0 ) {
            if (lastResultsFiltered) {
                return 'No comments found that satisfy the specified filter criterion.'
            } else {
                return 'No comments yet.'
            }
        }

        return ''
    }
}
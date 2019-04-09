import React, {Component} from 'react';

import {NewCommentForm} from '../NewCommentForm/NewCommentForm';
import {Comment} from '../Comment/Comment';

import './CommentsSection.scss'

export class CommentsSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterText: '',
            comments: null,
            commentsFetchError: false
        };

        this.filterTextChanged = this.filterTextChanged.bind(this);
    }

    async componentDidMount() {
        
        // TODO: extract comments fetching to the separate method
        try {
            const comments  = await fetch('http://localhost:3001/').then(response => response.json());
            this.setState({
                comments
            });
        } catch(error) {
            this.setState({
                commentsFetchError: true
            });
            console.error(error.message);
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
                            <li className="comments-list-item" key={comment.userID}>
                                <Comment 
                                    userPicURL={comment.userPicURL}
                                    userID={comment.userID} 
                                    text={comment.text}/>
                            </li>
                        )
                    }
                </ul>}
                {!this.state.comments && !this.state.commentsFetchError && <p>Loading comments...</p>}
                {this.state.commentsFetchError && <p>Network rrror occured during comments retrieval. Please try refreshing the page.</p>}
            </div>
        )
    }

    filterTextChanged(e) {
        this.setState({
            filterText: e.target.value
        });
    }

    postComment(comment) {
        console.log('posting comment: ', comment);
    }
}
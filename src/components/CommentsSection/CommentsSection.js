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
        try {
            const comments  = await Promise.resolve([
                {userID: 'yuzvik.oleg@gmail.com', text: 'No comments.', userPicURL: ''},
                {userID: 'john.doe@mail.ru', text: 'There is a very long comment here.', userPicURL: ''},
                {userID: 'fakemail@fake.com', text: 'My email is fake, so is this comment.', userPicURL: ''}
            ]);
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
            <div className="comments-section">
                <NewCommentForm />
                <input 
                    type="text" 
                    value={this.state.filterText} 
                    onChange={this.filterTextChanged}
                    placeholder="Filter" />
                {this.state.comments && <ul className="comments-list">
                    {
                        this.state.comments.map(
                            comment => 
                            <li className="comment-item" key={comment.userID}>
                                <Comment userID={comment.userID} text={comment.text}/>
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
}
import React, {Component} from 'react';

import './NewCommentForm.scss';

export class NewCommentForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form onSubmit={this.submitForm} className="new-comment-form">
                <input type="email" placeholder="Email" />
                <textarea placeholder="Message"></textarea>
                <button className="submit-comment-btn">Submit</button>
            </form>
        )
    }

    submitForm(e) {
        e.preventDefault();
        this.props.onSubmit(new FormData(e.target));
    }
}
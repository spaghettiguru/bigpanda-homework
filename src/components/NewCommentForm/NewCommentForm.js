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
                <textarea placeholder="Message" rows="5"></textarea>
                <button className="submit-comment-btn button-primary">Submit</button>
            </form>
        )
    }

    submitForm(e) {
        e.preventDefault();
        this.props.onSubmit(new FormData(e.target));
    }
}
import React, {Component} from 'react';

import './NewCommentForm.scss';

export class NewCommentForm extends Component {
    constructor(props) {
        super(props);

        this.submitForm = this.submitForm.bind(this);
    }

    render() {
        return (
            <form onSubmit={this.submitForm} className="new-comment-form">
                <input type="email" name="email" placeholder="Email" required />
                <textarea placeholder="Message" name="text" rows="5" required></textarea>
                <button className="submit-comment-btn button-primary">Submit</button>
            </form>
        )
    }

    submitForm(e) {
        e.preventDefault();
        this.props.onSubmit(new FormData(e.target));
    }
}
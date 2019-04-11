import React, {Component} from 'react';

import './NewCommentForm.scss';

export class NewCommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            text: '',
            submitInProgress: false,
            lastSubmitFailed: false
        };

        this.onCommentTextChanged = this.onCommentTextChanged.bind(this);
        this.onEmailChanged = this.onEmailChanged.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    render() {
        return (
            <form onSubmit={this.submitForm} className="new-comment-form">
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.onEmailChanged} 
                    className="email-field"
                    required />
                <textarea 
                    placeholder="Message" 
                    name="text" 
                    rows="5" 
                    value={this.state.text}
                    onChange={this.onCommentTextChanged}
                    className="message-field"
                    required />
                {this.state.lastSubmitFailed && <span className="form-error">
                    Error occured during the submission of the comment. <br />
                    Please, try again.
                </span>}
                <button 
                    className="submit-comment-btn button-primary" 
                    disabled={this.state.submitInProgress}
                >Submit</button>
            </form>
        )
    }

    onEmailChanged(e) {
        this.setState({
            email: e.target.value
        });
    }

    onCommentTextChanged(e) {
        this.setState({
            text: e.target.value
        });
    }

    async submitForm(e) {
        e.preventDefault();
        this.setState({
            submitInProgress: true,
            lastSubmitFailed: false
        });

        let stateToUpdate = {};

        try {
            await this.props.onSubmit({
                email: this.state.email,
                text: this.state.text
            });

            // we want to reset form fields when the comment was posted successfully
            stateToUpdate = {
                email: '',
                text: ''
            };
        } catch (error) {
            stateToUpdate.lastSubmitFailed = true;
        } finally {

            // resetting submitInProgress flag in finally block allows us to only do it once
            // (instead of doing it in both try and catch clauses)
            stateToUpdate.submitInProgress = false;
            this.setState(stateToUpdate);
        }
    }
}
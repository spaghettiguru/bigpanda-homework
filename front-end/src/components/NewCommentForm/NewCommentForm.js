import React, {Component} from 'react';

import './NewCommentForm.scss';

export class NewCommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            text: '',
            formSubmitInProgress: false
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
                    required />
                <textarea 
                    placeholder="Message" 
                    name="text" 
                    rows="5" 
                    value={this.state.text}
                    onChange={this.onCommentTextChanged}
                    required />
                <button 
                    className="submit-comment-btn button-primary" 
                    disabled={this.state.formSubmitInProgress}
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
            formSubmitInProgress: true
        });

        // TODO: handle exceptions
        await this.props.onSubmit({
            email: this.state.email,
            text: this.state.text
        });

        // reset form fields
        this.setState({
            email: '',
            text: '',
            formSubmitInProgress: false
        });
    }
}
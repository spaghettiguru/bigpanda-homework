import React, {Component} from 'react';

export class CommentsSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterText: '',
            comments: null
        };

        this.filterTextChanged = this.filterTextChanged.bind(this);
    }

    render() {
        return (
            <div className="comments-section">
                <div>New comment form placeholder</div>
                <input 
                    type="text" 
                    value={this.state.filterText} 
                    onChange={this.filterTextChanged}
                    placeholder="Filter" />
                <div>Comments list placeholder</div>
            </div>
        )
    }

    filterTextChanged(e) {
        this.setState({
            filterText: e.target.value
        });
    }
}
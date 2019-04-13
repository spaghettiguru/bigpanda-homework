// TODO: move to global config file?
const COMMENTS_SERVICE_URL = 'http://localhost:3001/';

export class CommentsService {
    constructor(serviceURL) {
        this.serviceURL = serviceURL;
    }

    async fetchComments(email) {
        let requestURL = this.serviceURL;
        if (email) {
            requestURL += '?email=' + email;
        }

        let response;
        try {
            response = await fetch(requestURL);
            if (!response.ok) {
                throw new Error('Server returned error.');
            }
        } catch(error) {
            console.error('Error occured while fetching comments from the server: ', error);
            throw error
        }

        let comments;
        try {
            comments = await response.json();
        } catch (error) {
            console.error('Failed to parse server\'s response as JSON. ', error);
            throw error
        }

        return comments
    }

    async postComment(comment) {
        let response;
        try {
            response = await fetch(this.serviceURL, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: 'POST',
                body: JSON.stringify(comment)
            });
            if (!response.ok) {
                throw new Error('Server returned error.')
            }
        } catch(error) {
            console.error('Error occured while posting the comment: ', error);
            throw error
        }

        let postedComment;
        try {
            postedComment = await response.json()
        } catch(error) {
            console.error('Failed to parse server\'s response as JSON. ', error);
            throw error
        }

        return postedComment
    }
}

// export as a singleton
export const commentsService = new CommentsService(COMMENTS_SERVICE_URL);
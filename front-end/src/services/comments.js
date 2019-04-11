// TODO: move to global config file?
const COMMENTS_SERVICE_URL = 'http://localhost:3001/';

export class CommentsService {
    constructor(serviceURL) {
        this.serviceURL = serviceURL;
    }
    fetchComments(email) {
        let requestURL = this.serviceURL;
        if (email) {
            requestURL += '?email=' + email;
        }
        return fetch(requestURL)
            .then(response => response.json())
    }

    postComment(comment) {

        return fetch(this.serviceURL, {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify(comment)
        })
    }
}

// export as a singleton
export const commentsService = new CommentsService(COMMENTS_SERVICE_URL);
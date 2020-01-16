export class Review {
    public author: String;
    public rating: number;
    public comment: String;

    constructor(init: {
        author: String,
        rating: number,
        comment: String
    }) {
        this.author = init.author;
        this.rating = init.rating;
        this.comment = init.comment;
    }
}
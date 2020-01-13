export class Review {
    public author: String;
    public stars: number;
    public comment: String;

    constructor(init: {
        author: String,
        stars: number,
        comment: String
    }) {
        this.author = init.author;
        this.stars = init.stars;
        this.comment = init.comment;
    }
}
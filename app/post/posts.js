let post = require('./post');

class posts {
    post = null;

    constructor (post) {
        this.post = post;
    }
    getAll () {
        return this.post.object;
    }
    sortByDate () {
        return this.post.object.sort((a, b) => {
            if (Date.parse(a.date) > Date.parse(b.date)) return -1;
            if (Date.parse(a.date) < Date.parse(b.date)) return 1;

            return 0;
        });
    }
    getSidePosts () {
        return this.post.object.map((e, i) => {
            if (e.side !== undefined) return e;

            return null;
        });
    }
}

module.exports = new posts(post);

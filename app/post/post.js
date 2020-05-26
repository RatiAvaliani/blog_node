let fileSystem = require('../../fileManager');

class post {
    object = {};
    postObject = {
        "title"   : "",
        "content" : "",
        "date"    : ""
    };
    errors = [];
    fileSystem = {};

    constructor (fileSystem) {
        this.object = fileSystem.readFile();
        this.fileSystem = fileSystem;
    }

    static currentDate  () {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yy = today.getFullYear();

        return `${yy}-${mm}-${dd}`;
    }

    add (title, content) {
        if (title.trim() === "" || typeof title !== "string") this.errors.push('Title field is empty.');
        if (content.trim() === "" || typeof title !== "string") this.errors.push('Content field is empty.');

        if (this.errors.length > 0) return {"Errors" : this.errors, "Code" : 0};

        let date = post.currentDate();

        this.object.push({"title" : title, "content" : content, "date" : date});

        this.fileSystem.writeToFile(this.object);

        return {"Code" : 1};
    }

    remove (id) {
        if (id === undefined || typeof id !== "number") throw error(`When removing item the id was not set.`);

        this.fileSystem.writeToFile(this.object.slice(id));
    }

    read (id) {
        if (id === undefined || typeof id !== "number") throw error(`When reading content the Id was not defined.`);

        return this.find(id);
    }

    find (id, callBack) {
        if (id === undefined || typeof id !== "number") throw error(`When finding content the Id was not defined.`);

        return this.object.filter((e, i) => {
            if (callBack !== undefined) {
                return callBack (e, i);
            }
            return i === id ? e : '';
        });
    }
}

module.exports = new post(fileSystem);
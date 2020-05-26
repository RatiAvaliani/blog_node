const fs = require('fs');
var path = require('path');
var appDir = global.appRoot = path.resolve(__dirname);

class fileManager {
    fs = null;
    database = null;
    appDir = null;

    constructor (fs, appDir) {
        this.fs = fs;
        this.appDir = appDir;
        this.database = this.appDir + "/database/database.json";
    }

    writeToFile (content, fileName) {
        if (fileName === undefined) fileName = this.database;

        content = JSON.stringify(content);

        this.fs.writeFile(fileName, content, e => console.log(e));

        return this;
    }

    readFile (fileName) {
        if (fileName === undefined) fileName = this.database;

        let fileContent = this.fs.readFileSync(fileName, 'utf8');
        if (fileContent.trim() === "") return [];

        return JSON.parse(fileContent);
    }
}

module.exports = new fileManager(fs, appDir);
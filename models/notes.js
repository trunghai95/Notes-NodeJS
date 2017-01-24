var sqlite3 = require('sqlite3');
sqlite3.verbose();
var db = undefined;

const DB_NAME = 'db.sqlite3';

exports.connect = function(callback) {
    db = new sqlite3.Database(DB_NAME, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
        function(err) { callback(err); });
}

exports.disconnect = function(callback) {
    callback();
}

exports.insert = function(id, title, body, callback) {
    if (!title) {
        title = 'Untitled_' + id;
    }

    db.run(`INSERT INTO notes(id, title, body) VALUES (?, ?, ?);`, 
        [id, title, body],
        function(err) {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });
}

exports.update = function(id, title, body, callback) {
    if (!title) {
        title = 'Untitled_' + id;
    }

    db.run(`UPDATE notes SET title = ?, body = ? WHERE id = ?;`,
        [title, body, id],
        function(err) {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });
}

exports.get = function(id, callback) {
    db.get(`SELECT title, body FROM notes WHERE id = ?;`,
        [id],
        function(err, row) {
            if (err) {
                callback(err, null);
            } else if (!row) {
                callback("Cannot find note " + id, null);
            } else {
                callback(null, row);
            }
        });
}

exports.delete = function(id, callback) {
    db.run(`DELETE FROM notes WHERE id = ?;`,
        [id],
        function(err) {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });
}

exports.getAll = function(callback) {
    var res = [];

    db.each(`SELECT * FROM notes`,
        function(err, row) {
            if (err) {
                callback(err, null);
            } else {
                res.push(row);
            }
        }, function(err, num) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, res);
            }
        });
}

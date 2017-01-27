var mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost/notes';

var NoteSchema = mongoose.Schema({
    id: String,
    title: String,
    body: String
});

mongoose.model('Note', NoteSchema);
var Note = mongoose.model('Note');

exports.connect = function(callback) {
    mongoose.connect(DB_URL, callback);
}

exports.disconnect = function(callback) {
    mongoose.connect(callback);
}

exports.insert = function(id, title, body, callback) {
    if (!title) {
        title = 'Untitled_' + id;
    }

    var note = new Note();
    note.id = id;
    note.title = title;
    note.body = body;
    note.save(callback);
}

exports.get = function(id, callback) {
    Note.findOne({ id: id }, function(err, doc) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, doc);
        }
    });
}

exports.update = function(id, title, body, callback) {
    if (!title) {
        title = 'Untitled_' + id;
    }

    Note.findOne({ id: id }, function(err, doc) {
        if (err) {
            callback(err);
        } else {
            doc.title = title;
            doc.body = body;
            doc.save(callback);
        }
    });
}

exports.delete = function(id, callback) {
    Note.findOne({ id: id }, function(err, doc) {
        if (err) {
            callback(err);
        } else {
            doc.remove();
            callback(null);
        }
    })
}

exports.getAll = function(callback) {
    Note.find().exec(callback);
}

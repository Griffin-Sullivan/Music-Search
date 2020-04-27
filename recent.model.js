const mongoose = require('mongoose');

const RecentSchema = mongoose.Schema({
    search: String,
    image: String
}, {
    timestamps: false
});

module.exports = mongoose.model('Recent', RecentSchema);
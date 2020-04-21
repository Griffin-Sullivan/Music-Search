const mongoose = require('mongoose');

const RecentSchema = mongoose.Schema({
    search: String,
    page: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Recent', RecentSchema);
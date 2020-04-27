module.exports = (app) => {
    const recent = require('../controllers/recent.controller.js');

    // Create a new Note
    app.post('/recent', recent.create);

    // Retrieve all Notes
    app.get('/recent', recent.findAll);

    // Retrieve a single Note with noteId
    app.get('/recent/:recentId', recent.findOne);

    // Update a Note with noteId
    app.put('/recent/:recentId', recent.update);

    // Delete a Note with noteId
    app.delete('/recent/:recentId', recent.delete);
}
const Recent = require('../recent.model.js');

// Create and Save a new Note
exports.create = (req, res) => {

    // Create a Note
    const recent = new Recent({
        search: req.body.search, 
        page: req.body.page
    });

    // Save Note in the database
    recent.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Recent.find()
    .then(recent => {
        res.send(recent);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Recent.findById(req.params.recentId)
    .then(recent => {
        if(!recent) {
            return res.status(404).send({
                message: "Recent search not found with id " + req.params.recentId
            });            
        }
        res.send(recent);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Recent search not found with id " + req.params.recentId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving recent search with id " + req.params.recentId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    Recent.findByIdAndUpdate(req.params.recentId, {
        search: req.body.search,
        page: req.body.page
    }, {new: true})
    .then(recent => {
        if(!recent) {
            return res.status(404).send({
                message: "Recent search not found with id " + req.params.recentId
            });
        }
        res.send(recent);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Recent search not found with id " + req.params.recentId
            });                
        }
        return res.status(500).send({
            message: "Error updating recent search with id " + req.params.recentId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Recent.findByIdAndRemove(req.params.recentId)
    .then(recent => {
        if(!recent) {
            return res.status(404).send({
                message: "Recent search not found with id " + req.params.recentId
            });
        }
        res.send({message: "Recent search deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Recent search not found with id " + req.params.recentId
            });                
        }
        return res.status(500).send({
            message: "Could not delete recent search with id " + req.params.recentId
        });
    });
};
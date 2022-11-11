const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

// Get all categories
router.get('/', (req, res) => {
    res.json({
        msg: 'get all categories'
    });
});

// Get 1 category by ID
router.get('/:id', (req, res) => {
    res.json({
        msg: 'get category id'
    });
});

// Create a category - user with a valid token
router.post('/', (req, res) => {
    res.json({
        msg: 'create category'
    });
});

// Update a category - user with a valid token
router.put('/:id', (req, res) => {
    res.json({
        msg: 'update category'
    });
});

// Delete a category - admin token
router.delete('/:id', (req, res) => {
    res.json({
        msg: 'delete category'
    });
});

module.exports = router;

const express = require('express');
const router = express.Router();

// router.get('/', (req, res) => {
//     //TODO cloudn graph
//     res.send('hi');
// });

router.get('/', (req, res) => {
    res.render('graph.html'); // (3)
  });

module.exports = router;
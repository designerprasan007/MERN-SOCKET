const express = require('express');
const router = express.Router();


router.get('/', (req, res)=>{
    res.send('okay done');
})


module.exports = router;

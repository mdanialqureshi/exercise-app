const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req,res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
})

//another way of doing it
router.post('/add', (req,res) => {
    const username = req.body.username;
    //create new instance of user with a user name
    const newUser = new User({username});
    newUser.save((err,data) => {
        if(err){
            res.status(400).json('Error' + err);
        }
        res.json(data);
    }) 
})

module.exports = router;
const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req,res) => {
    Exercise.find()
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
})

//another way of doing it, like app.post, but u get router from the app
// which is a express module object
router.post('/add', (req,res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    })

    /* Another way is
    newExercise.save()
        .then((data)=> res.json("user added!"))
        .catch((err) => res.status(400).json(err))
    */

    newExercise.save((err,data) => {
        if(err){
            res.status(400).json('Error' + err);
        }
        res.json('Exercise added!');
    })
})

router.route('/:id').get((req,res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json("Error:" + err))
})

router.route('/:id').delete((req,res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(exercise => res.json("Deleted Exercise: " + exercise.description));
})

router.route('/update/:id').put((req,res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            //the || help with updating only a certain amount of feilds at a time
            // rather than all of them
            exercise.username = req.body.username || exercise.username;
            exercise.description = req.body.description || exercise.description;
            exercise.duration = Number(req.body.duration) || exercise.duration;
            exercise.date  = Date.parse(req.body.date) || exercise.date;

            exercise.save()
                .then(() => res.json("Exercise Updated!"))
                .catch((err) => res.status(400).json("Error: " + err))
        })
})

module.exports = router;
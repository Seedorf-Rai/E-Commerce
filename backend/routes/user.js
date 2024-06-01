const router = require('express').Router()
const userController = require('../controllers/user')



router.get('/', (req, res) => {
    res.send('Hello world')
})


//User Routes
router.post('/signup',userController.SignupUser);
router.post('/signin',userController.loginUser);
router.get('/logout' , userController.logout);


module.exports = router;
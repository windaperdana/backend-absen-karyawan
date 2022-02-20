const router = require('express').Router();
const {body} = require('express-validator');
const {register_karyawan} = require('./controllers/registerController');
// const {register_user} = require('./controllers/registerController');
const {login_karyawan} = require('./controllers/loginController');
const {login_admin} = require('./controllers/loginController');
const {logout_karyawan} = require('./controllers/logoutController');
const {getUser} = require('./controllers/getUserController');
const {getKaryawan} = require('./controllers/getKaryawanController');

router.post('/register_karyawan', register_karyawan);
// router.post('/register_user', register_user);
router.post('/login_karyawan',login_karyawan);
router.post('/logout_karyawan',logout_karyawan);


router.post('/login_admin',login_admin);


router.get('/getuser',getUser);
router.get('/getkaryawan',getKaryawan);

module.exports = router;
import express from 'express'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'

const router = express.Router()

//Route login page: GET=> http://localhost:3000/login
router.get('/login', (req, res) => {
    return res.render('login', { title: 'Login page' })
})

//Route Register page: GET=> http://localhost:3000/register
router.get('/register', function (req, res) {
    return res.render('register', { title: 'Register page' })
})

//Route Register page: GET=> http://localhost:3000/forgot-password
router.get('/forgot-password', function (req, res) {
    return res.render('forgot-password', { title: 'Forgot-password' })
})

//Route Register page: GET=> http://localhost:3000/reset-password
router.get('/reset-password', function (req, res) {
    return res.render('reset-password', { title: 'Reset password' })
})

//Route Register page: GET=> http://localhost:3000/profile
router.get('/profile', function (req, res) {
    return res.render('profile', { title: 'Profile page' })
})

//Route Register page: POST=> http://localhost:3000/register
router.post('/register', async (req, res) => {
    // console.log(req.body)
    const { name, email, password } = req.body
    try {
        const userExists = await User.findOne({ email })
        if (userExists) {
            req.flash('error', 'User already exists with this email')
            return res.redirect('/register')
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({
            name,
            email,
            password: hashedPassword,
        })
        user.save()
        req.flash('success', 'User registered successfully, You can login now!')
        return res.redirect('/login')
    } catch (error) {
        console.log(error)
        req.flash('error', 'Somethin went wrong, Try again!')
        return res.redirect('/login')
    }
})

export default router
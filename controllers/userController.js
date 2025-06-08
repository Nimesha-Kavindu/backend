import User from "../models/users.js";
import bcrypt from "bcrypt";

export function createUser(req, res) {

    const hashPassword = bcrypt.hashSync(req.body.password, 10);

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPassword,
        role: req.body.role,
    });

    user.save().then(() => {
        res.json({
            message: 'User created successfully',
        });
    }).catch(() => {
        res.json({
            message: 'Error creating user',
        });
    });
}

export function getUsers(req, res) {
    User.find().then((data) => {
        res.json(data);
    }).catch(() => {
        res.json({
            message: 'Error fetching users'
        });
    });
}

export function loginUser(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email}).then((user) => {
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid password'
            });
        }

        res.json({
            message: 'Login successful',
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                img: user.img
            }
        });
    })
}
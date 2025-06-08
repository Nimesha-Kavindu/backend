import User from "../models/users.js";

export function createUser(req, res) {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
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
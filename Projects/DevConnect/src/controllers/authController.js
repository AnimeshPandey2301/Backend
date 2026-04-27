const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = "secret123";

let users = [];

// REGISTER
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
        id: Date.now(),
        name,
        email,
        password: hashedPassword
    };

    users.push(user);

    res.json({ message: "User registered" });
};

// LOGIN
exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET
    );

    res.json({
        message: "Login successful",
        token
    });
};
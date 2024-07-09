const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(bodyParser.json());


const JWT_SECRET = 'your_jwt_secret';


const updateUserPassword = async (userId, hashedPassword) => {
  return true;
};


const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};


app.put('/update-password', authenticateToken, async (req, res) => {
  const { userId } = req.user;
  const { newPassword } = req.body;

  if (!newPassword) {
    return res.status(400).send('New password is required');
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updateSuccess = await updateUserPassword(userId, hashedPassword);

    if (updateSuccess) {
      res.status(200).send('Password updated successfully');
    } else {
      res.status(500).send('Error updating password');
    }
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

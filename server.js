const express = require('express');
const app = express();
require('dotenv').config({
  path: './config/config.env',
});
const cors = require('cors');
app.use(
  cors({
    origin: 'https://anjali-snappy-chat-app.vercel.app',
  })
);
const databaseConnect = require('./config/database');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const socket = require('socket.io');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

const auth = require('./routes/authRoute');
const avatar = require('./routes/avatarRoute');
const message = require('./routes/messageRoute');

app.use('/api/auth', auth);
app.use('/api/avatar', avatar);
app.use('/api/message', message);

app.get('/', (req, res) => {
  res.send('Backend Server is Running ');
});

databaseConnect();

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

// const FrontEndPort = 'http://127.0.0.1:5173';
const FrontEndPort = process.env.FRONTEND_PORT;
const io = socket(server, {
  cors: {
    origin: FrontEndPort,
    credential: true,
  },
});

global.onlineUsers = new Map();

io.on('connection', (socket) => {
  global.chatSocket = socket;
  socket.on('add-user', (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on('send-msg', (data) => {
    // console.log("sendmsg", { data });
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('msg-recieve', data.message);
    }
  });
});

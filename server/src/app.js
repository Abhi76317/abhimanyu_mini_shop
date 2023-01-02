const express = require('express');
const cors = require('cors');
const path = require('path');

const env = require('@env');
const sequelize = require('@utils/db');
const route = require('@routes');
const statusRes = require('@constant/statusCode');
const messageRes = require('@constant/message');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../uploads')));
app.use('/api', route);

app.use((error, req, res, next) => { // eslint-disable-line
    // console.log('error', error); // display error for identification
    const status = error.statusCode || statusRes.INTERNAL_SERVER_ERROR;
    const message = error.message || messageRes.INTERNAL_SERVER_ERROR;
    const { data } = error;
    res.status(status).json({ success: false, message, data });
});

app.get('*', (req, res) => {
    // res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
    res.status(statusRes.NOT_FOUND).json({ message: messageRes.INVALID_URL });
});

sequelize.authenticate().then(() => {
    app.listen(env.PORT, () => {
        console.log('server started successfully...', env.PORT);
    });
}).catch((err) => {
    console.log(err);
});

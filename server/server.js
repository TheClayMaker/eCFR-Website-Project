const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();
app.use(cors());
app.use('/api', apiRoutes);

app.use(express.static(__dirname + "/client/build"));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
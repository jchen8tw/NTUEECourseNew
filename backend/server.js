const express = require('express');
const port = process.env.PORT || 3000;

const app = express();
app.use(express.static('../frontend/build'));

app.listen(port, () => console.log(`Backend listening on port ${port}!`));

const {connectMongo} = require('./db')
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const cors = require('cors'); // Import the cors package
const port = 5000
var corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));
app.use(cors());
app.use(express.json({ limit: '50mb' }));

connectMongo()
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth', require('./routes/auth'))


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  
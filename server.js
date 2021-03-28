import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
//Initialize App
const app = express();
app.use(express.json());
app.use(cors());

//HTML and Static file
app.use('/resources', express.static(path.join(__dirname, 'public')));
app.set('views', `views`);
app.set('view engine', 'hbs');

const mongoUri = 'mongodb://localhost:27017/webpage_builder';
mongoose.connect(
  mongoUri,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log('Connected to MongoDB');
  },
);

app.get('/', (req, res) => {
  res.render('home', { title: 'Webpage Builder' });
});
app.get('/editor', (req, res) => {
  res.render('editor', { title: 'Webpage Builder' });
});

const PORT = process.env.APP_PORT || 8080;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

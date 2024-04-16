import express from 'express';
import morgan from 'morgan';
import {dirname, join} from 'path';
import { engine } from 'express-handlebars';
import { fileURLToPath } from 'url';

//Initialisation
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json())

//Routes
app.get('/', (req, res) => {
    res.json({"message": "Test"});
})

//Public files

//Run Server
app.listen(app.get('port'), () => {
    console.log('Server listening on port', app.get('port'))
})
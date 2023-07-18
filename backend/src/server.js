import express from 'express';
import morgan from 'morgan';
import dirname from './utils.js';
import bodyParser from 'body-parser';
import './db/db.js';
import handlebars from 'express-handlebars';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import apiRouter from './routes/apiRouter.js'
import session from 'express-session';
import viewsRouter from './routes/viewsRouter.js';
import { errorHandler } from './middlewares/errorHandler.js';
import passport from 'passport';
import { MongoDBUrl } from './config.js';
import './passport/github.js';
import './passport/jwt.js';
import cors from 'cors';

const app = express();
const port = 8080;
const path = dirname


app.use(errorHandler)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(express.static(path + '/public'))
app.engine('handlebars', handlebars.engine({
        defaultLayout: "main",
        runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
        },
    }));
app.set('view engine', 'handlebars')
app.set('views', path + '/views')

app.use(cookieParser())
app.use(session({
    secret: 'sessionKey',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 10000
    },
        store : new MongoStore({
            mongoUrl: MongoDBUrl,
            ttl: 100,
        })
})
);

app.use(cors({credentials:true}));
app.use(errorHandler)
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRouter);
app.use('/', viewsRouter);

const httpServer = app.listen(port, ()=>{
    console.log('server ok en port', port);
});



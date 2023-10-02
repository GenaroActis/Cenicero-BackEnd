import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import './db/db.js';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import apiRouter from './routes/apiRouter.js'
import session from 'express-session';
import { errorHandler } from './middlewares/errorHandler.js';
import passport from 'passport';
import { MongoDBUrl } from './config.js';
import './passport/jwt.js';
import './passport/github.js';
import cors from 'cors';
import helmet from 'helmet'
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { doc } from './docs/doc.js';
// import './utils/deleteInactiveUsers.js'
import { PORT } from './config.js'

const app = express();

const specs = swaggerJSDoc(doc);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))

app.use('/src/public', express.static('src/public'))
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser())
app.use(session({
    secret: 'sessionKey',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 25000
    },
    store : new MongoStore({
        mongoUrl: MongoDBUrl,
        ttl: 100,
    })
})
);

app.use(cors(`Access-Control-Allow-Origin: *`))
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRouter);
app.use(errorHandler)

const httpServer = app.listen(PORT, ()=>{
    console.log('server ok en port', PORT);
});

export default app;


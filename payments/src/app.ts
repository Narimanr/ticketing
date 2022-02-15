import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { errorHandler, NotFoundError, currentUser } from '@nrtickets/common';

import { createChargeRouter } from './routes/new';



const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        // for all environments other than test set secure to true
        secure: process.env.NODE_ENV !== 'test'
    })
);

// add after cookie session to set req.session
app.use(currentUser);

// add routes
app.use(createChargeRouter);

// handle unknown routes
app.all('*', async (req,res) => {
    throw new NotFoundError();
});

app.use(errorHandler);


export { app };
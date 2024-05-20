// Declare
import express, { Express, Request, Response, NextFunction } from 'express';
import https from 'https';
import cookieParser from 'cookie-parser';
import errorHandler from '@middlewares/errorHandler';
import cors from 'cors';
import { sslOptions } from 'configs/sslOptions';
import { config } from 'dotenv';
config({ path: '.env' });

import accountRoute from '@routes/account.route';
import refrigeratorRoute from '@routes/refrigerator.route';
import notFoundException from '@middlewares/notFoundException';
import responseOverride from '@middlewares/responseOverride';
import { httpLogger } from '@modules/logger';
// import { redisClient } from '@configs/database/redis';

//create express server
const app = express();
const port = Number(process.env.PORT_NUM);
const httpsPort = Number(process.env.HTTPS_PORT_NUM);
const server: https.Server = https.createServer(sslOptions, app);

//redis
// const redisClient_ = redisClient;

//protocol
app.get('*', (req: Request, res: Response, next: NextFunction) => {
  const protocol: string = req.protocol;
  if (protocol == 'https') {
    next();
  } else {
    const destination = `https://${req.hostname}:${httpsPort}${req.url}`;
    res.redirect(destination);
  }
});

// credentials
app.use(
  cors({
    // origin: 'http://localhost:${port}',
    origin: '*',
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('../'));
app.use(cookieParser());
app.use(httpLogger);
app.use(responseOverride);

//non_singleton_API
app.use(accountRoute.path, accountRoute.router);
app.use(refrigeratorRoute.path, refrigeratorRoute.router);

//error
app.use(notFoundException);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Http server is running at port:${port}`);
});

server.listen(httpsPort, () => {
  console.log(`Https server is running at port:${httpsPort}`);
});

import express from 'express';
import authRoutes from './routes/authRoutes.ts';
import userRoutes from './routes/userRoutes.ts';
import habitRoutes from './routes/habitRoutes.ts';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { env, isTest } from '../env.ts'; // just to save trouble of typing out process.env.PORT

// Application Server
const app = express();
// Register global middleware
app.use(cors({
    origin: env.ALLOWED_ORIGINS,
    credentials: true,
}));
app.use(morgan('dev', {
    skip: () => isTest(),
}));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
    console.log(req);
    res.json({ message: 'hello', }).status(200);
    // res.send('<button>click</button>')
});
//@idea: neat project? make tool or something that monitors uptime and server health
//@idea: project : convert to biomejs after eslint

app.use('/api/auth', authRoutes); // xyz.com/api/auth/register
app.use('/api/users', userRoutes);
app.use('/api/habits', habitRoutes);

// Catch-all 404 handler for API routes
// app.use('/api/*', (req, res) => {
//     res.status(404).json({
//         error: 'Resource not found',
//         message: `Cannot ${req.method} ${req.originalUrl}`,
//         timestamp: new Date().toISOString(),
//     });
// });

app.post('/cake/:name/:id', (req, res) => {
    // res.send(req.params.name);
    res.json(req.params);
});

// // e.g. environment-specific routes
// if (process.env.NODE_ENV === 'development') {
//     const devRouter = Router();
//     devRouter.get('/debug', debugInfo);
//     devRouter.post('/seed', seedDatabase);
//     app.use('/dev', devRouter);
// }
// // Feature flags
// if (process.env.FEATURE_ANALYTICS === 'true') {
//     app.use('/api/analytics', analyticsRoutes)
// }

export { app }; // allows named import in case it's needed later. gives more options

export default app;

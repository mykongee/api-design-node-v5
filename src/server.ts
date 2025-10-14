import express from 'express';
import authRoutes from './routes/authRoutes.ts';
import userRoutes from './routes/userRoutes.ts';
import habitRoutes from './routes/habitRoutes.ts';

// Application Server
const app = express();

app.get('/health', (req, res) => {
    // @idea: site like codesmith chloe's to collect real-world user data.
    //  - can this data then be sold somehow? to data brokers...?
    //  - how does the advertising world actually work...?
    console.log(req);
    res.json({ message: 'hello', }).status(200);
    // res.send('<button>click</button>')
});
//@idea: neat project? make tool or something that monitors uptime and server health
//@idea: project : convert to biomejs after eslint

app.use('/api/auth', authRoutes); // xyz.com/api/auth/register
app.use('/api/users', userRoutes);
app.use('/api/habits', habitRoutes);

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

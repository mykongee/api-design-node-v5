import express from 'express';

// Application Server
const app = express();

app.get('/health', (req, res) => {
    // @idea: site like codesmith chloe's to collect real-world user data.
    //  - can this data then be sold somehow? to data brokers...?
    //  - how does the advertising world actually work...?
    console.log(req); 
    res.json({        message: 'hello',    }).status(200);
    // res.send('<button>click</button>')
});
//@idea: neat project? make tool or something that monitors uptime and server health
//@idea: project : convert to biomejs after eslint

app.post('/cake', (req, res) => {
    
});


export { app }; // allows named import in case it's needed later. gives more options

export default app;

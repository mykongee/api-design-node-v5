// import '../env.ts';
import { env } from '../env.ts'; // just to save trouble of typing out process.env.PORT
import { app } from './server.ts';
// import 'dotenv/config'; // loads .env file when module is imported.

console.log(env.PORT);
app.listen(3000, () => {
    console.log(env.PORT);
    console.log('server is started');
})
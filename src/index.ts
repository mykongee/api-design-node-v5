import { app } from './server.ts';
import 'dotenv/config'; // loads .env file when module is imported.

console.log(process.env.PORT);
app.listen(3000, () => {
    console.log(process.env.PORT);
    console.log('server is started');
})
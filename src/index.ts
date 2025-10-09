import { app } from './server.ts';
import 'dotenv/config'; // automatically loads .env file when the module is imported.

console.log(process.env.PORT);
app.listen(3000, () => {
    console.log(process.env.PORT);
    console.log('server is started');
})
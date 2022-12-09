import { generateServer } from './app/generate-server';
import { connectToPg } from './common/connect-to-pg';
import { firstUserController } from './app/users/user.controller';
import { familyController } from './app/family/family.controller';

async function main() {
    const app = generateServer();
    const connection = await connectToPg();

    app.use((req, _, next) => {
        req.db = connection;
        next();
    });

    app.use('/users', firstUserController);
    app.use('/family', familyController);

    const port = 3000;
    app.listen(port, () => {
        console.info(`Server started on port: ${port}`);
    });
}

main();

import { Router } from 'express';
import { firstServiceFunction } from './user.service';

const router = Router();

router.get('/', (_, res) => {
    const result = firstServiceFunction();

    res.json(result);
});

export const firstUserController = router;

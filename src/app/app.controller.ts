import { Router } from 'express';
import { firstServiceFunction } from './app.service';

const router = Router();

router.get('/', (_, res) => {
    const result = firstServiceFunction();

    res.json(result);
});

export const firstController = router;

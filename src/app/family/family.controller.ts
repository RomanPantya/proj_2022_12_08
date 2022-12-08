import { Router } from 'express';
import { firstFamilyFunction } from './family.service';

const router = Router();

router.get('/', (_, res) => {
    const result = firstFamilyFunction();

    res.json(result);
});

export const firstFamilyController = router;

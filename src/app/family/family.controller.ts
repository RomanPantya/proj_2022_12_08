import { Router } from 'express';
import { createFamily } from './family.service';

const router = Router();

router.post('/', async (req, res) => {
    const family = req.body;
    const result = await createFamily(req.db, family);

    res.json({
        message: 'This family created',
        data: result,
    });
});

export const familyController = router;

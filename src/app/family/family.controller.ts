import { Router } from 'express';
import {
    createFamily, getOneFamily, getAllFemily, removeOneFamily,
} from './family.service';

const router = Router();

router.post('/', async (req, res) => {
    const family = req.body;
    const result = await createFamily(req.db, family);

    res.json({
        message: 'This family created',
        data: result,
    });
});

router.get('/:id', async (req, res) => {
    const { id: familyId } = req.params;
    const result = await getOneFamily(req.db, familyId);

    res.json({
        message: 'Thats your family',
        data: result,
    });
});

router.get('/', async (req, res) => {
    const result = await getAllFemily(req.db);

    res.json({
        message: 'Thats all family',
        data: result,
    });
});

router.delete('/:id', async (req, res) => {
    const { id: familyId } = req.params;
    const result = await removeOneFamily(req.db, familyId);

    res.json({
        message: 'This family was remove',
        data: result,
    });
});

export const familyController = router;
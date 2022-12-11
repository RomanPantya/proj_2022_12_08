import { Router } from 'express';
import {
    createUser, getOneUser, getAllUsers, removeUser,
} from './user.service';

const router = Router();

router.post('/', async (req, res) => {
    const user = req.body;
    const result = await createUser(req.db, user);

    res.json({
        message: 'This user was create',
        data: result,
    });
});

router.get('/:id', async (req, res) => {
    const { id: userId } = req.params;
    const result = await getOneUser(req.db, userId);

    res.json({
        message: result ? 'That your user' : `Do not have user with id: ${userId}`,
        data: result,
    });
});

router.get('/', async (req, res) => {
    const result = await getAllUsers(req.db);

    res.json({
        message: 'Thats all users',
        data: result,
    });
});

router.delete('/:id', async (req, res) => {
    const { id: userId } = req.params;
    const result = await removeUser(req.db, userId);

    res.json({
        message: result ? 'Thats user was delete' : `Do not have user with id: ${userId}`,
        data: result,
    });
});

export const userController = router;

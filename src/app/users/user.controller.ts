import { Router } from 'express';
import {
    createUser, getOneUser, getAllUsers, removeUser, updateUser, allUsersWithFamily,
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

router.get('/family', async (req, res) => {
    const limskip = req.query;
    const result = await allUsersWithFamily(req.db, limskip);

    res.json({
        message: 'Thats all users with family',
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

router.put('/:id', async (req, res) => {
    const { id: userId } = req.params;
    const realyUser = req.body;

    if (!Object.entries(realyUser).length) {
        res.json('Not have data to update!');
        return;
    }

    const result = await updateUser(req.db, userId, realyUser);

    res.json({
        message: 'This user was update',
        data: result,
    });
});

export const userController = router;

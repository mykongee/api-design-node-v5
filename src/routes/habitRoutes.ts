import { Router } from "express";
import { validateBody, validateParams, validateQuery } from "../middleware/validation.ts";
import { z } from 'zod';

//@todo - placeholder
const createHabitSchema = z.object({
    name: z.string(),
});

const completeParamsSchema = z.object({
    id: z.string(),
    // id: z.string().min(3).max(16),
});

const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'all habits' });
});

router.get('/:id', (req, res) => {
    res.json({ message: 'one habit' });
});

router.post('/', validateBody(createHabitSchema), (req, res) => {
    res.json({ message: 'created habit' }).status(201);
})

router.post('/:id/complete',
    validateParams(completeParamsSchema),
    validateBody(createHabitSchema),
    (req, res) => {
        res.json({ message: 'completed habit' }).status(201);
    }
)

router.delete('/:id', (req, res) => {
    res.json({ message: 'deleted habit' }).status(204);
})

export default router;

// src/routes/StoreRouter.ts
import { Router, Request, Response } from 'express';
import StoreService from '../services/StoreService';

const router = Router();
const storeService = new StoreService();

router.post('/', async (req: Request, res: Response) => {
  try {
    const store = await storeService.createStore(req.body);
    res.status(201).json(store);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const stores = await storeService.getStores(req.query);
    res.status(200).json(stores);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const store = await storeService.getStoreById(req.params.id);
    if (store) {
      res.status(200).json(store);
    } else {
      res.status(404).json({ message: 'Store not found' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const store = await storeService.updateStore(req.params.id, req.body);
    if (store) {
      res.status(200).json(store);
    } else {
      res.status(404).json({ message: 'Store not found' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const success = await storeService.deleteStore(req.params.id);
    if (success) {
      res.status(200).json({ message: 'Store marked as inactive' });
    } else {
      res.status(404).json({ message: 'Store not found' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;

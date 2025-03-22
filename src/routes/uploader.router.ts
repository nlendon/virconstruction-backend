import Router, { Application } from 'express';
import UploaderController from '../components/uploader.controller';

const router = Router();

router.post('/create', UploaderController.create as Application);
router.delete('/delete/:id', UploaderController.delete as Application);

export default router;
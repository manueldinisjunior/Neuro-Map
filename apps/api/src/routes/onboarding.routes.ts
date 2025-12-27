import { Router } from 'express';
import * as OnboardingController from '../controllers/onboarding.controller';

const router = Router();

router.post('/state', OnboardingController.updateOnboardingState);
router.post('/complete', OnboardingController.completeOnboarding);

export default router;

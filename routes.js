import express from 'express';

import { showHomePage } from './src/controllers/index.js';
import { showOrganizationsPage } from './src/controllers/organizations.js';
import { showProjectsPage } from './src/controllers/projects.js';
import { showCategoriesPage } from './controllers/categories.js';
import { testErrorPage } from './src/controllers/errors.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;
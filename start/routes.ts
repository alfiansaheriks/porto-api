/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const ProjectsController = () => import('#controllers/projects_controller')
const ProjectCategoriesController = () => import('#controllers/project_categories_controller')
const ActivitiesController = () => import('#controllers/activities_controller')
const SessionController = () => import('#controllers/session_controller')
const AuthController = () => import('#controllers/auth_controller')
const PostsCategoriesController = () => import('#controllers/posts_categories_controller')
const PostsController = () => import('#controllers/posts_controller')

router.get('/projects', [ProjectsController, 'index'])
router.get('/projects/:id', [ProjectsController, 'showById'])
router.get('/projects/showdesc', [ProjectsController, 'showByOldDate'])
router.post('/projects', [ProjectsController, 'store']).use(middleware.auth())
router.put('/projects/:id', [ProjectsController, 'update']).use(middleware.auth())
router.delete('/projects/:id', [ProjectsController, 'destroy']).use(middleware.auth())
router.get('/project/:slug', [ProjectsController, 'show'])

router.get('/categories', [ProjectCategoriesController, 'index'])
router.post('/categories', [ProjectCategoriesController, 'store']).use(middleware.auth())
router.put('/categories/:id', [ProjectCategoriesController, 'update']).use(middleware.auth())
router.delete('/categories/:id', [ProjectCategoriesController, 'destroy']).use(middleware.auth())

router.get('/posts', [PostsController, 'index'])
router.post('/posts', [PostsController, 'store']).use(middleware.auth())
router.put('/posts/:id', [PostsController, 'update']).use(middleware.auth())
router.delete('/posts/:id', [PostsController, 'destroy']).use(middleware.auth())
router.get('/posts/:slug', [PostsController, 'show'])
router.get('/post/:id', [PostsController, 'showById'])

router.get('/posts_cat', [PostsCategoriesController, 'index'])
router.post('/posts_cat', [PostsCategoriesController, 'store']).use(middleware.auth())
router.put('/posts_cat/:id', [PostsCategoriesController, 'update']).use(middleware.auth())
router.delete('/posts_cat/:id', [PostsCategoriesController, 'destroy']).use(middleware.auth())

router.get('/activities', [ActivitiesController, 'index'])
router.get('/activities/:id', [ActivitiesController, 'showbyId'])
router.post('/activities', [ActivitiesController, 'store']).use(middleware.auth())
router.put('/activities/:id', [ActivitiesController, 'update']).use(middleware.auth())
router.delete('/activities/:id', [ActivitiesController, 'destroy']).use(middleware.auth())

router.post('/login', [SessionController, 'store'])
router.post('/register', [AuthController, 'register'])

import { createRouter, createWebHistory } from 'vue-router';
import { getCurrentUser } from 'vuefire';

import AboutView from '@/views/AboutView.vue';
import ContactView from '@/views/ContactView.vue';

import CategoriesView from '@/views/CategoriesView.vue';
import CategoryView from '@/views/CategoryView.vue';
import SubcategoryView from '@/views/SubcategoryView.vue';

import FiguresView from '@/views/FiguresView.vue';
import FigureView from '@/views/FigureView.vue';
import ShoppingCartView from '@/views/ShoppingCartView.vue';

import AdminDashboardView from '@/views/AdminDashboard.vue';
import UserProfileView from '@/views/UserProfileView.vue';
import CreateItemView from '@/views/CreateItemView.vue';
import CreateCategoryView from '@/views/CreateCategoryView.vue';
import CreateSubcategoryView from '@/views/CreateSubcategoryView.vue';

import FirebaseTestView from '@/views/FirebaseTestView.vue';
import SignInPage from '@/views/pages/SignInPage.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),

	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('../views/HomeView.vue'),
		},
		{
			path: '/about',
			name: 'about',
			component: AboutView,
		},
		{
			path: '/contact',
			name: 'contact',
			component: ContactView,
		},
		{
			path: '/categories',
			name: 'categories',
			component: CategoriesView,
		},
		{
			path: '/:cat',
			name: 'category',
			component: CategoryView,
		},
		{
			path: '/:cat/:sub',
			name: 'subcategory',
			component: SubcategoryView,
		},

		{
			path: '/figures',
			name: 'figures',
			component: FiguresView,
		},
		{
			//used for when a figure has no subcategory
			path: '/:cat/:figure',
			name: 'figure-no-sub',
			component: FigureView,
		},
		{
			//These are the route params! :)
			path: '/:cat/:sub/:figure', //<--- values here are used to filter down values to match for detail pages
			name: 'figure-with-sub',
			component: FigureView,
		},
		{
			path: '/shopping-cart',
			name: 'shopping-cart',
			component: ShoppingCartView,
		},
		{
			path: '/admin',
			name: 'user-dashboard',
			component: AdminDashboardView,
			meta: { requiresAuth: true },
			children: [
				{
					path: '/admin/user-profile',
					name: 'create-item',
					component: UserProfileView,
				},
				{
					path: '/admin/create-item',
					name: 'create-item',
					component: CreateItemView,
				},
				{
					path: '/admin/create-category',
					name: 'create-category',
					component: CreateCategoryView,
				},
				{
					path: '/admin/create-subcategory',
					name: 'create-subcategory',
					component: CreateSubcategoryView,
				},
			],
		},
		{
			path: '/admin/user-profile',
			name: 'user-profile',
			component: UserProfileView,
		},
		{
			path: '/firebase-test',
			name: 'firebase-test',
			component: FirebaseTestView,
		},
		{
			path: '/signin-page',
			name: 'signin-page',
			component: SignInPage,
		},
	],
});

router.beforeEach(async (to) => {
	// routes with `meta: { requiresAuth: true }` will check for the users, others won't
	if (to.meta.requiresAuth) {
		const currentUser = await getCurrentUser();
		// if the user is not logged in, redirect to the login page
		if (!currentUser) {
			return {
				path: '/signin-page',
				query: {
					// we keep the current path in the query so we can redirect to it after login
					// with `router.push(route.query.redirect || '/')`
					redirect: to.fullPath,
				},
			};
		}
	}
});

export default router;

import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

import { RouterPaths } from './router-paths';
import { TYPES } from '@/infrastructure/bootstrap/types';
import App from '../App.vue';
import { container } from '@/infrastructure/bootstrap/inversify.config';
import AuthenticationScreen from '@/modules/shared/authentication/AuthenticationScreen.vue';
import { IEventBus } from '@/infrastructure/events/event-bus.plugin';
import Admin from '@/modules/admin/Admin.vue';
import AdminAuthenticatedEvent from '@/modules/shared/authentication/business/events/admin-authenticated.event';
import AuthTokenUseCases from '@/modules/shared/authStorage/business/usecases/auth-token.usecases';
import Login from '@/modules/shared/authentication/presentation/view/Login/Login.vue';
import Registration from '@/modules/shared/authentication/presentation/view/Registration/Registration.vue';

const getRoutes = (): Array<RouteRecordRaw> => {
    return [{
            path: RouterPaths.root,
            name: 'App',
            component: App,
            meta: { requiresAuth: true },
            beforeEnter: (to, from, next) => {

                const isAuthenticated = container.get<AuthTokenUseCases>(TYPES.AuthTokenUseCases).isAuthenticated();

                if (to.meta.requiresAuth && !isAuthenticated) {
                    next(RouterPaths.registration);
                    return;
                }

                next();
            },
        },
        {
            path: RouterPaths.authentication,
            component: AuthenticationScreen,
            children: [{
                path: RouterPaths.login,
                component: Login,
            },
            {
                path: RouterPaths.registration,
                component: Registration,
            }]
        },
        {
            path: RouterPaths.admin,
            component: Admin,
            meta: { requiresAuth: true },
            beforeEnter: async (to, from, next) => {
                const authToken = container.get<AuthTokenUseCases>(TYPES.AuthTokenUseCases);

                console.log(authToken.isAuthenticated())
                if (to.meta.requiresAuth && !authToken.isAuthenticated()) {
                    next(RouterPaths.registration);
                    return;
                }

                const eventBus = container.get<IEventBus>(TYPES.EventBus);
                await eventBus.publishAsync(new AdminAuthenticatedEvent());

                next();
            },
            children: [],
        },
    ];
};

const router = createRouter({
    history: createWebHistory(),
    routes: getRoutes(),
    scrollBehavior() {
        return { top: 0 };
    }
});

export default router;

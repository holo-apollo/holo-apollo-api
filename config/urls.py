from django.conf import settings
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import include, path

from rest_framework import routers
from rest_framework import urls as drf_urls
from rest_framework.documentation import include_docs_urls

from common.views import about, index
from goods.api.v1.urls import router as goods_app_router_v1
from stores.api.v1.urls import router as stores_router_v1
from users.api.v1.urls import router as users_app_router_v1
from users.views import (ConfirmEmail, LoginView, PasswordResetConfirmView, PasswordResetView,
                         SignupView)

router_v1 = routers.DefaultRouter()
router_v1.registry.extend(goods_app_router_v1.registry)
router_v1.registry.extend(stores_router_v1.registry)
router_v1.registry.extend(users_app_router_v1.registry)

api_patterns = [
    path('v1/', include((router_v1.urls, 'api_v1'), namespace='v1'))
]

urlpatterns = [
    # Django
    path('admin/', admin.site.urls),

    # DRF
    path('api-auth/', include(drf_urls)),
    path('api/docs/', include_docs_urls(title='Holo Apollo API', public=False)),
    path('api/', include(api_patterns)),

    # Apps
    path('', include('stores.urls', namespace='stores')),
]

if settings.PRODUCTION:
    urlpatterns += [
        path('', about, name='about'),
    ]
else:
    urlpatterns += [
        # Auth
        path('login/', LoginView.as_view(), name='login'),
        path('signup/', SignupView.as_view(), name='signup'),
        path('logout/', auth_views.LogoutView.as_view(), name='logout'),
        path('password_reset/', PasswordResetView.as_view(), name='password_reset'),
        path('reset/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
        path('oauth/', include('social_django.urls', namespace='social')),
        path('api/v1/rest-auth/', include('rest_auth.urls')),

        # Custom
        path('about/', about, name='about'),
        path('confirm-email/', ConfirmEmail.as_view(), name='confirm-email'),
        path('', index, name='index'),
    ]

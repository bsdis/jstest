
from django.contrib import admin
from django.urls import path, include

from django.conf import settings
#from django.conf.urls import url
from django.conf.urls.static import static
from django.urls import path, re_path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

# urlpatterns = [
#    path('admin/', admin.site.urls),
#    path('', include('frontend.urls'))
# ]
urlpatterns = static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += [
    re_path(r'^admin/*', admin.site.urls),
    re_path(r'^accounts/', include('allauth.urls')),
    re_path(r'^api-auth/*', include('rest_framework.urls')),
    re_path(r'^api/profiles/*/*', include('apps.profiles.urls')),
    # See https://github.com/davesque/django-rest-framework-simplejwt/blob/master/README.rst
    re_path('api/token.*', TokenObtainPairView.as_view(),
            name='token_obtain_pair'),
    re_path('api/token/refresh.*',
            TokenRefreshView.as_view(), name='token_refresh'),
    re_path('api/token/verify.*', TokenVerifyView.as_view(), name='token_verify'),
    # internal apps
    # catch all except above and send to react router
    re_path(r'^.*/*', include('frontend.urls'))
]

#re_path(r'^api/', include('project.api')),
#    url(r'^', include('places.urls')),
# catch all other urls
#urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
#urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

from django.urls import path, re_path
from . import views

urlpatterns = [

    re_path(r'^$', views.index, name='redirect-to-home'),
]

#    url(r'^admin/', include(admin.site.urls)),
#    url(r'^api/', include('project.api')),
#    url(r'^', include('places.urls')),
# catch all other urls

# urlpatterns = [
#    path(r'^', views.index)
# ]

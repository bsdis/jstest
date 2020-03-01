from django.urls import path, re_path, include
from . import views
from .api import RegisterAPI
#from knox import views as knox_views

urlpatterns = [
    re_path(r'csrf/*', views.csrf),
    re_path(r'ping/*', views.ping),
    #re_path(r'auth/*', include('knox.urls')),
    re_path(r'auth/register/*', RegisterAPI.as_view()),
    #re_path(r'^$', views.HelloView.as_view(), name='profile_view'),

]

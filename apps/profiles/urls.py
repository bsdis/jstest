from django.urls import path, re_path
from . import views

urlpatterns = [
    re_path(r'^$', views.HelloView.as_view(), name='profile_view'),
]

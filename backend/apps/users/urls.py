from django.urls import path
from .views import RegisterView,ProfileView

app_name = 'users'

urlpatterns = [
    path('register/',RegisterView.as_view(),name='user-register'),
    path('me/', ProfileView.as_view(), name='user-profile')
]


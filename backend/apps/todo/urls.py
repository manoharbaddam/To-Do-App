from django.urls import path
from .views import TaskListCreateView,TaskRetrieveUpdateDestroyAPIView

app_name= 'todo'

urlpatterns = [
    path('',TaskListCreateView.as_view(),name='task-list'),
    path('/<uuid:pk>/', TaskRetrieveUpdateDestroyAPIView.as_view(), name='task-actions'),
]
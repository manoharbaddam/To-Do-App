from django.urls import path
from .views import TaskListCreateView,TaskRetrieveUpdateDestroyAPIView

app_name= 'todo'

urlpatterns = [
    path('tasks/',TaskListCreateView.as_view(),name='task-list'),
    path('tasks/<uuid:pk>/', TaskRetrieveUpdateDestroyAPIView.as_view(), name='task-actions'),

]
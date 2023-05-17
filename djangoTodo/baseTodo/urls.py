from django.urls import path

from . import views

urlpatterns = [
    path("", views.readTodo, name="home"),
    path("create-todo/", views.readTodo, name="create-todo"),
    path("delete-todo/:<str:pk>/", views.deleteTodo, name="delete-todo"),
]
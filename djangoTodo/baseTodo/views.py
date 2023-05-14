from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
from .models import Todo, RecentActivity
def home(request):
    return HttpResponse("Hello, world. You're at the base todo home.")


def createTodo(request):
    if request.method == "POST":
        task = request.POST.get("todo").lower()
def readTodo(request):
    todos = Todo.objects.all()
    context = {
        'todos': todos
    }
    return render(request, "baseTodo/home.html",context)
def updateTodo(request):
    pass
def deleteTodo(request):
    pass
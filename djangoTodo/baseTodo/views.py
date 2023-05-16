from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
from .models import Todo, RecentActivity
from .form import TodoForm
def home(request):
    return HttpResponse("Hello, world. You're at the base todo home.")


def createTodo(request):
    if request.method == "POST":
        print(request.POST.get("status"))
        task = request.POST.get("task_name")
        when_added = request.POST.get("when_added")
        # status = request.POST.get("status")
        Todo.objects.create(
            task_name=task,
            when_added=when_added,
            # status=status,
        )
        return readTodo(request)
def readTodo(request):
    todos = Todo.objects.all()
    form = TodoForm()
    if request.method == "POST":
        print(request.POST)
        task = request.POST.get("task_name")
        when_added = request.POST.get("when_added")
        # status = request.POST.get("status")
        Todo.objects.create(
            task_name=task,
            when_added=when_added,
            # status=status,
        )
    context = {
        'todos': todos,
        'form': form,
    }
    return render(request, "baseTodo/home.html",context)
def updateTodo(request):
    pass
def deleteTodo(request):
    pass
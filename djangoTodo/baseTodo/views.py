from django.shortcuts import render,get_object_or_404, redirect
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
def updateTodo(request,pk):
    task = get_object_or_404(Todo, id=pk)
    if request.method == 'POST':
        form = TodoForm(request.POST, instance=task)
        if form.is_valid():
            form.save()
            return redirect('home')
    else:
        form = TodoForm(instance=task)
    context = {
        'todos': task,
        'form': form,
    }
    return render(request, 'baseTodo/todo_details.html', context)
def deleteTodo(request, pk):
    task = Todo.objects.get(id=pk)
    task.delete()
    todos = Todo.objects.all()
    form = TodoForm()
    context = {
        'todos': todos,
        'form': form,
    }
    return render(request, "baseTodo/home.html",context)
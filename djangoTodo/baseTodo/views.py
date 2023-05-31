from django.shortcuts import render,get_object_or_404, redirect
from django.http import HttpResponse
# Create your views here.
from .models import Todo, RecentActivity
from .form import TodoForm
import datetime
def home(request):
    return HttpResponse("Hello, world. You're at the base todo home.")


def createTodo(request):
    if request.method == "POST":
        task = request.POST.get("task_name")
        when_added = int(datetime.datetime.today().timestamp())
        status = "New"
        Todo.objects.create(
            task_name=task,
            when_added=when_added,
            status=status,
        )
        return redirect("home")
def readTodo(request):
    todos = Todo.objects.all()
    form = TodoForm()
    
    context = {
        'todos': todos,
        'form': form,
    }
    return render(request, "baseTodo/home.html",context)
def updateTodo(request,pk):
    task = get_object_or_404(Todo, id=pk)
    form = TodoForm(instance=task)
    if request.method == 'POST':
        print(request.POST)
        status = request.POST.get('status')
        task.status = status
        task.save()
        return redirect("home")
    #     form = TodoForm(request.POST, instance=task)
    #     if form.is_valid():
    #         form.save()
    #         return redirect('home')
    # else:
    #     form = TodoForm(instance=task)
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
    return redirect("home")
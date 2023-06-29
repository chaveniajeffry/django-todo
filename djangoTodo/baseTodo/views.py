from django.shortcuts import render,get_object_or_404, redirect
from django.http import HttpResponse
from django.core.paginator import Paginator
from .models import Todo, RecentActivity
from .form import TodoForm
import datetime
def change_task_status(task_timestamp, status):
    # Add 8 hours to the task timestamp
    task_datetime = datetime.datetime.fromtimestamp(task_timestamp)
    task_datetime += datetime.timedelta(hours=8)

    # Get the current date and time
    current_time = datetime.datetime.now() + datetime.timedelta(hours=8)
    current_date = current_time.date()

    # Get the date from the task datetime
    task_date = task_datetime.date()
    # Compare the task date with the current date and the status
    if task_date < current_date and str(status).lower() == "new":
        # Task is in the past and new, change the status
        return True
    else:
        return False

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
    utc_timestamp_now = int(datetime.datetime.today().timestamp())
    for todo in todos:
        if(change_task_status(int(todo.when_added), todo.status)):
            todo_data = Todo.objects.get(id=todo.id)
            todo_data.status = "did not do"
            todo_data.save()
    paginator = Paginator(todos, 5)
    page_number = request.GET.get("page")
    page_obj = paginator.get_page(page_number)
    context = {
        'todos': page_obj,
        'form': form,
    }
    return render(request, "baseTodo/home.html",context)
def updateTodo(request,pk):
    task = get_object_or_404(Todo, id=pk)
    form = TodoForm(instance=task)
    if request.method == 'POST':
        status = request.POST.get('status')
        task.status = status
        task.save()
        return redirect("home")
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
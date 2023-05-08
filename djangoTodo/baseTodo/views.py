from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.

def home(request):
    return HttpResponse("Hello, world. You're at the base todo home.")


def createTodo(request):
    pass
def readTodo(request):
    pass
def updateTodo(request):
    pass
def deleteTodo(request):
    pass
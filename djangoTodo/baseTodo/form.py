from django import forms
from django.forms import ModelForm
from .models import Todo, RecentActivity

class TodoForm(ModelForm):
    
    class Meta:
        model = Todo
        fields = [
            'task_name', 'status', 'when_added'
        ]

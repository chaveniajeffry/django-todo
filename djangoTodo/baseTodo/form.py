from django import forms
from .models import Todo, RecentActivity

class TodoForm(forms.Form):
    class Meta:
        model = Todo
        fields = [
            'task_name', 'status', 'when_added'
        ]

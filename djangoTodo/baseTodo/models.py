from django.db import models
import datetime
from django.utils import timezone

# Create your models here.
class Todo(models.Model):
    task_name = models.CharField(max_length=255)
    status = models.BooleanField(default=False)
    when_added = models.PositiveIntegerField(default=int(timezone.now().timestamp()))
    when_updated = models.PositiveIntegerField(blank=True, null=True)

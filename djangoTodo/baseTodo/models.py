from django.db import models
import datetime
from django.utils import timezone

# Create your models here.
class Todo(models.Model):
    task_name = models.CharField(max_length=255)
    status = models.CharField(max_length=255)
    when_added = models.PositiveIntegerField(default=int(timezone.now().timestamp()))
    when_updated = models.PositiveIntegerField(blank=True, null=True)
    
    class Meta:
        db_table = 'todo'
        
class RecentActivity(models.Model):
    who_added = models.PositiveIntegerField()
    when_added = models.PositiveIntegerField(default=int(timezone.now().timestamp()))
    action = models.CharField(max_length=255)
    page_id = models.PositiveIntegerField()
    obj_id = models.PositiveIntegerField()

    class Meta:
        db_table = 'recent_activity'
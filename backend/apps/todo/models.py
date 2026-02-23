from django.db import models
import uuid

# Create your models here.
class Task(models.Model):
    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        IN_PROGRESS = 'IN_PROGRESS', 'In Progress'
        COMPLETED = 'COMPLETED', 'Completed'
    
    class Priority(models.TextChoices):
        LOW = 'LOW','Low'
        MODERATE = 'MODERATE', 'Moderate'
        HIGH = 'HIGH', 'High'

    id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)

    title = models.CharField(max_length=225,blank=False)
    description = models.TextField()

    status = models.CharField(max_length=20,choices=Status.choices,default=Status.PENDING)
    priority = models.CharField(max_length=20,choices=Priority.choices,default=Priority.MODERATE)
    owner = models.ForeignKey('users.User', on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title}"
from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    # We can add extra "read-only" fields here
    owner_name = serializers.ReadOnlyField(source ="owner.username")

    class Meta :
        model = Task
        fields = ['id','title','description','status','priority','owner','owner_name','created_at']
        read_only_fields = ['owner']
    
from rest_framework import serializers
from .models import User

class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email','first_name','last_name','updated_at']
        read_only_fields = ['id', 'date_joined']

from rest_framework import serializers
from django.contrib.auth import get_user_model


User = get_user_model()

class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email','first_name','last_name','updated_at']
        read_only_fields = ['id', 'date_joined']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['first_name','email','password']

    def create(self,validated_data):
        return User.objects.create_user(**validated_data)
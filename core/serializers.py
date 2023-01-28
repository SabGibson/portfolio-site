from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer, UserSerializer as BaseUserSerializer
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from portfolio.views import Profile


class UserCreateSerializer(BaseUserCreateSerializer):
    def save(self, **kwargs):
        user = super().save(**kwargs)
        Profile.objects.create(user=user)

    class Meta(BaseUserCreateSerializer.Meta):
        fields = ['id', 'username', 'email', 'password']


class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

from rest_framework import serializers
from .models import *


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['username', 'first_name', 'last_name']


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['title', 'description', 'author', 'created_on']


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['title', 'descripion', 'content',
                  'created_on', 'updated_at', 'author', 'like_count']

    like_count = serializers.SerializerMethodField(method_name='likes_count')

    def likes_count(self, Post: Post):
        return Post.liked.all().count()


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['post', 'created_on', 'author', 'content',]

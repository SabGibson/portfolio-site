from rest_framework import serializers
from .models import *


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['username', 'first_name', 'last_name']


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'creator', 'created_on']


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'content',
                  'created_on', 'updated_at', 'author', 'like_count']

    like_count = serializers.SerializerMethodField(method_name='likes_count')

    def likes_count(self, Post: Post):
        return Post.liked.all().count()


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'post', 'created_on', 'author', 'content',]

from rest_framework import serializers
from .models import *


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ['id', 'username', 'first_name', 'last_name']


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
    def create(self, validated_data):
        post_id = self.context['post_id']
        return Comment.objects.create(post_id=post_id, **validated_data)

    class Meta:
        model = Comment
        fields = ['id', 'post', 'created_on', 'author', 'content']


class ProfileImageSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        profile_id = self.context['profile_id']
        return ProfileImage.objects.create(profile_id, **validated_data)

    class Meta:
        model = ProfileImage
        fields = ['id', 'image']


class ProjectImageSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        project_id = self.context['project_id']
        return ProjectImage.objects.create(project_id, **validated_data)

    class Meta:
        model = ProjectImage
        fields = ['id', 'image']


class PostImageSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        post_id = self.context['post_id']
        return PostImage.objects.create(post_id=post_id, **validated_data)

    class Meta:
        model = PostImage
        fields = ['id', 'image']

from rest_framework import serializers
from .models import *
from core.serializers import UserSerializer


class ProfileImageSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        profile_id = self.context['profile_id']
        return ProfileImage.objects.create(profile_id, **validated_data)

    class Meta:
        model = ProfileImage
        fields = ['id', 'image']


class ProfileSerializer(serializers.ModelSerializer):
    images = ProfileImageSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = ['id', 'username', 'first_name', 'last_name', 'images']


class ProjectImageSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        project_id = self.context['project_id']
        return ProjectImage.objects.create(project_id=project_id, **validated_data)

    class Meta:
        model = ProjectImage
        fields = ['id', 'image']


class ProjectSerializer(serializers.ModelSerializer):
    images = ProfileImageSerializer(many=True, read_only=True)
    creator = UserSerializer(read_only=True)

    class Meta:
        model = Project
        fields = ['id', 'title', 'description',
                  'creator', 'created_on', 'images']


class PostImageSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        post_id = self.context['post_id']
        return PostImage.objects.create(post_id=post_id, **validated_data)

    class Meta:
        model = PostImage
        fields = ['id', 'alt', 'image']


class PostFileSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        post_id = self.context['post_id']
        return PostFile.objects.create(post_id=post_id, **validated_data)

    class Meta:
        model = PostFile
        fields = ['id', 'title', 'file']


class CommentSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        post_id = self.context['post_id']
        return Comment.objects.create(post_id=post_id, **validated_data)

    author = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'post', 'created_on', 'author', 'content']


class PostSerializer(serializers.ModelSerializer):

    images = PostImageSerializer(many=True, read_only=True)
    author = UserSerializer(read_only=True)
    files = PostFileSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'images', 'files', 'project', 'title', 'content',
                  'created_on', 'updated_at', 'author', 'like_count', 'comments']

    like_count = serializers.SerializerMethodField(method_name='likes_count')

    def likes_count(self, Post: Post):
        return Post.liked.all().count()
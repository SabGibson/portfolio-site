from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import CreateModelMixin, RetrieveModelMixin, UpdateModelMixin
from .models import *
from .serializers import *
from rest_framework import filters
from rest_framework import generics
# Create your views here.


class ProfileViewSet(CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = Profile.objects.prefetch_related('images').all()
    serializer_class = ProfileSerializer


class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.select_related(
        'creator').prefetch_related('images').all()
    serializer_class = ProjectSerializer

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)


class PostViewSet(ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.select_related('project').prefetch_related(
        'author').prefetch_related(
        'images').prefetch_related('files').prefetch_related('comments').all()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class CommentsViewSet(ModelViewSet):

    serializer_class = CommentSerializer

    def get_queryset(self):
        return Comment.objects.prefetch_related('author').filter(post_id=self.kwargs['post_pk'])

    def get_serializer_context(self):
        return {'post_id': self.kwargs['post_pk']}

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class ProfileImageViewSet(ModelViewSet):
    serializer_class = ProfileImageSerializer

    def get_queryset(self):
        return ProfileImage.objects.filter(profile_id=self.kwargs['profile_pk'])

    def get_serializer_context(self):
        return {'profile_id': self.kwargs['profile_pk']}


class ProjectImageViewSet(ModelViewSet):
    serializer_class = ProjectImageSerializer

    def get_queryset(self):
        return ProjectImage.objects.filter(project_id=self.kwargs['project_pk'])

    def get_serializer_context(self):
        return {'project_id': self.kwargs['project_pk']}


class PostImageViewSet(ModelViewSet):
    serializer_class = PostImageSerializer

    def get_queryset(self):
        return PostImage.objects.filter(post_id=self.kwargs['post_pk'])

    def get_serializer_context(self):
        return {'post_id': self.kwargs['post_pk']}


class PostFileViewSet(ModelViewSet):
    serializer_class = PostFileSerializer

    def get_queryset(self):
        return PostFile.objects.filter(post_id=self.kwargs['post_pk'])

    def get_serializer_context(self):
        return {'post_id': self.kwargs['post_pk']}


class PostByproject(ModelViewSet):

    serializer_class = PostSerializer

    def get_queryset(self):
        project_id = self.kwargs['pk']
        return Post.objects.filter(project_id=project_id)

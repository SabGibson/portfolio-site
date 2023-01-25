from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import CreateModelMixin, RetrieveModelMixin, UpdateModelMixin
from .models import *
from .serializers import *
# Create your views here.


class ProfileViewSet(CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = Profile.objects.prefetch_related('images').all()
    serializer_class = ProfileSerializer


class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.prefetch_related('images').all()
    serializer_class = ProjectSerializer


class PostViewSet(ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.prefetch_related('project__images__comments').all()


class CommentsViewSet(ModelViewSet):

    serializer_class = CommentSerializer

    def get_queryset(self):
        return Comment.objects.filter(post_id=self.kwargs['post_pk'])

    def get_serializer_context(self):
        return {'post_id': self.kwargs['post_pk']}


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

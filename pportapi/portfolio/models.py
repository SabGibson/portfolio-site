from django.db import models
from django.conf import settings
# Create your models here.


class Profile(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    username = models.CharField(max_length=25)
    first_name = models.CharField(max_length=25)
    last_name = models.CharField(max_length=25)


class Project(models.Model):
    PROJECT_STATUS_CHOICES = [
        ('P', 'Public'),
        ('H', 'Hidden')
    ]
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=1, choices=PROJECT_STATUS_CHOICES)


class Post(models.Model):
    STATUS_CHOICES = [
        ('P', 'Published'),
        ('D', 'Draft')
    ]
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=1, choices=STATUS_CHOICES)

from django.db import models
from django.conf import settings
from .validators import validate_file_size, validate_document_size
from django.core.validators import FileExtensionValidator
from ckeditor.fields import RichTextField
# Create your models here.


class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL,
                                on_delete=models.CASCADE)
    username = models.CharField(max_length=25)
    first_name = models.CharField(max_length=25)
    last_name = models.CharField(max_length=25)

    def __str__(self) -> str:
        return self.username


class ProfileImage(models.Model):
    profile = models.OneToOneField(
        Profile, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='profile/images', validators=[validate_file_size])


class Project(models.Model):
    PROJECT_STATUS_CHOICES = [
        ('P', 'Public'),
        ('H', 'Hidden')
    ]
    creator = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=200)
    description = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(
        max_length=1, choices=PROJECT_STATUS_CHOICES, default='P')


class ProjectImage(models.Model):
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='project/images',validators=[validate_file_size])


class Post(models.Model):
    STATUS_CHOICES = [
        ('P', 'Published'),
        ('D', 'Draft')
    ]

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='author')
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(
        max_length=1, choices=STATUS_CHOICES, default='P')
    liked = models.ManyToManyField(Profile, default=None, blank=True)

    def __str__(self) -> str:
        return f"{self.title} by {self.author.username}"


class PostImage(models.Model):
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='post/images',validators=[validate_file_size])

class PostFile(models.Model):
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name='files')
    file = models.FileField(upload_to='post/files',validators=[validate_document_size,FileExtensionValidator(allowed_extensions=['pdf','py','xls','js','doc','txt'])])


class Comment(models.Model):

    COMMENT_STATUS_CHOICES = [
        ('P', 'Public'),
        ('H', 'Hidden')
    ]
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name="comments")
    content = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=1, choices=COMMENT_STATUS_CHOICES, default='P')

    class Meta:
        ordering = ("created_on",)

    def __str__(self) -> str:
        return f"{self.author.username} commented on {self.created_on}"

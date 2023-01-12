from django.contrib import admin
from .models import *
# Register your models here.


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'username']
    list_editable = ['username']
    ordering = ['first_name', 'last_name']
    list_per_page = 10


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'description',
                    'created_on', 'updated_at', 'status']
    list_editable = ['status']
    ordering = ['title', 'created_on', 'updated_at']


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['author', 'title',
                    'created_on', 'updated_at', 'status']
    list_editable = ['status']


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['author', 'post', 'created_on', 'status']
    list_editable = ['status']

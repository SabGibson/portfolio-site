from django.urls import path, include
from rest_framework_nested import routers
from . import views


router = routers.DefaultRouter()
router.register('profiles', views.ProfileViewSet)
router.register('projects', views.ProjectViewSet)
router.register('posts', views.PostViewSet)


profile_router = routers.NestedDefaultRouter(
    router, 'profiles', lookup='profile')
profile_router.register('images', views.ProfileImageViewSet,
                        basename='profile-images')

projects_router = routers.NestedDefaultRouter(
    router, 'projects', lookup='project')

projects_router.register(
    'images', views.ProjectImageViewSet, basename='project-images')

posts_router = routers.NestedDefaultRouter(router, 'posts', lookup='post')
posts_router.register('images', views.PostImageViewSet, basename='post-images')


urlpatterns = [

    path('', include(router.urls)),
    path('', include(posts_router.urls)),
    path('', include(projects_router.urls)),
    path('', include(profile_router.urls))
]

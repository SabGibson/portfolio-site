from django.urls import path, include
from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()
router.register('user-profiles', views.ProfileViewSet)
router.register('projects', views.ProjectViewSet)
router.register('posts', views.PostViewSet)

posts_router = routers.NestedDefaultRouter(router, 'posts', lookup='post')
posts_router.register('comments', views.CommentsViewSet,
                      basename='post-comments')

urlpatterns = [

    path('', include(router.urls)),
    path('', include(posts_router.urls))
]

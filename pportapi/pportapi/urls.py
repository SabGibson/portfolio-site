from django.contrib import admin
from django.urls import path, include
from core.views import LogoutAPIView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include('portfolio.urls')),
    path("auth/", include('djoser.urls')),
    path("auth/", include('djoser.urls.jwt')),
    path('logout/', LogoutAPIView.as_view())


]

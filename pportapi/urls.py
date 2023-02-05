from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from core.views import LogoutAPIView


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include('portfolio.urls')),
    path("auth/", include('djoser.urls')),
    path("auth/", include('djoser.urls.jwt')),
    path('logout/', LogoutAPIView.as_view()),
    path('',include('core.urls'))


] + static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)

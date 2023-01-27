import pytest
from core.models import User
from rest_framework.test import APIClient
from rest_framework import status


@pytest.mark.django_db
class TestCreatePost:
    def test_if_anon_can_post(self):
        client = APIClient()
        response = client.post('/posts/', {"title": "a", "content": "a"})

        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_if_anon_can_read(self):
        client = APIClient()
        response = client.get('/posts/')

        assert response.status_code == status.HTTP_200_OK

    def test_if_anon_can_patch(self):
        client = APIClient()
        response = client.patch('/posts/', {"title": "a", "content": "a"})

        assert response.status_code == status.HTTP_405_METHOD_NOT_ALLOWED

    def test_if_anon_can_delete(self):
        client = APIClient()
        response = client.delete('/posts/1')

        assert response.status_code == status.HTTP_301_MOVED_PERMANENTLY

    def test_if_auth_can_post(self):
        client = APIClient()
        client.force_authenticate(user=User)
        response = client.post(
            '/posts/', {"title": "a", "content": "a", "author": "User"})

        assert response.status_code == status.HTTP_400_BAD_REQUEST

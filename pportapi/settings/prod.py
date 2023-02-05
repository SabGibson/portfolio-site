from .common import *
import dj_database_url

DEBUG = False

SECRET_KEY = os.environ['SECRET_KEY']


ALLOWED_HOSTS = ["pportio-server.herokuapp.com", '127.0.0.1', 'localhost']

DATABASES = {
    "default": dj_database_url.config(conn_max_age=600)
}


CLOUDINARY_STORAGE = {
    'CLOUD_NAME': 'dsk6u4n3g',
    'API_KEY': os.environ['API_KEY'],
    'API_SECRET': os.environ['API_SECRET'],
}

DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.RawMediaCloudinaryStorage'

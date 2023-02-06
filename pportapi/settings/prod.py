from .common import *
import dj_database_url

DEBUG = False

SECRET_KEY = os.environ['SECRET_KEY']


ALLOWED_HOSTS = ["pportio-server.herokuapp.com",
                 '127.0.0.1', 'localhost', 'pportio.surge.sh']

DATABASES = {
    "default": dj_database_url.config(conn_max_age=600)
}


CLOUDINARY_STORAGE = {
    'CLOUDINARY_URL': os.environ['CLOUDINARY_URL']
}

DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.RawMediaCloudinaryStorage'

from .common import *
import dj_database_url

DEBUG = False

SECRET_KEY = os.environ['SECRET_KEY']


ALLOWED_HOSTS = ["pportio-server.herokuapp.com",'127.0.0.1','localhost']

DATABASES = {
    "default": dj_database_url.config(conn_max_age=600)
}

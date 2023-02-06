from .common import *
SECRET_KEY = "ylw)a9pr@xslm_7wm&+8*2+w^+m4i!p%u7o_!i%f+if0u)ty=-"
DEBUG = True
ALLOWED_HOSTS = ['127.0.0.1', 'localhost']

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": "pportDB",
        "USER": "postgres",
        "PASSWORD": "poptropica",
        "HOST": "localhost",
        "PORT": ""
    }
}

from .base import *

DEBUG = False
ALLOWED_HOSTS = [
    'holo-apollo.art',
    'www.holo-apollo.art',
    'holo-apollo.herokuapp.com',
    'www.holo-apollo.herokuapp.com',
]

SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

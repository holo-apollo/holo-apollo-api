from .staging import *

DEBUG = False
ALLOWED_HOSTS = [
    'holo-apollo.art',
    'www.holo-apollo.art',
    'holo-apollo.herokuapp.com',
    'www.holo-apollo.herokuapp.com',
    'api.holo-apollo.art',
    'holo-apollo-api.herokuapp.com',
    'www.holo-apollo-api.herokuapp.com',
]

SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

API_URL = 'https://api.holo-apollo.art'
UI_URL = 'https://www.holo-apollo.art'

# AWS
STATICFILES_LOCATION = 'static'
MEDIAFILES_LOCATION = 'media'

CORS_ORIGIN_WHITELIST = [
    'holo-apollo.herokuapp.com',
    'holo-apollo.art',
]

CSRF_TRUSTED_ORIGINS = CORS_ORIGIN_WHITELIST

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _

from common.fields import PhoneField
from .managers import HoloUserManager


class HoloUser(AbstractBaseUser, PermissionsMixin):
    objects = HoloUserManager()

    username = models.CharField(
        max_length=30,
        unique=True,
        error_messages={
            'unique': _('That username is already taken.')
        }
    )
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)

    email = models.EmailField(
        max_length=254,
        unique=True,
        error_messages={
            'unique': _('That email address is already taken.')
        }
    )
    phone = PhoneField(
        unique=True,
        error_messages={
            'unique': _('That phone number is already taken.')
        }
    )

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)
    last_updated = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'phone']

    def __str__(self):
        return f'{self.get_full_name()} {self.email}'

    def get_short_name(self):
        return self.first_name

    def get_full_name(self):
        return f'{self.first_name} {self.last_name}'
    get_full_name.short_description = _('Full name')


class Subscription(models.Model):
    email = models.EmailField(
        max_length=254,
        unique=True,
        error_messages={
            'unique': _('That email address is already subscribed.')
        }
    )

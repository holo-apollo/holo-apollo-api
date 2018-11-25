import uuid

from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.urls import reverse
from django.utils import timezone
from django.utils.translation import get_language
from django.utils.translation import ugettext_lazy as _

from model_utils.models import TimeStampedModel

from common.fields import PhoneField
from common.tasks import send_email, send_email_to_managers, send_template_email
from .managers import HoloUserManager


def avatar_upload_path(self, filename):
    return f'avatars/{self.username}/{filename}'


class HoloUser(AbstractBaseUser, PermissionsMixin):
    objects = HoloUserManager()

    username = models.CharField(
        verbose_name=_('Username'),
        max_length=30,
        unique=True,
        error_messages={
            'unique': _('That username is already taken.')
        }
    )
    first_name = models.CharField(
        verbose_name=_('First name'),
        max_length=30,
        blank=True,
        default=''
    )
    last_name = models.CharField(
        verbose_name=_('Last name'),
        max_length=30,
        blank=True,
        default=''
    )

    email = models.EmailField(
        verbose_name=_('Email'),
        max_length=254,
        unique=True,
        error_messages={
            'unique': _('That email address is already taken.')
        }
    )
    email_confirmed = models.BooleanField(
        verbose_name=_('Email confirmed'),
        default=False
    )
    email_confirm_token = models.UUIDField(default=uuid.uuid4, editable=False)
    phone = PhoneField(
        verbose_name=_('Phone'),
        null=True,
        blank=True,
        unique=True,
        error_messages={
            'unique': _('That phone number is already taken.')
        }
    )

    is_staff = models.BooleanField(
        verbose_name=_('Staff status'),
        default=False
    )
    is_active = models.BooleanField(
        verbose_name=_('Active status'),
        default=True
    )
    date_joined = models.DateTimeField(
        verbose_name=_('Date joined'),
        default=timezone.now
    )
    last_updated = models.DateTimeField(
        verbose_name=_('Last updated'),
        auto_now=True
    )
    avatar = models.ImageField(
        verbose_name=_('Avatar'),
        null=True,
        blank=True,
        upload_to=avatar_upload_path
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'phone']

    class Meta:
        verbose_name = _('User')
        verbose_name_plural = _('Users')

    def __str__(self):
        return f'{self.get_full_name()} {self.email}'

    def get_short_name(self):
        return self.first_name

    def get_full_name(self):
        return f'{self.first_name} {self.last_name}'
    get_full_name.short_description = _('Full name')

    def save(self, *args, **kwargs):
        is_new = not self.pk
        super(HoloUser, self).save(*args, **kwargs)
        if is_new:
            text_content = _('To confirm your email address, follow the link: %s') % \
                settings.SITE_URL + reverse('confirm-email') + f'?token={self.email_confirm_token}'
            send_email.delay(
                self.email,
                _('Holo-Apollo Email Confirmation'),
                text_content,
            )

    @property
    def buyer(self):
        from buyers.models import Buyer
        try:
            return self._buyer
        except Buyer.DoesNotExist:
            return None

    @property
    def store(self):
        from stores.models.store import Store
        try:
            return self._store
        except Store.DoesNotExist:
            return None


class Subscription(TimeStampedModel):
    email = models.EmailField(
        verbose_name=_('Email'),
        max_length=254,
        unique=True,
        error_messages={
            'unique': _('That email address is already subscribed.')
        }
    )
    subscribed = models.BooleanField(
        verbose_name=_('Subscribed'),
        default=True
    )
    edit_token = models.UUIDField(default=uuid.uuid4, editable=False)

    class Meta:
        verbose_name = _('Subscription')
        verbose_name_plural = _('Subscriptions')

    def save(self, **kwargs):
        previously_subscribed = False
        if self.pk:
            prev_version = Subscription.objects.get(pk=self.pk)
            previously_subscribed = prev_version.subscribed
        super(Subscription, self).save(**kwargs)
        if not previously_subscribed and self.subscribed:
            send_template_email.delay(
                recipient=self.email,
                subject_template_name='emails/subscription_subject.txt',
                email_template_name='emails/subscription.txt',
                html_email_template_name='emails/subscription.html',
                context={
                    'token': self.edit_token,
                    'host': settings.SITE_URL
                },
                language=get_language()
            )
            url = reverse('admin:users_subscription_change', kwargs={'object_id': self.id})
            send_email_to_managers.delay(
                subject="Новая подписка",
                message=f"Появилась новая подписка на сайте: {settings.SITE_URL}{url}"
            )

    def __str__(self):
        subscribed = 'subscribed' if self.subscribed else 'not subscribed'
        return f'{self.email}: {subscribed}'

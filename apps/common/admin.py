from django.contrib import admin
from django.contrib.auth.models import Group
from django.utils.translation import gettext_lazy as _

from rest_framework.authtoken.models import Token

from .models import Color, Size

admin.site.unregister(Group)
admin.site.unregister(Token)

admin.site.site_title = _('Holo-Apollo site admin')
admin.site.site_header = _('Holo-Apollo administration')


@admin.register(Color)
class ColorAdmin(admin.ModelAdmin):
    search_fields = ['definition']


@admin.register(Size)
class SizeAdmin(admin.ModelAdmin):
    search_fields = ['definition']

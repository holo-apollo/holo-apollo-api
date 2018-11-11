from django.contrib import admin
from django.db.models import ImageField

from common.admin import Select2ModelAdmin
from common.forms import ImageWidget
from .forms import StoreApplicationForm
from .models.store import Store
from .models.store_application import StoreApplication
from .models.store_application_image import StoreApplicationImage


@admin.register(Store)
class StoreAdmin(Select2ModelAdmin):
    pass


class StoreApplicationImageInline(admin.TabularInline):
    model = StoreApplicationImage
    fields = ('image',)
    formfield_overrides = {
        ImageField: {'widget': ImageWidget}
    }


@admin.register(StoreApplication)
class StoreApplicationAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'instagram_name', 'category',)
    form = StoreApplicationForm
    inlines = [StoreApplicationImageInline]

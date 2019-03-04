from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from .models import Good, GoodsCategory, GoodSpecifications


class GoodsCategoryInline(admin.TabularInline):
    model = GoodsCategory
    verbose_name = _('subcategory')
    verbose_name_plural = _('subcategories')
    fields = ['name', 'slug']


class GoodSpecificationsInline(admin.StackedInline):
    model = GoodSpecifications
    autocomplete_fields = ['color', 'size']


@admin.register(GoodsCategory)
class GoodsCategoryAdmin(admin.ModelAdmin):
    inlines = [GoodsCategoryInline]
    list_display = ['name', 'categories_names_chain']
    readonly_fields = ['categories_names_chain', 'goods_names']
    autocomplete_fields = ['parent_category']
    search_fields = ['name']
    prepopulated_fields = {"slug": ('name_en',)}


@admin.register(Good)
class GoodAdmin(admin.ModelAdmin):
    readonly_fields = ['categories_names']
    list_display = ['name', 'categories_names', 'seller', 'price']
    autocomplete_fields = ['category', 'seller']
    inlines = [GoodSpecificationsInline]
    search_fields = ['name']

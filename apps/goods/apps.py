from django.apps import AppConfig
from django.utils.translation import ugettext_lazy as _


class GoodsConfig(AppConfig):
    name = 'goods'
    verbose_name = _('Goods')

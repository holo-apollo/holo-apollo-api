from django_elasticsearch_dsl_drf.serializers import DocumentSerializer

from goods.documents import GoodDocument


class GoodDocumentSerializer(DocumentSerializer):
    class Meta:
        document = GoodDocument
        fields = ['id', 'name', 'description', 'categories_ids', 'categories', 'seller', 'created',
                  'modified']

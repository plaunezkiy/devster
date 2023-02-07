import base64
from django.core.files.base import ContentFile
from rest_framework import serializers
from flash_cards.models import Card, Module, Session


class Base64ImageField(serializers.ImageField):
    def to_internal_value(self, data):
        if isinstance(data, str) and data.startswith('data:image'):
            format, imgstr = data.split(';base64,')
            ext = format.split('/')[-1]
            data = ContentFile(base64.b64decode(imgstr), name='temp.' + ext)
        return super().to_internal_value(data)


# to avoid loading the actual image file, encode it as base64 instead
#  before it's sent and decode it when received
class ModuleSerializer(serializers.ModelSerializer):
    image = Base64ImageField(required=False, allow_null=True)

    class Meta:
        model = Module
        lookup_field = 'slug'
        fields = "__all__"


class CardSerializer(serializers.ModelSerializer):
    # module = ModuleSerializer(read_only=True)

    class Meta:
        model = Card
        fields = "__all__"


class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = "__all__"

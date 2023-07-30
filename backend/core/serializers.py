from rest_framework.serializers import ModelSerializer
from core.models import App


class AppSerializer(ModelSerializer):
    class Meta:
        model = App
        fields = "__all__"

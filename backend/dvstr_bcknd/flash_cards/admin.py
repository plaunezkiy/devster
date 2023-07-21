from django.contrib import admin
from flash_cards.models import Module, Card, Session, SessionCardAnswer

admin.site.register(Module)
admin.site.register(Card)
admin.site.register(Session)
admin.site.register(SessionCardAnswer)

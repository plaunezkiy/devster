from django.forms import ModelForm
from flash_cards.models import Card
from taggit.forms import TagField


class CardForm(ModelForm):
    class Meta:
        model = Card
        fields = ("front", "back", "hint", "invertible", "tags")
    
    def edit(self):
        card = self.instance
        card.front = self.cleaned_data["front"]
        card.back = self.cleaned_data["back"]
        card.hint = self.cleaned_data["hint"]
        card.invertible = self.cleaned_data["invertible"]
        tags = self.cleaned_data.get("tags")
        if tags:
            card.tags.set(tags, clear=True)
        card.save()
    
    # def save(self):
    #     user = super(CardForm, self).save(commit=False)

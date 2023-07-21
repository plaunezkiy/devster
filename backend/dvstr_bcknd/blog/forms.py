from django import forms

from blog.models import Post


class PostAdminForm(forms.ModelForm):
    text = forms.CharField(widget=forms.Textarea(attrs={'id': 'richtext_field'}))

    class Meta:
        model = Post
        fields = '__all__'

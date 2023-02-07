from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

api_urls = map(lambda app: path(f'api/{app["url"]}', include(app["path"])), [
    {"url": "auth/", "path": "rest_framework.urls"},
    # {"url": "cards/", "path": "flash_cards.api_urls"},
    {"url": "blog/", "path": "blog.urls"},
])

urlpatterns = [
    path('admin/', admin.site.urls),
    path('cards/', include('flash_cards.urls')),
    path('api/cards/', include('flash_cards.api_urls', namespace='api')),
    path("__reload__/", include("django_browser_reload.urls")),
]
urlpatterns += api_urls

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)

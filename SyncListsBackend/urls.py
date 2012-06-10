from django.conf.urls import patterns, include, url
import settings
from django.views.generic.simple import redirect_to

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
	# Examples:
	# url(r'^$', 'SyncListsBackend.views.home', name='home'),
	# url(r'^SyncListsBackend/', include('SyncListsBackend.foo.urls')),

	# Uncomment the admin/doc line below to enable admin documentation:
	# url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

	# Uncomment the next line to enable the admin:
	# url(r'^admin/', include(admin.site.urls)),
	url(r'^$', redirect_to, {'url': '/index.html'}),
	url(r'^(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT, 'show_indexes': True}),
)

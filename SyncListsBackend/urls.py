from django.conf.urls import patterns, include, url
from django.views.generic.simple import redirect_to
from django.contrib.staticfiles.urls import staticfiles_urlpatterns


# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()


urlpatterns = patterns('',
	# Examples:
	# url(r'^$', 'SyncListsBackend.views.home', name='home'),
	# url(r'^SyncListsBackend/', include('SyncListsBackend.foo.urls')),

	# Uncomment the admin/doc line below to enable admin documentation:
	#url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

	# Uncomment the next line to enable the admin:
	url(r'^admin/', include(admin.site.urls)),

	url(r'^api/', include('SyncedList.urls_api')),
	url(r'^$', redirect_to, {'url': '/static/index.html'}),
)
urlpatterns += staticfiles_urlpatterns()

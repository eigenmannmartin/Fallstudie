from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
	url(r'^$', 'SyncedList.views_dev.dev_login'),
	url(r'^user/$', 'SyncedList.views_dev.dev_user'),
	url(r'^logout/$', 'SyncedList.views_dev.dev_logout'),

)
from django.conf.urls import patterns, include, url
from SyncedList.models import *
from SyncedList.resources import *
from tastypie.api import Api
from django.views.generic.simple import redirect_to


# url is: /api/v1/
v1_api = Api(api_name='SL')
v1_api.register(EntryResource())
v1_api.register(ListResource())


urlpatterns = patterns('',
	url(r'^SL/$', redirect_to, {'url': '/static/api.html'}),
	url(r'^login/$', 'SyncedList.views_um.um_login'),
	url(r'^login/user/$', 'SyncedList.views_um.um_user'),
	url(r'^logout/$', 'SyncedList.views_um.um_logout'),
    url(r'^$', redirect_to, {'url': '/static/api.html'}),
    url(r'^', include(v1_api.urls)),
)

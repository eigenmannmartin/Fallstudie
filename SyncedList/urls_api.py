from django.conf.urls import patterns, include, url
from SyncedList.models import *
from tastypie.api import Api


# url is: /api/v1/
v1_api = Api(api_name='SL')
v1_api.register(EntryResource())
v1_api.register(ListResource())


urlpatterns = patterns('',
    url(r'^', include(v1_api.urls)),
)

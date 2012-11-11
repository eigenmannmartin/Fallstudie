from django.conf.urls import patterns, include, url
from SyncedList.models import EntryResource


entry_resource = EntryResource()

urlpatterns = patterns('',
    url(r'^entry/$', include(entry_resource.urls)),
)

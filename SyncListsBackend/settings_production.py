from settings import *

DEBUG = False
TEMPLATE_DEBUG = DEBUG


import dj_database_url
DATABASES['default'] = dj_database_url.config()
web: python ./manage.py collectstatic --noinput; gunicorn SyncListsBackend.wsgi:application -b 0.0.0.0:$PORT

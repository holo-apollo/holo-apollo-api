#!/usr/bin/env bash

python manage.py migrate --noinput
python manage.py fasts3collectstatic --noinput

release: ./scripts/release.sh
web: gunicorn config.wsgi
worker: celery worker --app=config.celery.app
storybook: npm run storybook

# Django & React ToDo List App

> This project is a practice personal project to learn Django REST Framework & React integration. This [README.md](http://readme.md) serves is a study note.

### Set up Django

```bash
django-admin startproject mysite
python [manage.py](http://manage.py/) startapp myapi
#Add 'myapi.apps.MyapiConfig' to INSTALLED_APPS in Django
python [manage.py](http://manage.py/) migrate
python [manage.py](http://manage.py/) createsuperuser

#Install REST framework. Make sure to use ve
pip install djangorestframework
```

### Register models in admin sqlite3

```python
#In [admin.py](http://admin.py/)
admin.site.register(MODEL_NAME)
```

### Note of HTTP methods & REST API

- GET — The most common option, returns some data from the API based on the endpoint you visit and any parameters you provide
- POST — Creates a new record that gets appended to the database
- PUT — Looks for a record at the given URI you provide. If it exists, update the existing record. If not, create a new record
- DELETE — Deletes the record at the given URI
- PATCH — Update individual fields of a record

---

### Cross-site resource sharing - How to serve files from different locations than origin in Django

1. python -m pip install django-cors-headers
2. Add to Django app & middleware (Follow the add-on doc)
3. Add the white list CORS_ALLOWED_ORIGINS the URL of the frontend page

### React notes

- Create a project

    ```bash
    npx create-react-app <app_name>
    ```

- Run a development server

    ```bash
    npm start
    ```

- Build a production code

    ```bash
    npm run build
    ```

### How to integrate a React app & Server from Django

1. cd into the frontend directory, and run "npm run build"
2. For Django, add the frontend's build/index.html to settings.py's TEMPLATES=>DIRS
3. Add STATICFILES_DIRS variable to settings.py.

    ```bash
    STATIC_URL = '/static/'

    #IMPORTANT for serving React files
    STATICFILES_DIRS = [
        os.path.join(BASE_DIR, '<react_app_dir>/build/static'),
    ]
    ```

### Resource

- This project is inspired by
    - Django API Tutorial: [https://youtu.be/TmsD8QExZ84](https://youtu.be/TmsD8QExZ84)
    React Frontend tutorial: [https://youtu.be/W9BjUoot2Eo](https://youtu.be/W9BjUoot2Eo)

### Further readings

- [All you have to know about Permissions in Django REST Framework](https://www.simonbliznyuk.com/All-you-need-to-know-about-permissions-in-Django-REST-Framework)
- [Official Tutorial on Django REST Framework](https://www.django-rest-framework.org/tutorial/1-serialization/)

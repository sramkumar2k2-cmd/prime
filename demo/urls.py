from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("about/", views.about, name="about"),
    path("services/", views.services, name="services"),
    path("blog/", views.blog, name="blog"),
    path("careers/", views.career, name="careers"),
    path("contact/", views.contact, name="contact"),
      path('subscribe/', views.newsletter_subscribe, name='newsletter_subscribe'), 
]
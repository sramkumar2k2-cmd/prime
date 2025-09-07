from django.shortcuts import render
from django.contrib import messages

def index(request):
    return render(request, 'index.html')

def services(request):
    return render(request, 'services.html')

def about(request):
    return render(request, 'about.html')

def blog(request):
    return render(request, 'blog.html')

def careers(request):
    return render(request, 'careers.html')

def contact(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')

        # Save to database or send email logic here
        messages.success(request, 'Thanks for your message! We will get back to you soon.')

    return render(request, 'contact.html')

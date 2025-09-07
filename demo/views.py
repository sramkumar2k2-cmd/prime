from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.conf import settings
from django.contrib import messages
from django.http import JsonResponse
from .models import Subscriber  # Import the Subscriber model

def home(request):
    return render(request, "demo/home.html")

def about(request):
    return render(request, "demo/about.html")

def services(request):
    return render(request, "demo/services.html")

def blog(request):
    return render(request, "demo/blog.html")

def career(request):
    return render(request, "demo/career.html")

def contact(request):
    if request.method == "POST":
        name = request.POST.get("name")
        email = request.POST.get("email")
        company = request.POST.get("company")
        subject = request.POST.get("subject")
        message = request.POST.get("message")
        
        # Create email content
        email_subject = f"Primepath Contact: {subject} - From {name}"
        email_body = f"""
        New contact form submission from Primepath website:
        
        Name: {name}
        Email: {email}
        Company: {company}
        Subject: {subject}
        
        Message:
        {message}
        
        ---
        This email was sent from the contact form on Primepath.
        """
        
        try:
            # Send email
            send_mail(
                subject=email_subject,
                message=email_body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.CONTACT_EMAIL],  # Your email address
                fail_silently=False,
            )
            
            messages.success(request, 'Your message has been sent successfully! We will get back to you soon.')
        except Exception as e:
            messages.error(request, f'There was an error sending your message. Please try again later. Error: {str(e)}')
        
        return redirect('contact')
    
    return render(request, "demo/contact.html")

def newsletter_subscribe(request):
    if request.method == "POST":
        email = request.POST.get("email")
        
        # Basic validation
        if not email:
            if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                return JsonResponse({'success': False, 'message': 'Email is required'})
            messages.error(request, 'Email is required')
            return redirect(request.META.get('HTTP_REFERER', 'home'))
        
        # Check if already subscribed (if using database)
        # If you haven't created the Subscriber model yet, comment out the next 3 lines
        if Subscriber.objects.filter(email=email).exists():
            if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                return JsonResponse({'success': False, 'message': 'This email is already subscribed'})
            messages.warning(request, 'This email is already subscribed')
            return redirect(request.META.get('HTTP_REFERER', 'home'))
        
        # Save to database (if using database)
        # If you haven't created the Subscriber model yet, comment out the next 3 lines
        subscriber = Subscriber(email=email)
        subscriber.save()
        
        # Send confirmation email (optional)
        try:
            send_mail(
                'Welcome to Primepath Newsletter!',
                'Thank you for subscribing to our newsletter. You\'ll receive marketing tips and industry insights regularly.',
                settings.DEFAULT_FROM_EMAIL,
                [email],
                fail_silently=False,
            )
        except Exception as e:
            print(f"Failed to send confirmation email: {e}")
            # Don't break the subscription if email fails
        
        # Return appropriate response based on request type
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            return JsonResponse({'success': True, 'message': 'Successfully subscribed to newsletter!'})
        
        messages.success(request, 'Successfully subscribed to our newsletter!')
        return redirect(request.META.get('HTTP_REFERER', 'home'))
    
    # If not a POST request, redirect to home
    return redirect('home')
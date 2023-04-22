from django.views.decorators.http import require_http_methods
from django.shortcuts import render, redirect
from django.http import HttpResponse
from requests import post
import os
import json
import base64


def index(request, path=None):
    return render(request, 'radio/index.html')


def callback(request):
    print(dir(request))
    print(request.get_host(), request.get_port(), request.get_raw_uri())
    code = request.GET.get("code")
    if not code:
        # redirect to error if no code provided
        return HttpResponse("None")
    # get the tokens
    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'authorization_code',
        'code': code,
        # 'redirect_uri': os.getenv('SPOTIFY_REDIRECT_URI'),
        'redirect_uri': f'http://{request.get_host()}/apps/radio/callback',
        # 'redirect_uri': 'http://172.21.4.112:8000/apps/radio/callback',
        'client_id': os.getenv('SPOTIFY_CLIENT_ID'),
        'client_secret': os.getenv('SPOTIFY_CLIENT_SECRET'),
    })
    if not response.ok:
        return HttpResponse(f"Error: {response.json()}",)
        # redirect to error page with error
        return redirect('')
    # request.session['code']
    request.session['spotify_data'] = response.json()
    return redirect('radio-demo')
    # return redirect('radio-index')


def refresh_token(request, refresh_token):
    # data = json.loads(request.body)
    # refresh_token = data['refresh_token']
    auth_header = os.getenv("SPOTIFY_CLIENT_ID") + ':' + os.getenv("SPOTIFY_CLIENT_SECRET")
    response = post(
        "https://accounts.spotify.com/api/token",
        headers={'Authorization': "Basic "  + base64.b64encode(auth_header.encode()).decode()}, 
        data={
            'grant_type': "refresh_token",
            'refresh_token': refresh_token
            }
        )
    if not response.ok:
        return HttpResponse(f"Error: {response}",)
        # redirect to error page with error
        return redirect('')
    access_token = response.json()['access_token']
    # request.session['code']
    request.session['spotify_data']['access_token'] = access_token
    request.session.modified = True
    print(request.session['spotify_data']['access_token'])
    # print(response.json())
    return redirect('radio-demo')

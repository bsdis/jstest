#from django.shortcuts import render
#from rest_framework.views import APIView
#from rest_framework.response import Response
#from rest_framework.permissions import IsAuthenticated


# class HelloView(APIView):
#    #permission_classes = (IsAuthenticated,)

#    def get(self, request):
#        content = {'message': 'Hello, World!'}
#        return Response(content)

from django.http import JsonResponse
from django.middleware.csrf import get_token


def csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})


def ping(request):
    return JsonResponse({'result': 'OK'})

from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TaskSerializer
from .models import Task

@api_view(['GET'])
def apiOverview(request):
	api_urls = {
		'List':'/task-list/',
		'Detail View':'/task-detail/<str:pk>/',
		'Create':'/task-create/',
		'Update':'/task-update/<str:pk>/',
		'Delete':'/task-delete/<str:pk>/',
		}

	return Response(api_urls)

@api_view(['GET'])
def taskList(request):
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True) #many=> query
    return Response(serializer.data)

@api_view(['GET'])
def taskDetail(request, pk):
    try:
        tasks = Task.objects.get(id=pk) #Use get() method
        serializer = TaskSerializer(tasks, many=False)
        return Response(serializer.data)
    except:
	    return Response({"detail":"Resource not found."})

@api_view(["POST"])
def taskCreate(request):
	serializer = TaskSerializer(data=request.data)
	if serializer.is_valid():
		serializer.save()
		return Response(serializer.data)
	else:
		return Response(serializer.errors)

@api_view(["POST"])
def taskUpdate(request, pk):
	task = Task.objects.get(id=pk)
	serializer = TaskSerializer(instance=task, data=request.data)
	if serializer.is_valid():
		serializer.save()
		return Response(serializer.data)
	else:
		return Response(serializer.errors)

@api_view(["DELETE"])
def taskDelete(request, pk):
    try:
        task = Task.objects.get(id=pk)
        task.delete()
        return Response({"detail":"Item deleted."})
    except:
	    return Response({"detail":"Resource not found."})

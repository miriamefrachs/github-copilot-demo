import os

from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Activity, Leaderboard, Team, User, Workout
from .serializers import (
    ActivitySerializer,
    LeaderboardSerializer,
    TeamSerializer,
    UserSerializer,
    WorkoutSerializer,
)


@api_view(["GET"])
def api_root(request, format=None):
    codespace = os.environ.get("CODESPACE_NAME")
    if codespace and not request.get_host().startswith("localhost"):
        base_url = f"https://{codespace}-8000.app.github.dev/"
    else:
        base_url = request.build_absolute_uri("/")
    return Response(
        {
            name: f"{base_url}api/{name}/"
            for name in ("users", "teams", "activity", "leaderboard", "workouts")
        }
    )


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer


class LeaderboardViewSet(viewsets.ModelViewSet):
    queryset = Leaderboard.objects.all()
    serializer_class = LeaderboardSerializer


class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer

from bson import ObjectId
from rest_framework import serializers

from .models import Activity, Leaderboard, Team, User, Workout


class ObjectIdField(serializers.Field):
    def to_representation(self, value):
        return str(value)

    def to_internal_value(self, data):
        return ObjectId(data)


class BaseSerializer(serializers.ModelSerializer):
    _id = ObjectIdField(read_only=True)


class UserSerializer(BaseSerializer):
    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {
            "password": {"write_only": True},
            # DRF's default UniqueValidator uses .exists(), which djongo's SQL parser can't handle
            "email": {"validators": []},
        }

    def validate_email(self, value):
        duplicates = User.objects.filter(email=value)
        if self.instance:
            duplicates = duplicates.exclude(pk=self.instance.pk)
        if len(duplicates) > 0:
            raise serializers.ValidationError("A user with this email already exists.")
        return value


class TeamSerializer(BaseSerializer):
    class Meta:
        model = Team
        fields = "__all__"


class ActivitySerializer(BaseSerializer):
    class Meta:
        model = Activity
        fields = "__all__"


class LeaderboardSerializer(BaseSerializer):
    class Meta:
        model = Leaderboard
        fields = "__all__"


class WorkoutSerializer(BaseSerializer):
    class Meta:
        model = Workout
        fields = "__all__"

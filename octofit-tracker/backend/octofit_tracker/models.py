from djongo import models


class User(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128, blank=True)
    team_id = models.CharField(max_length=24, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "users"

    def __str__(self):
        return self.email


class Team(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "teams"

    def __str__(self):
        return self.name


class Activity(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    activity_id = models.CharField(max_length=64, unique=True)
    user_id = models.CharField(max_length=24)
    type = models.CharField(max_length=100)
    duration = models.FloatField(help_text="Duration in minutes")
    distance = models.FloatField(blank=True, null=True)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "activity"

    def __str__(self):
        return f"{self.activity_id} ({self.type})"


class Leaderboard(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    leaderboard_id = models.CharField(max_length=64, unique=True)
    user_id = models.CharField(max_length=24)
    team_id = models.CharField(max_length=24, blank=True, null=True)
    points = models.IntegerField(default=0)

    class Meta:
        db_table = "leaderboard"

    def __str__(self):
        return self.leaderboard_id


class Workout(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    workout_id = models.CharField(max_length=64, unique=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    difficulty = models.CharField(max_length=50, blank=True)
    duration = models.FloatField(blank=True, null=True)

    class Meta:
        db_table = "workouts"

    def __str__(self):
        return self.name

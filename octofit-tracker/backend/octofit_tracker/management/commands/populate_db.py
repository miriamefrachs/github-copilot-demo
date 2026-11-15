from bson import ObjectId
from django.core.management.base import BaseCommand

from octofit_tracker.models import Activity, Leaderboard, Team, User, Workout

USERS = [
    ("thundergod", "thundergod@mhigh.edu", "thundergodpassword"),
    ("metalgeek", "metalgeek@mhigh.edu", "metalgeekpassword"),
    ("zerocool", "zerocool@mhigh.edu", "zerocoolpassword"),
    ("crashoverride", "crashoverride@hmhigh.edu", "crashoverridepassword"),
    ("sleeptoken", "sleeptoken@mhigh.edu", "sleeptokenpassword"),
]

TEAMS = ["Blue Team", "Gold Team"]

# (activity type, duration in minutes)
ACTIVITIES = [
    ("Cycling", 60),
    ("Crossfit", 120),
    ("Running", 90),
    ("Strength", 30),
    ("Swimming", 75),
]

SCORES = [100, 90, 95, 85, 80]

WORKOUTS = [
    ("Cycling Training", "Training for a road cycling event"),
    ("Crossfit", "Training for a crossfit competition"),
    ("Running Training", "Training for a marathon"),
    ("Strength Training", "Training for strength"),
    ("Swimming Training", "Training for a swimming competition"),
]


class Command(BaseCommand):
    help = "Populate the octofit_db database with test data for users, teams, activity, leaderboard, and workouts"

    def handle(self, *args, **kwargs):
        # Clear existing data but keep the collections and their indexes
        for model in (Leaderboard, Activity, Workout, User, Team):
            model.objects.all().delete()

        teams = [Team.objects.create(_id=ObjectId(), name=name) for name in TEAMS]

        users = [
            User.objects.create(
                _id=ObjectId(),
                name=name,
                email=email,
                password=password,
                team_id=str(teams[0 if i < 3 else 1]._id),
            )
            for i, (name, email, password) in enumerate(USERS)
        ]

        for i, (user, (kind, minutes)) in enumerate(zip(users, ACTIVITIES), start=1):
            Activity.objects.create(
                _id=ObjectId(),
                activity_id=f"activity-{i}",
                user_id=str(user._id),
                type=kind,
                duration=minutes,
            )

        for i, (user, score) in enumerate(zip(users, SCORES), start=1):
            Leaderboard.objects.create(
                _id=ObjectId(),
                leaderboard_id=f"leaderboard-{i}",
                user_id=str(user._id),
                team_id=user.team_id,
                points=score,
            )

        for i, (name, description) in enumerate(WORKOUTS, start=1):
            Workout.objects.create(
                _id=ObjectId(),
                workout_id=f"workout-{i}",
                name=name,
                description=description,
            )

        self.stdout.write(self.style.SUCCESS("Successfully populated the database with test data."))

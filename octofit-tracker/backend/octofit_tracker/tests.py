from rest_framework.test import APITestCase

ENDPOINTS = {
    "users": {"name": "Test User", "email": "test@mhigh.edu", "password": "pw"},
    "teams": {"name": "Blue Team", "description": "Test team"},
    "activity": {"activity_id": "a1", "user_id": "u1", "type": "run", "duration": 30},
    "leaderboard": {"leaderboard_id": "l1", "user_id": "u1", "points": 10},
    "workouts": {"workout_id": "w1", "name": "Pushups", "difficulty": "easy"},
}


class ApiRootTests(APITestCase):
    def test_api_root_lists_endpoints(self):
        data = self.client.get("/").json()
        self.assertEqual(set(data), set(ENDPOINTS))


class CollectionApiTests(APITestCase):
    def test_create_and_list_each_collection(self):
        for name, payload in ENDPOINTS.items():
            with self.subTest(endpoint=name):
                res = self.client.post(f"/api/{name}/", payload, format="json")
                self.assertEqual(res.status_code, 201, res.content)
                listing = self.client.get(f"/api/{name}/")
                self.assertEqual(listing.status_code, 200)
                self.assertEqual(len(listing.json()), 1)

    def test_user_email_must_be_unique(self):
        payload = ENDPOINTS["users"]
        self.assertEqual(self.client.post("/api/users/", payload, format="json").status_code, 201)
        self.assertEqual(self.client.post("/api/users/", payload, format="json").status_code, 400)

    def test_password_is_not_exposed(self):
        self.client.post("/api/users/", ENDPOINTS["users"], format="json")
        self.assertNotIn("password", self.client.get("/api/users/").json()[0])

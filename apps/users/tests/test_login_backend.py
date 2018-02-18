from unittest.mock import patch

from django.test import TestCase

from users.login_backend import HoloModelBackend
from .factories import HoloUserFactory


class TestLoginBackend(TestCase):
    def setUp(self):
        with patch('users.models.send_email.delay'):
            self.user = HoloUserFactory()
            self.user.set_password('12345')
            self.user.save()
            self.backend = HoloModelBackend()

    def test_login_with_email(self):
        authenticated = self.backend.authenticate(self.user.email, '12345')
        self.assertEqual(authenticated, self.user)

    def test_login_with_phone(self):
        authenticated = self.backend.authenticate(self.user.phone, '12345')
        self.assertEqual(authenticated, self.user)

    def test_wrong_password(self):
        authenticated = self.backend.authenticate(self.user.email, 'abcde')
        self.assertIsNone(authenticated)

    def test_wrong_user(self):
        authenticated = self.backend.authenticate('foo@holo-apollo.art', '12345')
        self.assertIsNone(authenticated)

    def test_get_user_success(self):
        self.assertEqual(self.backend.get_user(self.user.id), self.user)

    def test_get_user_error(self):
        self.assertIsNone(self.backend.get_user(333))

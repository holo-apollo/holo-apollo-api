from django.test import TestCase


class TestFailing(TestCase):
    def test_failing(self):
        self.assertEqual(2 + 2, 5)

    def test_failing_2(self):
        self.assertTrue(False)

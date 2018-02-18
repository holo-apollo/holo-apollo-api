from django.contrib.auth import login, authenticate

from rest_framework.decorators import list_route
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import mixins, viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from users.models import HoloUser
from users.serializers import HoloUserSerializer


class HoloUserViewSet(mixins.CreateModelMixin,
                      viewsets.GenericViewSet):
    queryset = HoloUser.objects.all()
    serializer_class = HoloUserSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        super(HoloUserViewSet, self).perform_create(serializer)
        login(self.request, serializer.instance)

    @list_route(methods=['POST'])
    def login(self, request):
        user = authenticate(
            request,
            username=request.data.get('username'),
            password=request.data.get('password')
        )

        if not user:
            raise AuthenticationFailed

        login(request, user)
        serializer = self.get_serializer(user)
        return Response(serializer.data)

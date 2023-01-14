from djoser.serializers import UserCreateSerializer as DjoserBaseUserCreateSerializer


class UserCreateSerializer(DjoserBaseUserCreateSerializer):
    class Meta(DjoserBaseUserCreateSerializer.Meta):
        fields = ['id', 'username' 'email', 'password',
                  ]

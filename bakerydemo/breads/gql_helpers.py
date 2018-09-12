from graphene_django.types import DjangoObjectType
from . import models


class Bread(DjangoObjectType):
    class Meta:
        model = models.BreadPage


class BreadType(DjangoObjectType):
    class Meta:
        model = models.BreadType


class Ingredient(DjangoObjectType):
    class Meta:
        model = models.BreadIngredient


class Country(DjangoObjectType):
    class Meta:
        model = models.Country
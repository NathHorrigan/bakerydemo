import graphene
from graphene_django.types import DjangoObjectType
from bakerydemo.base.models import Collection


class CollectionType(DjangoObjectType):
    class Meta:
        model = Collection

    authors = graphene.List(Author)
    def resolve_descendants(self):
        return Collection.objects.descendant_of(self, False)


class Query(graphene.ObjectType):

    collections = graphene.List(CollectionType)
    def resolve_collections(self, info):
        return Collection.objects.all()

    collection = graphene.Field(CollectionType, id=graphene.Int())
    def resolve_collection(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return Collection.objects.get(pk=id)


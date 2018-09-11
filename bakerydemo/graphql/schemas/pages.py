import graphene
from django.contrib.contenttypes.models import ContentType
from django.db.models import Q
from wagtail.core.models import get_page_models, Page
from bakerydemo.search.views import page_search
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField


class ContentTypeDjangoObjectType(DjangoObjectType):
    class Meta:
        model = ContentType


def generate_graphene_objects_for_all_page_types():
    models = get_page_models()
    graphene_objects = []
    for model in models:
        graphene_object = type(
            f'{model.__name__}',
            (DjangoObjectType,),
            {'Meta': type('Meta', (object,), {'model': model})}
        )
        graphene_objects.append(graphene_object)
    return graphene_objects


def get_unique_fields(self, _type=None):
    if _type:
        model = self.get_model_from_type(_type)
    else:
        model = self.model

    unique_fields = [f for f in model._meta.local_fields if f.unique]
    return unique_fields


class SpecificPage(graphene.Union):
    class Meta:
        types = generate_graphene_objects_for_all_page_types()


class PageDjangoObjectType(DjangoObjectType):
    specific = graphene.List(SpecificPage)
    content_type = graphene.Field(ContentTypeDjangoObjectType)

    def resolve_specific(self, info, **kwargs):
        return [self.specific]

    class Meta:
        model = Page
        filter_fields = ['title',]
        interfaces = (graphene.relay.Node, )


class PagesRootQuery(graphene.ObjectType):

    page = graphene.relay.Node.Field(PageDjangoObjectType)
    def resolve_page(self, info, **kwargs):
        id = kwargs.get('id')
        slug = kwargs.get('slug')

        if id is not None:
            qs = Page.objects.get(pk=id)
            return qs

        if slug is not None:
            qs = Page.objects.get(slug=slug)
            return qs

    pages = DjangoFilterConnectionField(PageDjangoObjectType)
    def resolve_pages(self, info, **kwargs):
        qs = Page.objects.live().public()
        content_types = kwargs.get('content_types')
        if content_types is not None:
            content_types = [content_type.split('.') for content_type
                             in content_types.split(',')]
            content_type_q = Q()
            for content_type in content_types:
                content_type_q |= Q(app_label=content_type[0],
                                    model=content_type[1])
            content_types = (
                ContentType.objects.filter(content_type_q)
                    .values_list('pk', flat=True)
            )
            qs = qs.filter(content_type_id__in=content_types)
        return qs

    search = DjangoFilterConnectionField(PageDjangoObjectType, query=graphene.String())
    def resolve_search(self, info, **kwargs):
        search_query = kwargs.get('query')
        if search_query is not None:
            return page_search(search_query)

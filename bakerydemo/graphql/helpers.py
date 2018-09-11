from modelcluster.contrib.taggit import ClusterTaggableManager
from taggit.managers import TaggableManager
from wagtail.core.fields import StreamField
from graphene_django.converter import convert_django_field
from graphene import types, String, Field
from graphene_django import DjangoObjectType
from wagtail.images.models import Image
import graphene


# --------- STREAMFIELD ---------

class GenericStreamFieldType(types.Scalar):
    @staticmethod
    def serialize(stream_value):
        return stream_value.stream_data


class FlatTags(String):
    @classmethod
    def serialize(cls, value):
        tagsList = []
        for tag in value.all():
            tagsList.append(tag.name)
        return tagsList


@convert_django_field.register(StreamField)
def convert_stream_field(field, registry=None):
    return GenericStreamFieldType(
        description=field.help_text, required=not field.null
    )


@convert_django_field.register(TaggableManager)
def convert_field_to_string(field, registry=None):
    return String(description=field.help_text, required=not field.null)


@convert_django_field.register(ClusterTaggableManager)
def convert_tag_field_to_string(field, registry=None):
    return Field(FlatTags,
                 description=field.help_text,
                 required=not field.null)


# --------- IMAGES ---------

class WagtailImageRendition(graphene.ObjectType):
    id = graphene.ID()
    url = graphene.String()
    width = graphene.Int()
    height = graphene.Int()


class WagtailImageRenditionList(graphene.ObjectType):
    rendition_list = graphene.List(WagtailImageRendition)
    src_set = graphene.String()

    def resolve_src_set(self, info):
        return ", ".join(
            [f"{img.url} {img.width}w" for img in self.rendition_list])


class WagtailImageNode(DjangoObjectType):
    class Meta:
        model = Image
        exclude_fields = ['tags']

    # Define all available image rendition options as arguments
    rendition = graphene.Field(
        WagtailImageRendition,
        max=graphene.String(),
        min=graphene.String(),
        width=graphene.Int(),
        height=graphene.Int(),
        fill=graphene.String(),
        format=graphene.String(),
        bgcolor=graphene.String(),
        jpegquality=graphene.Int()
    )
    rendition_list = graphene.Field(
        WagtailImageRenditionList, sizes=graphene.List(graphene.Int))

    def resolve_rendition(self, info, **kwargs):
        filters = "|".join([f"{key}-{val}" for key, val in kwargs.items()])
        img = self.get_rendition(filters)
        return WagtailImageRendition(
            id=img.id, url=img.url, width=img.width, height=img.height)

    def resolve_rendition_list(self, info, sizes=[]):
        rendition_list = [
            WagtailImageNode.resolve_rendition(self, info, width=width)
            for width in sizes
        ]
        return WagtailImageRenditionList(rendition_list=rendition_list)
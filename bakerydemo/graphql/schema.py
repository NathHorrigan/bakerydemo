from __future__ import unicode_literals
import graphene

from bakerydemo.graphql.helpers import *
import bakerydemo.locations.gql_helpers
import bakerydemo.breads.gql_helpers
from bakerydemo.graphql.schemas.pages import PagesRootQuery
from bakerydemo.blog.schema import Query as BlogQuery


def generateGQLSchema(self, queries=[]):
    class Query(*queries, PagesRootQuery, graphene.ObjectType):
        pass
    schema = graphene.Schema(query=Query)
    return schema


schema = generateGQLSchema([
    BlogQuery
])
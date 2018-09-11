from __future__ import unicode_literals

import graphene

from bakerydemo.breads.schema import Query as BreadQuery
from bakerydemo.locations.schema import Query as LocationQuery
from bakerydemo.blog.schema import Query as BlogQuery
from bakerydemo.graphql.schemas.pages import PagesRootQuery

class Query(PagesRootQuery, BlogQuery, LocationQuery, BreadQuery, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query)

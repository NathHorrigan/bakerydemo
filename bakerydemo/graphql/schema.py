from __future__ import unicode_literals
from bakerydemo.breads.schema import Query as BreadQuery
from bakerydemo.locations.schema import Query as LocationQuery
from bakerydemo.blog.schema import Query as BlogQuery
from bakerydemo.search.schema import Query as SearchQuery

import graphene

class Query(SearchQuery, BlogQuery, LocationQuery, BreadQuery, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query)

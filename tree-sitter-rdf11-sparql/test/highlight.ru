BASE <http://www.base.org>
PREFIX ex: <http://www.prefix.org>

DELETE DATA {
  ?s $p _:blank ;
    <http://example.org/predicate> "" ;
    ex:predicate "object" .
  :empty_prefix empty_name: :, <>, <object> .
};

INSERT { ?s ex:newProp ?o }
WHERE {
  ?s ?p ?o .
  ?s ^:p/:p|:p? ?o .
  ?s !(^:p|:p) ?o .
  FILTER RAND()
  FILTER function:foo(?a)
  FILTER <foo>(?a, ?b)
  FILTER(?p != ex:newProp)
  FILTER(1 - 1)

  ex:subject ex:signed -1 .
  ex:subject ex:unsigned 1 .
};

INSERT DATA {
  GRAPH ?a {
    ex:subject ex:lang_tag 'foo'@foo-bar .
    ex:subject ex:typed 'foo'^^<http://example.org/foo> .
    ex:subject ex:prefixed 'foo'^^foo:bar .
    ex:subject ex:escaped 'foo\tbar\\foo\bar' .
    ex:subject ex:hash '#foo' .
  }
};


CLEAR GRAPH <http://example.org/graph> ;
DROP SILENT GRAPH <http://example.org/graph2> ;
LOAD <http://example.org/data.ttl> INTO GRAPH <http://example.org/graph3> ;
CREATE SILENT GRAPH <http://example.org/graph4>;

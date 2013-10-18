window.namespace = (target, name, block) ->
  [target, name, block] = [(if typeof exports isnt 'undefined' then exports else window), arguments...] if arguments.length < 3
  top    = target
  target = target[item] or= {} for item in name.split '.'
  block target, top

window.using = (namespaces..., block) ->
  context = {}
  for ns in namespaces
    for k, v of ns
      if context[k]?
        throw "Unable to import namespace: symbol [#{k}] already imported!"
      context[k] = v
  block(context)


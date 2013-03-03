namespace 'MtgHelper', (exports) ->
  class exports.Game extends Support.CompositeView
    @build: -> new @(arguments...)

    render: ->
      count = 2
      @counters = []
      _.times(count, (n) =>
        @counters.push(MtgHelper.Game.Counter.build(className: "counter pw#{n+1}"))
      )

      @appendChild(counter) for counter in @counters
      @$el.addClass("counters-#{@counters.length}")

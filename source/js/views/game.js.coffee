namespace 'MtgHelper', (exports) ->
  class exports.Game extends Support.CompositeView
    @build: -> new @(arguments...)

    render: ->
      @plainswalker_1_counter = MtgHelper.Game.Counter.build(className: 'counter pw1')
      @plainswalker_2_counter = MtgHelper.Game.Counter.build(className: 'counter pw2')

      @appendChild(@plainswalker_1_counter)
      @appendChild(@plainswalker_2_counter)

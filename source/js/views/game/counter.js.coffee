namespace 'MtgHelper.Game', (exports) ->
  class exports.Counter extends Support.CompositeView
    className: 'counter'
    @build: -> new @(arguments...)

    events:
      'click .app-decrement-five': 'decrement_five'
      'click .app-decrement-one': 'decrement_one'
      'click .app-increment-one': 'increment_one'
      'click .app-increment-five': 'increment_five'

    initialize: ->
      @template = JST['views/game/counter']

      @life = 20

    render: ->
      directive =
        'app-life-counter': @life
      @$el.html($(@template()).expand(directive))

      @set_life_bar()

      @

    set_life_bar: ->
      new_life_class = if @life >= 20
        'life-full'
      else if @life <= 0
        'life-empty'
      else
        "life-#{@life}"

      css_classes = @$('.app-counter-container').attr('class').split " "
      old_life_class = _.find(css_classes, (css_class) => css_class.match /^life/)
      @$('.app-counter-container').addClass(new_life_class)
      if not (new_life_class == old_life_class)
        @$('.app-counter-container').removeClass(old_life_class)

    _clear_old_life: ->

    decrement_five: -> @_change_life(-5)
    decrement_one: -> @_change_life(-1)
    increment_one: -> @_change_life(1)
    increment_five: -> @_change_life(5)

    _change_life: (life_change) ->
      @life = @life + life_change
      @$('.app-life-counter').text @life
      @set_life_bar()
      false

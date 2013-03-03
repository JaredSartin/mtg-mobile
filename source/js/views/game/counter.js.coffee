namespace 'MtgHelper.Game', (exports) ->
  class exports.Counter extends Support.CompositeView
    className: 'counter'
    @build: -> new @(arguments...)

    # events:
    #   'click .app-decrement-five': 'decrement_five'
    #   'click .app-decrement-one': 'decrement_one'
    #   'click .app-increment-one': 'increment_one'
    #   'click .app-increment-five': 'increment_five'

    initialize: ->
      @template = JST['views/game/counter']

      @life = 20

    render: ->
      directive =
        'app-life-counter': @life
      @$el.html($(@template()).expand(directive))

      @set_life_bar()

      if $('body').hasClass('touch')
        @$('.app-decrement-five').hammer().on('tap', => @decrement_five())
        @$('.app-decrement-one').hammer().on('tap', => @decrement_one())
        @$('.app-increment-one').hammer().on('tap', => @increment_one())
        @$('.app-increment-five').hammer().on('tap', => @increment_five())
      else
        @$('.app-decrement-five').on('click', => @decrement_five())
        @$('.app-decrement-one').on('click', => @decrement_one())
        @$('.app-increment-one').on('click', => @increment_one())
        @$('.app-increment-five').on('click', => @increment_five())

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

    decrement_five: -> @_change_life(-5)
    decrement_one: -> @_change_life(-1)
    increment_one: -> @_change_life(1)
    increment_five: -> @_change_life(5)

    _change_life: (life_change) ->
      @life = @life + life_change
      @$('.app-life-counter').text @life
      @set_life_bar()

      false

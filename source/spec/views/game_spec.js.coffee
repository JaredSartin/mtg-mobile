describe 'MtgHelper.Game', ->
  clazz = MtgHelper.Game

  beforeEach ->
    @subject = clazz.build(el: h.el_selector)
    h.create_stub(@, 'MtgHelper.Game.Counter', 'build')
    h.create_stub(@, 'counter_view', 'render')
    @counter_view.el = '<div class=counter></div>'
    @counter_build.returns @counter_view

  describe '.build', ->
    it 'builds the counter', ->
      view = clazz.build()
      expect(view.constructor).toBe clazz

  describe '#render', ->
    it 'shows 2 counter views', ->
      @subject.render()

      expect(@counter_build).toHaveBeenCalledWith(className: 'counter pw1')
      expect(@counter_build).toHaveBeenCalledWith(className: 'counter pw2')

      expect(h.find('.counter').length).toEqual 2

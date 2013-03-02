describe 'MtgHelper.Game.Counter', ->
  clazz = MtgHelper.Game.Counter

  beforeEach ->

  describe '.build', ->
    it 'builds the counter', ->
      view = clazz.build()
      expect(view.constructor).toBe clazz

  describe '#render', ->
    it 'renders the counter bar'
    it 'returns itself for rendering'

  describe 'events', ->
    it 'decreases the counter by 1 when told to'
    it 'increases the counter by 1 when told to'
    it 'decreases the counter by 5 when told to'
    it 'increases the counter by 5 when told to'
    it 'decreases below 0'
    it 'increases above 20'

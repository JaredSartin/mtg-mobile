describe 'MtgHelper.Game.Counter', ->
  clazz = MtgHelper.Game.Counter

  beforeEach ->
    @subject = clazz.build(el: h.el_selector)

  describe '.build', ->
    it 'builds the counter', ->
      view = clazz.build()
      expect(view.constructor).toBe clazz

  describe '#render', ->
    it 'renders the counter bar', ->
      @subject.render()

      expect(h.find '.app-counter-container').toExist()
      expect(h.find '.app-counter-container').toHaveClass 'life-full'
      expect(h.find '.app-life-counter').toHaveText 20

    it 'returns itself for rendering', ->
      expect(@subject.render()).toBe @subject

  describe 'events', ->
    beforeEach ->
      @subject.render()

    it 'decreases the counter by 5 when told to', ->
      h.click '.app-decrement-five'

      expect(h.find('.app-counter-container')).toHaveClass 'life-15'
      expect(h.find('.app-counter-container')).not.toHaveClass 'life-full'
      expect(h.find '.app-life-counter').toHaveText 15

    it 'decreases the counter by 1 when told to', ->
      h.click '.app-decrement-one'

      expect(h.find('.app-counter-container')).toHaveClass 'life-19'
      expect(h.find('.app-counter-container')).not.toHaveClass 'life-full'
      expect(h.find '.app-life-counter').toHaveText 19

    it 'increases the counter by 1 when told to', ->
      h.click '.app-decrement-five'
      h.click '.app-increment-one'

      expect(h.find('.app-counter-container')).toHaveClass 'life-16'
      expect(h.find('.app-counter-container')).not.toHaveClass 'life-full'
      expect(h.find '.app-life-counter').toHaveText 16

    it 'increases the counter by 5 when told to', ->
      h.click '.app-decrement-five'
      h.click '.app-decrement-one'
      h.click '.app-increment-five'

      expect(h.find('.app-counter-container')).toHaveClass 'life-19'
      expect(h.find('.app-counter-container')).not.toHaveClass 'life-full'
      expect(h.find '.app-life-counter').toHaveText 19

    it 'decreases below 0', ->
      h.click '.app-decrement-five'
      h.click '.app-decrement-five'
      h.click '.app-decrement-five'
      h.click '.app-decrement-five'
      h.click '.app-decrement-one'

      expect(h.find('.app-counter-container')).toHaveClass 'life-empty'
      expect(h.find '.app-life-counter').toHaveText -1

    it 'increases above 20', ->
      h.click '.app-increment-one'

      expect(h.find('.app-counter-container')).toHaveClass 'life-full'
      expect(h.find '.app-life-counter').toHaveText 21

    it 'prevents the page from changing when handling changes', ->
      expect(@subject.decrement_five()).toEqual false
      expect(@subject.decrement_one()).toEqual false
      expect(@subject.increment_one()).toEqual false
      expect(@subject.increment_five()).toEqual false

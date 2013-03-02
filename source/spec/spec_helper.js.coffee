old_jfx_value = null
beforeEach ->
  old_jfx_value = $.fx.off
  $.fx.off = true
afterEach ->
  $.fx.off = old_jfx_value

h = {}
h.el_selector = "#test"
h.el = -> $(h.el_selector)
h.dialog = -> $('#drewbox')
h.search_element = -> if h.dialog().is(':visible') then h.dialog() else h.el()
h.field = (field) -> h.search_element().find(selector_fix(field)).html()
h.find = (selector) -> h.search_element().find(selector)
h.text = (field) -> h.search_element().find(selector_fix(field)).text().trim()
h.see_dialog = -> expect(h.dialog().is(':visible')).toBeTruthy()
h.see_no_dialog = -> expect(h.dialog().is(':hidden') or not h.dialog().exists()).toBeTruthy()
h.cleanup_dialog = -> $.drewbox.close() if h.dialog().is(':visible')
h.disable_form_submission = (form) -> form.bind 'ajax:before', -> false
h.should_exist = (selector) -> expect(h.search_element().find(selector).exists()).toBeTruthy()
h.exist = (selector) -> h.search_element().find(selector).exists()
h.has_class = (field, css_class) -> h.search_element().find(selector_fix(field)).hasClass(css_class)
h.data = (field, css_class) -> h.search_element().find(selector_fix(field)).hasClass(css_class)
h.attr = (selector, attr) -> h.search_element().find(selector).attr(attr)
h.value = (selector) -> h.search_element().find(selector).val()
h.is_empty = (selector) -> _($(selector).html().trim()).isEmpty()
h.has_focus = (selector) -> $(selector).get(0) == ($(selector).get(0)).ownerDocument.activeElement
h.args_for = (stub) -> stub.args[0][0]
h.click = (button) ->
  element = h.search_element().find(selector_fix(button))
  # 8/14/12
  # So....yeah. When our command line capybara-webkit driver tries to click on
  # a label attached to a checkbox, the checkbox value doesn't toggle. This works
  # fine in web browsers (firefox and chrome) in both the app and tests.
  # I have no explanation for this behavior. So from now on we'll be sticking to
  # clicking on checkboxes instead of labels. This matcher will give us early
  # warning if we click on a label instead of a checkbox.
  # 
  # Please improve me if an opportunity arises.
  expect(element).not.toBeALabel()
  element.click()

window.h = h

selector_fix = (selector) ->
  if selector[0] == '.' or selector[0] == '#'
    selector
  else
    ".#{selector}"

# Mock and stub support
beforeEach ->
  @fakes = sinon.create(sinon.collection)
  h.fakes = @fakes

afterEach ->
  @fakes.verifyAndRestore()
  h.stubbed_methods = {}

h.create_stub = (target, name, methodz...) ->
  name_is_already_a_function = false
  try
    throw "#{name} is not a function - treating as object" if not _.isFunction(eval(name))
    stub = eval(name)
    name_is_already_a_function = true

  if name_is_already_a_function
    the_function = window
    for item in name.split('.')
      the_function = the_function[item]

    stub_basename = InflectionJS.underscore(_.last(name.split('.')))
    h.stubbed_methods ||= {}
    for method in methodz
      the_stub = null
      if not h.stubbed_methods["#{name}_#{method}"]
        the_stub = h.fakes.stub(the_function, method)
        h.stubbed_methods["#{name}_#{method}"] = the_stub
      else
        the_stub = h.stubbed_methods["#{name}_#{method}"]
      target["#{stub_basename}_#{method}"] = the_stub
  else
    stub = {}
    _.extend(stub, Backbone.Events)
    for method in methodz
      stub[method] = ->
      target["#{name}_#{method}"] = h.fakes.stub(stub, method)
    target[name] = stub


# Testing event expectations
h.expectEvent = (obj, eventName, eventData...) ->
  eventWasFired = false
  eventHandlerArgs = undefined
  calledCount = 0
  obj.bind eventName, (args...) ->
    eventHandlerArgs = args
    eventWasFired = true
    calledCount += 1  if not eventData or _.isEqual(eventData, eventHandlerArgs)

  (callbackOpts) ->
    if callbackOpts and callbackOpts.firesAfter
      expect(eventWasFired).toBe false
      callbackOpts.firesAfter()
    expect(eventWasFired).toBe true
    expect(eventData).toEqual eventHandlerArgs if eventData and calledCount isnt 1
    expect(calledCount).toEqual 1

h.expectNoEvent = (obj, eventName) ->
  eventWasFired = false
  obj.bind eventName, (e) ->
    eventWasFired = true

  (callback) ->
    if callback
      expect(eventWasFired).toBe false
      callback()
    expect(eventWasFired).toBe false

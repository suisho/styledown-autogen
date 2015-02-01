var util = require("util")
var uniq = require("uniq")
var jade = require("jade")
var convert = require("./convert")
var Selector = require("./selector")

var Generator = function(name, description, css, pattern, template){
  this.name = name
  this.description = description
  this.css = css
  this.matcher = matcherFunc(pattern)
  this.template = template
}

function matcherFunc(pattern){
  if(typeof pattern === "function"){
    return pattern
  }
  var func = function(selector){
    return selector.match(pattern)
  }
  return func
}

Generator.prototype.compile = function(template, selector){
  var params = {
    value : selector
  }
  var html = jade.compile(template)
  return html(params)
}

Generator.prototype.generate = function(){
  var self = this
  var selectors = new Selector(this.css).filterSelectors(this.matcher)
  var example = selectors.map(function(selector){
    return self.compile(self.template, selector)
  }).join("\n")
  return convert(this.name, this.description, example)
}

module.exports = function(name, description, css, pattern, template){
  var generator = new Generator(name, description, css, pattern, template)
  return generator.generate()
}

var postcss = require("postcss")
var util = require("util")
var uniq = require("uniq")
var jade = require("jade")
var convert = require("./convert")

var Generator = function(name, description, css, pattern, template){
  this.name = name
  this.description = description
  this.css = css
  this.pattern = pattern
  this.template = template
}

Generator.prototype.compile = function(template, selector){
  var params = {
    value : selector
  }
  var html = jade.compile(template)
  return html(params)
}

Generator.prototype.matchSelector = function(selector){
  return (selector.match(this.pattern))
}

Generator.prototype.getAllSelectors = function(css){
  var selectors = []
  var nodes = postcss.parse(css).nodes
  nodes.forEach(function(rule){
    rule.selectors.forEach(function(sel){
      selectors.push(sel)
    })
  })
  return selectors
}

Generator.prototype.filterSelectors = function(){
  var matched = []
  var self = this
  var allSelector = this.getAllSelectors(this.css)
  allSelector.forEach(function(selector){
    if(self.matchSelector(selector)){
      matched.push(selector)
    }
  })
  return uniq(matched)
}

Generator.prototype.generate = function(){
  var self = this
  var selectors = this.filterSelectors(this.css, this.pattern)
  var example = selectors.map(function(selector){
    var data = self.compile(self.template, selector)
    return data
  }).join("\n")
  return convert(this.name, this.description, example)
}

module.exports = function(name, description, css, pattern, template){
  var generator = new Generator(name, description, css, pattern, template)
  return generator.generate()
}

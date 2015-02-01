var postcss = require("postcss")
var util = require("util")
var uniq = require("uniq")
var jade = require("jade")
var convert = require("./convert")

var Generator = function(css, pattern, template){
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

module.exports = function(css, pattern, template){
  var generator = new Generator(css, pattern, template)
  var selectors = exposeSelector(css, pattern)
  selectors.forEach(function(selector){
    var data = generator.compile(template, selector)
    console.log(data)
  })
}



var exposeSelector = function(css, pattern){
  var nodes = postcss.parse(css).nodes
  var matched = []
  nodes.forEach(function(rule){
    rule.selectors.forEach(function(selector){
      if(selector.match(pattern)){
        matched.push(selector)
      }
    })
  })
  return uniq(matched)
}


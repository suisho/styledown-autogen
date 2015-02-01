var postcss = require("postcss")
var uniq = require("uniq")

var Selector = function(css){
  this.css = css
}
Selector.prototype.allSelectors = function(){
  var selectors = []
  var nodes = postcss.parse(this.css).nodes
  nodes.forEach(function(rule){
    rule.selectors.forEach(function(sel){
      selectors.push(sel)
    })
  })
  return selectors
}

Selector.prototype.filterSelectors = function(matcher){
  var matched = []
  var self = this
  this.allSelectors(this.css).forEach(function(selector){
    if(matcher(selector)){
      matched.push(selector)
    }
  })
  return uniq(matched)
}

module.exports = Selector
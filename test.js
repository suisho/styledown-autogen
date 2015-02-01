var fs = require("fs")
var assert = require("power-assert")
var Styledown = require("styledown")

describe("Selector", function(){
  var Selector = require("./src/selector")
  
  it("all", function(){
    var css = fs.readFileSync("./fixture/sample.css", "utf-8")
    var selector = new Selector(css)
    var expect = [ 
      '.sample-red.is-light',
      '.sample-red.is-dark',
      '.sample-red',
      '.sample-green',
      '.sample-red',
      '.sample-green',
      '.blue' 
    ]
    assert.deepEqual(expect, selector.allSelectors())
  })
})

describe("Converter", function(){
  var convert = require("./src/convert")
  
  it("conv", function(){
    var data = fs.readFileSync("./sample.md", "utf-8")
    var h = new Styledown(data).toBareHTML()
    //console.log(h)
  })
})

describe("convert.js", function(){
  var convert = require("./src/convert")
  
  it("convert simple pattern", function(){
    var result = convert("Foo Class", "this is Foo class", ".foo")
    var expect = fs.readFileSync("./fixture/convertor.md", "utf-8")
    assert.equal(expect, result)
  })
})

describe("Generator", function(){
  var generator = require("./src/generator")
  
  it("markdown", function(){
    var css = fs.readFileSync("./fixture/sample.css", "utf-8")
    var tmpl = fs.readFileSync("./fixture/sample.jade", "utf-8")
    var expect = fs.readFileSync("./fixture/sample.md", "utf-8")
    var md = generator("Sample", "sample item", css, ".sample-", tmpl)
    assert.equal(expect, md)
  })
})


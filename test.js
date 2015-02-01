var fs = require("fs")
var assert = require("power-assert")
var Styledown = require("styledown")
var convert = require("./src/convert")
var generator = require("./src/generator")

describe("", function(){
  it("", function(){
    var data = fs.readFileSync("./sample.md", "utf-8")
    var h = new Styledown(data).toBareHTML()
    //console.log(h)
  })
})

describe("convert.js", function(){
  it("convert simple pattern", function(){
    var result = convert("Foo Class", "this is Foo class", ".foo")
    var expect = fs.readFileSync("./fixture/convertor.md", "utf-8")
    assert.equal(expect , result)
  })
})

describe("Generator", function(){
  it("XXX", function(){
    var css = fs.readFileSync("./fixture/sample.css", "utf-8")
    var tmpl = fs.readFileSync("./fixture/sample.jade", "utf-8")
    var md = generator("Sample", "sample item", css, ".sample-", tmpl)
    console.log(md)
  })
})
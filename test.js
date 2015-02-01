var fs = require("fs")
var assert = require("power-assert")
var Styledown = require("styledown")
describe("", function(){
  it("", function(){
    var data = fs.readFileSync("./sample.md", "utf-8")
    var h = new Styledown(data).toBareHTML()
    //console.log(h)
  })
})

describe("convert.js", function(){
  var convert = require("./convert")
  it("convert simple pattern", function(){
    var result = convert("Foo Class", "this is Foo class", ".foo")
    var expect = fs.readFileSync("./fixture/convertor.md", "utf-8")
    assert.equal(expect , result)
  })
  
})
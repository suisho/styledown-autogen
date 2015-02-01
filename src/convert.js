
// generate @example code
function generateExampleCode(exampleCode){
  var annotation = "@example"
  if(typeof exampleCode === "string"){
    exampleCode = exampleCode.split("\n")
  }
  var lines = [annotation].concat(exampleCode)
  return lines.map(function(line){
    // 4 space indentation
    return "    " + line
  }).join("\n")
}

module.exports = function(name, description, exampleCode){
  var header = "### " + name
  var example = generateExampleCode(exampleCode)
  var blank = ""
  return [header, description, blank ,example].join("\n")
}


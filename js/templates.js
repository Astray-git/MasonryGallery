(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['pics'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, functionType="function", escapeExpression=this.escapeExpression;
  return "\r\n  <div class=\"pic-wrapper\">\r\n    <a class=\"pic\" id=\"pic-"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" href=\""
    + escapeExpression(((stack1 = (depth0 && depth0.url_z)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n      <img src=\""
    + escapeExpression(((stack1 = (depth0 && depth0.url_z)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" alt=\"photos\">\r\n    </a>\r\n    <div class=\"title\">\r\n      <p>"
    + escapeExpression(((stack1 = (depth0 && depth0.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\r\n    </div>\r\n  </div>\r\n";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1;
  stack1 = helpers.each.call(depth0, depth0, {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  },"useData":true});
})();
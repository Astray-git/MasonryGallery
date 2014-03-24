(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['pics'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "\r\n  <div class=\"pic-wrapper\">\r\n    <div class=\"pic\">\r\n      <img src=\""
    + escapeExpression(((helper = helpers.url_m || (depth0 && depth0.url_m)),(typeof helper === functionType ? helper.call(depth0, {"name":"url_m","hash":{},"data":data}) : helper)))
    + "\" alt=\"photos\">\r\n    </div>\r\n    <div class=\"title\">\r\n      <p>"
    + escapeExpression(((helper = helpers.title || (depth0 && depth0.title)),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</p>\r\n    </div>\r\n  </div>\r\n";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1;
  stack1 = helpers.each.call(depth0, depth0, {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  },"useData":true});
})();
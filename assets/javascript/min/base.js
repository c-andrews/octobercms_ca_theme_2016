define(["zepto"],function($){this.appNS=this.appNS||{};var n=function(){console.log("[Base] CONSTRUCT"),appNS._base=this,this._init()};return n.prototype={_init:function(){console.log("[Base] INIT"),this._disablePageScroll(),$(document).on("load",{self:this},this._onLoad),$("a").on("click",{self:this},this._onHijackLinks)},_disablePageScroll:function(){$("body").on("touchmove",function(n){n.preventDefault()})},_openLink:function(){this._activeLink&&window.open(this._activeLink,"_self")},_onHijackLinks:function(n){n.preventDefault();var o=n.data.self,t=$(n.target).parent(),e=t.attr("href");return o._activeLink=e,o.hide(),!1},_onLoad:function(n){var o=n.data.self;$(document).off("load")},show:function(){console.log("[Base] SHOW")},hide:function(){console.log("[Base] HIDE"),this._openLink()},showError:function(){console.log("[Base] SHOW ERROR")}},this.appNS.Base=n,n});
//# sourceMappingURL=./base.js.map
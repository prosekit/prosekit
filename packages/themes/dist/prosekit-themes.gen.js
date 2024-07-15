var Ie=Object.defineProperty;var Ee=(e,r)=>{for(var t in r)Ie(e,t,{get:r[t],enumerable:!0})};var $={};Ee($,{AUTOCOMPLETE_MENU:()=>pr,AUTOCOMPLETE_MENU_ITEM:()=>fr,BLOCK_HANDLE:()=>Cr,BUTTON_PRIMARY:()=>kr,DROP_CURSOR:()=>Er,EDITOR_CONTENT:()=>lr,EDITOR_SCROLLING:()=>sr,EDITOR_VIEWPORT:()=>ir,ICON_ARROW_LEFT:()=>lt,ICON_ARROW_RIGHT:()=>at,ICON_BOLD:()=>Pr,ICON_CHEVRON_RIGHT:()=>ct,ICON_CLOSE:()=>st,ICON_CODE:()=>$r,ICON_CODE_BLOCK:()=>tt,ICON_CORNER_HANDLE:()=>ot,ICON_DRAG_HANDLE:()=>nt,ICON_H1:()=>Br,ICON_H2:()=>jr,ICON_H3:()=>Dr,ICON_H4:()=>Hr,ICON_H5:()=>Vr,ICON_H6:()=>Wr,ICON_IMAGE:()=>Zr,ICON_ITALIC:()=>Mr,ICON_LINK:()=>qr,ICON_LIST_BULLET:()=>Yr,ICON_LIST_DEDENT:()=>rt,ICON_LIST_INDENT:()=>et,ICON_LIST_ORDERED:()=>Xr,ICON_LIST_TASK:()=>Jr,ICON_LIST_TOGGLE:()=>Qr,ICON_REDO:()=>Fr,ICON_SEARCH:()=>it,ICON_STRIKE:()=>Ur,ICON_UNDERLINE:()=>Gr,ICON_UNDO:()=>Kr,IMAGE_RESIZEALE:()=>vr,IMAGE_RESIZEALE_HANDLE:()=>Ir,IMAGE_RESIZEALE_IMAGE:()=>_r,IMAGE_UPLOAD_BUTTON:()=>yr,IMAGE_UPLOAD_CARD:()=>xr,IMAGE_UPLOAD_INPUT:()=>wr,INLINE_MENU_LINK:()=>cr,INLINE_MENU_LINK_INPUT:()=>dr,INLINE_MENU_LINK_REMOVE_BUTTON:()=>ur,INLINE_MENU_MAIN:()=>ar,KEYMAP_FIELDSET:()=>Lr,LANGUAGE_SELECT:()=>gr,LANGUAGE_WRAPPER:()=>br,SEARCH:()=>Or,SEARCH_CONTROLLER:()=>Sr,SEARCH_ICON_BUTTON:()=>Ar,SEARCH_INPUT:()=>zr,SEARCH_TEXT_BUTTON:()=>Rr,TOGGLE_BUTTON:()=>hr,TOOLBAR:()=>mr,TOOLTIP_CONTENT:()=>Tr,TOOLTIP_TRIGGER:()=>Nr});function se(e){var r,t,o="";if(typeof e=="string"||typeof e=="number")o+=e;else if(typeof e=="object")if(Array.isArray(e)){var s=e.length;for(r=0;r<s;r++)e[r]&&(t=se(e[r]))&&(o&&(o+=" "),o+=t)}else for(t in e)e[t]&&(o&&(o+=" "),o+=t);return o}function le(){for(var e,r,t=0,o="",s=arguments.length;t<s;t++)(e=arguments[t])&&(r=se(e))&&(o&&(o+=" "),o+=r);return o}var K="-";function Ce(e){let r=Te(e),{conflictingClassGroups:t,conflictingClassGroupModifiers:o}=e;function s(l){let c=l.split(K);return c[0]===""&&c.length!==1&&c.shift(),de(c,r)||Ne(l)}function i(l,c){let d=t[l]||[];return c&&o[l]?[...d,...o[l]]:d}return{getClassGroupId:s,getConflictingClassGroupIds:i}}function de(e,r){if(e.length===0)return r.classGroupId;let t=e[0],o=r.nextPart.get(t),s=o?de(e.slice(1),o):void 0;if(s)return s;if(r.validators.length===0)return;let i=e.join(K);return r.validators.find(({validator:l})=>l(i))?.classGroupId}var ae=/^\[(.+)\]$/;function Ne(e){if(ae.test(e)){let r=ae.exec(e)[1],t=r?.substring(0,r.indexOf(":"));if(t)return"arbitrary.."+t}}function Te(e){let{theme:r,prefix:t}=e,o={nextPart:new Map,validators:[]};return Ae(Object.entries(e.classGroups),t).forEach(([i,l])=>{W(l,o,i,r)}),o}function W(e,r,t,o){e.forEach(s=>{if(typeof s=="string"){let i=s===""?r:ce(r,s);i.classGroupId=t;return}if(typeof s=="function"){if(Oe(s)){W(s(o),r,t,o);return}r.validators.push({validator:s,classGroupId:t});return}Object.entries(s).forEach(([i,l])=>{W(l,ce(r,i),t,o)})})}function ce(e,r){let t=e;return r.split(K).forEach(o=>{t.nextPart.has(o)||t.nextPart.set(o,{nextPart:new Map,validators:[]}),t=t.nextPart.get(o)}),t}function Oe(e){return e.isThemeGetter}function Ae(e,r){return r?e.map(([t,o])=>{let s=o.map(i=>typeof i=="string"?r+i:typeof i=="object"?Object.fromEntries(Object.entries(i).map(([l,c])=>[r+l,c])):i);return[t,s]}):e}function Re(e){if(e<1)return{get:()=>{},set:()=>{}};let r=0,t=new Map,o=new Map;function s(i,l){t.set(i,l),r++,r>e&&(r=0,o=t,t=new Map)}return{get(i){let l=t.get(i);if(l!==void 0)return l;if((l=o.get(i))!==void 0)return s(i,l),l},set(i,l){t.has(i)?t.set(i,l):s(i,l)}}}var ue="!";function ke(e){let{separator:r,experimentalParseClassName:t}=e,o=r.length===1,s=r[0],i=r.length;function l(c){let d=[],b=0,f=0,m;for(let g=0;g<c.length;g++){let h=c[g];if(b===0){if(h===s&&(o||c.slice(g,g+i)===r)){d.push(c.slice(f,g)),f=g+i;continue}if(h==="/"){m=g;continue}}h==="["?b++:h==="]"&&b--}let x=d.length===0?c:c.substring(f),y=x.startsWith(ue),N=y?x.substring(1):x,w=m&&m>f?m-f:void 0;return{modifiers:d,hasImportantModifier:y,baseClassName:N,maybePostfixModifierPosition:w}}return t?function(d){return t({className:d,parseClassName:l})}:l}function ze(e){if(e.length<=1)return e;let r=[],t=[];return e.forEach(o=>{o[0]==="["?(r.push(...t.sort(),o),t=[]):t.push(o)}),r.push(...t.sort()),r}function Se(e){return{cache:Re(e.cacheSize),parseClassName:ke(e),...Ce(e)}}var Le=/\s+/;function Me(e,r){let{parseClassName:t,getClassGroupId:o,getConflictingClassGroupIds:s}=r,i=new Set;return e.trim().split(Le).map(l=>{let{modifiers:c,hasImportantModifier:d,baseClassName:b,maybePostfixModifierPosition:f}=t(l),m=!!f,x=o(m?b.substring(0,f):b);if(!x){if(!m)return{isTailwindClass:!1,originalClassName:l};if(x=o(b),!x)return{isTailwindClass:!1,originalClassName:l};m=!1}let y=ze(c).join(":");return{isTailwindClass:!0,modifierId:d?y+ue:y,classGroupId:x,originalClassName:l,hasPostfixModifier:m}}).reverse().filter(l=>{if(!l.isTailwindClass)return!0;let{modifierId:c,classGroupId:d,hasPostfixModifier:b}=l,f=c+d;return i.has(f)?!1:(i.add(f),s(d,b).forEach(m=>i.add(c+m)),!0)}).reverse().map(l=>l.originalClassName).join(" ")}function Pe(){let e=0,r,t,o="";for(;e<arguments.length;)(r=arguments[e++])&&(t=pe(r))&&(o&&(o+=" "),o+=t);return o}function pe(e){if(typeof e=="string")return e;let r,t="";for(let o=0;o<e.length;o++)e[o]&&(r=pe(e[o]))&&(t&&(t+=" "),t+=r);return t}function Ge(e,...r){let t,o,s,i=l;function l(d){let b=r.reduce((f,m)=>m(f),e());return t=Se(b),o=t.cache.get,s=t.cache.set,i=c,c(d)}function c(d){let b=o(d);if(b)return b;let f=Me(d,t);return s(d,f),f}return function(){return i(Pe.apply(null,arguments))}}function u(e){let r=t=>t[e]||[];return r.isThemeGetter=!0,r}var fe=/^\[(?:([a-z-]+):)?(.+)\]$/i,Ue=/^\d+\/\d+$/,$e=new Set(["px","full","screen"]),Be=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,je=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,De=/^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,He=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,Ve=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;function _(e){return C(e)||$e.has(e)||Ue.test(e)}function I(e){return T(e,"length",Je)}function C(e){return!!e&&!Number.isNaN(Number(e))}function P(e){return T(e,"number",C)}function R(e){return!!e&&Number.isInteger(Number(e))}function We(e){return e.endsWith("%")&&C(e.slice(0,-1))}function a(e){return fe.test(e)}function E(e){return Be.test(e)}var Ke=new Set(["length","size","percentage"]);function Fe(e){return T(e,Ke,be)}function Ze(e){return T(e,"position",be)}var qe=new Set(["image","url"]);function Ye(e){return T(e,qe,er)}function Xe(e){return T(e,"",Qe)}function k(){return!0}function T(e,r,t){let o=fe.exec(e);return o?o[1]?typeof r=="string"?o[1]===r:r.has(o[1]):t(o[2]):!1}function Je(e){return je.test(e)&&!De.test(e)}function be(){return!1}function Qe(e){return He.test(e)}function er(e){return Ve.test(e)}function rr(){let e=u("colors"),r=u("spacing"),t=u("blur"),o=u("brightness"),s=u("borderColor"),i=u("borderRadius"),l=u("borderSpacing"),c=u("borderWidth"),d=u("contrast"),b=u("grayscale"),f=u("hueRotate"),m=u("invert"),x=u("gap"),y=u("gradientColorStops"),N=u("gradientColorStopPositions"),w=u("inset"),g=u("margin"),h=u("opacity"),v=u("padding"),X=u("saturate"),B=u("scale"),J=u("sepia"),Q=u("skew"),ee=u("space"),re=u("translate"),j=()=>["auto","contain","none"],D=()=>["auto","hidden","clip","visible","scroll"],H=()=>["auto",a,r],p=()=>[a,r],te=()=>["",_,I],S=()=>["auto",C,a],oe=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],L=()=>["solid","dashed","dotted","double","none"],ne=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],V=()=>["start","end","center","between","around","evenly","stretch"],O=()=>["","0",a],ie=()=>["auto","avoid","all","avoid-page","page","left","right","column"],A=()=>[C,P],M=()=>[C,a];return{cacheSize:500,separator:":",theme:{colors:[k],spacing:[_,I],blur:["none","",E,a],brightness:A(),borderColor:[e],borderRadius:["none","","full",E,a],borderSpacing:p(),borderWidth:te(),contrast:A(),grayscale:O(),hueRotate:M(),invert:O(),gap:p(),gradientColorStops:[e],gradientColorStopPositions:[We,I],inset:H(),margin:H(),opacity:A(),padding:p(),saturate:A(),scale:A(),sepia:O(),skew:M(),space:p(),translate:p()},classGroups:{aspect:[{aspect:["auto","square","video",a]}],container:["container"],columns:[{columns:[E]}],"break-after":[{"break-after":ie()}],"break-before":[{"break-before":ie()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...oe(),a]}],overflow:[{overflow:D()}],"overflow-x":[{"overflow-x":D()}],"overflow-y":[{"overflow-y":D()}],overscroll:[{overscroll:j()}],"overscroll-x":[{"overscroll-x":j()}],"overscroll-y":[{"overscroll-y":j()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:[w]}],"inset-x":[{"inset-x":[w]}],"inset-y":[{"inset-y":[w]}],start:[{start:[w]}],end:[{end:[w]}],top:[{top:[w]}],right:[{right:[w]}],bottom:[{bottom:[w]}],left:[{left:[w]}],visibility:["visible","invisible","collapse"],z:[{z:["auto",R,a]}],basis:[{basis:H()}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["wrap","wrap-reverse","nowrap"]}],flex:[{flex:["1","auto","initial","none",a]}],grow:[{grow:O()}],shrink:[{shrink:O()}],order:[{order:["first","last","none",R,a]}],"grid-cols":[{"grid-cols":[k]}],"col-start-end":[{col:["auto",{span:["full",R,a]},a]}],"col-start":[{"col-start":S()}],"col-end":[{"col-end":S()}],"grid-rows":[{"grid-rows":[k]}],"row-start-end":[{row:["auto",{span:[R,a]},a]}],"row-start":[{"row-start":S()}],"row-end":[{"row-end":S()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":["auto","min","max","fr",a]}],"auto-rows":[{"auto-rows":["auto","min","max","fr",a]}],gap:[{gap:[x]}],"gap-x":[{"gap-x":[x]}],"gap-y":[{"gap-y":[x]}],"justify-content":[{justify:["normal",...V()]}],"justify-items":[{"justify-items":["start","end","center","stretch"]}],"justify-self":[{"justify-self":["auto","start","end","center","stretch"]}],"align-content":[{content:["normal",...V(),"baseline"]}],"align-items":[{items:["start","end","center","baseline","stretch"]}],"align-self":[{self:["auto","start","end","center","stretch","baseline"]}],"place-content":[{"place-content":[...V(),"baseline"]}],"place-items":[{"place-items":["start","end","center","baseline","stretch"]}],"place-self":[{"place-self":["auto","start","end","center","stretch"]}],p:[{p:[v]}],px:[{px:[v]}],py:[{py:[v]}],ps:[{ps:[v]}],pe:[{pe:[v]}],pt:[{pt:[v]}],pr:[{pr:[v]}],pb:[{pb:[v]}],pl:[{pl:[v]}],m:[{m:[g]}],mx:[{mx:[g]}],my:[{my:[g]}],ms:[{ms:[g]}],me:[{me:[g]}],mt:[{mt:[g]}],mr:[{mr:[g]}],mb:[{mb:[g]}],ml:[{ml:[g]}],"space-x":[{"space-x":[ee]}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":[ee]}],"space-y-reverse":["space-y-reverse"],w:[{w:["auto","min","max","fit","svw","lvw","dvw",a,r]}],"min-w":[{"min-w":[a,r,"min","max","fit"]}],"max-w":[{"max-w":[a,r,"none","full","min","max","fit","prose",{screen:[E]},E]}],h:[{h:[a,r,"auto","min","max","fit","svh","lvh","dvh"]}],"min-h":[{"min-h":[a,r,"min","max","fit","svh","lvh","dvh"]}],"max-h":[{"max-h":[a,r,"min","max","fit","svh","lvh","dvh"]}],size:[{size:[a,r,"auto","min","max","fit"]}],"font-size":[{text:["base",E,I]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black",P]}],"font-family":[{font:[k]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractons"],tracking:[{tracking:["tighter","tight","normal","wide","wider","widest",a]}],"line-clamp":[{"line-clamp":["none",C,P]}],leading:[{leading:["none","tight","snug","normal","relaxed","loose",_,a]}],"list-image":[{"list-image":["none",a]}],"list-style-type":[{list:["none","disc","decimal",a]}],"list-style-position":[{list:["inside","outside"]}],"placeholder-color":[{placeholder:[e]}],"placeholder-opacity":[{"placeholder-opacity":[h]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"text-color":[{text:[e]}],"text-opacity":[{"text-opacity":[h]}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...L(),"wavy"]}],"text-decoration-thickness":[{decoration:["auto","from-font",_,I]}],"underline-offset":[{"underline-offset":["auto",_,a]}],"text-decoration-color":[{decoration:[e]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:p()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",a]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",a]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-opacity":[{"bg-opacity":[h]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...oe(),Ze]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","round","space"]}]}],"bg-size":[{bg:["auto","cover","contain",Fe]}],"bg-image":[{bg:["none",{"gradient-to":["t","tr","r","br","b","bl","l","tl"]},Ye]}],"bg-color":[{bg:[e]}],"gradient-from-pos":[{from:[N]}],"gradient-via-pos":[{via:[N]}],"gradient-to-pos":[{to:[N]}],"gradient-from":[{from:[y]}],"gradient-via":[{via:[y]}],"gradient-to":[{to:[y]}],rounded:[{rounded:[i]}],"rounded-s":[{"rounded-s":[i]}],"rounded-e":[{"rounded-e":[i]}],"rounded-t":[{"rounded-t":[i]}],"rounded-r":[{"rounded-r":[i]}],"rounded-b":[{"rounded-b":[i]}],"rounded-l":[{"rounded-l":[i]}],"rounded-ss":[{"rounded-ss":[i]}],"rounded-se":[{"rounded-se":[i]}],"rounded-ee":[{"rounded-ee":[i]}],"rounded-es":[{"rounded-es":[i]}],"rounded-tl":[{"rounded-tl":[i]}],"rounded-tr":[{"rounded-tr":[i]}],"rounded-br":[{"rounded-br":[i]}],"rounded-bl":[{"rounded-bl":[i]}],"border-w":[{border:[c]}],"border-w-x":[{"border-x":[c]}],"border-w-y":[{"border-y":[c]}],"border-w-s":[{"border-s":[c]}],"border-w-e":[{"border-e":[c]}],"border-w-t":[{"border-t":[c]}],"border-w-r":[{"border-r":[c]}],"border-w-b":[{"border-b":[c]}],"border-w-l":[{"border-l":[c]}],"border-opacity":[{"border-opacity":[h]}],"border-style":[{border:[...L(),"hidden"]}],"divide-x":[{"divide-x":[c]}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":[c]}],"divide-y-reverse":["divide-y-reverse"],"divide-opacity":[{"divide-opacity":[h]}],"divide-style":[{divide:L()}],"border-color":[{border:[s]}],"border-color-x":[{"border-x":[s]}],"border-color-y":[{"border-y":[s]}],"border-color-t":[{"border-t":[s]}],"border-color-r":[{"border-r":[s]}],"border-color-b":[{"border-b":[s]}],"border-color-l":[{"border-l":[s]}],"divide-color":[{divide:[s]}],"outline-style":[{outline:["",...L()]}],"outline-offset":[{"outline-offset":[_,a]}],"outline-w":[{outline:[_,I]}],"outline-color":[{outline:[e]}],"ring-w":[{ring:te()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:[e]}],"ring-opacity":[{"ring-opacity":[h]}],"ring-offset-w":[{"ring-offset":[_,I]}],"ring-offset-color":[{"ring-offset":[e]}],shadow:[{shadow:["","inner","none",E,Xe]}],"shadow-color":[{shadow:[k]}],opacity:[{opacity:[h]}],"mix-blend":[{"mix-blend":[...ne(),"plus-lighter","plus-darker"]}],"bg-blend":[{"bg-blend":ne()}],filter:[{filter:["","none"]}],blur:[{blur:[t]}],brightness:[{brightness:[o]}],contrast:[{contrast:[d]}],"drop-shadow":[{"drop-shadow":["","none",E,a]}],grayscale:[{grayscale:[b]}],"hue-rotate":[{"hue-rotate":[f]}],invert:[{invert:[m]}],saturate:[{saturate:[X]}],sepia:[{sepia:[J]}],"backdrop-filter":[{"backdrop-filter":["","none"]}],"backdrop-blur":[{"backdrop-blur":[t]}],"backdrop-brightness":[{"backdrop-brightness":[o]}],"backdrop-contrast":[{"backdrop-contrast":[d]}],"backdrop-grayscale":[{"backdrop-grayscale":[b]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[f]}],"backdrop-invert":[{"backdrop-invert":[m]}],"backdrop-opacity":[{"backdrop-opacity":[h]}],"backdrop-saturate":[{"backdrop-saturate":[X]}],"backdrop-sepia":[{"backdrop-sepia":[J]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":[l]}],"border-spacing-x":[{"border-spacing-x":[l]}],"border-spacing-y":[{"border-spacing-y":[l]}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["none","all","","colors","opacity","shadow","transform",a]}],duration:[{duration:M()}],ease:[{ease:["linear","in","out","in-out",a]}],delay:[{delay:M()}],animate:[{animate:["none","spin","ping","pulse","bounce",a]}],transform:[{transform:["","gpu","none"]}],scale:[{scale:[B]}],"scale-x":[{"scale-x":[B]}],"scale-y":[{"scale-y":[B]}],rotate:[{rotate:[R,a]}],"translate-x":[{"translate-x":[re]}],"translate-y":[{"translate-y":[re]}],"skew-x":[{"skew-x":[Q]}],"skew-y":[{"skew-y":[Q]}],"transform-origin":[{origin:["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",a]}],accent:[{accent:["auto",e]}],appearance:[{appearance:["none","auto"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",a]}],"caret-color":[{caret:[e]}],"pointer-events":[{"pointer-events":["none","auto"]}],resize:[{resize:["none","y","x",""]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":p()}],"scroll-mx":[{"scroll-mx":p()}],"scroll-my":[{"scroll-my":p()}],"scroll-ms":[{"scroll-ms":p()}],"scroll-me":[{"scroll-me":p()}],"scroll-mt":[{"scroll-mt":p()}],"scroll-mr":[{"scroll-mr":p()}],"scroll-mb":[{"scroll-mb":p()}],"scroll-ml":[{"scroll-ml":p()}],"scroll-p":[{"scroll-p":p()}],"scroll-px":[{"scroll-px":p()}],"scroll-py":[{"scroll-py":p()}],"scroll-ps":[{"scroll-ps":p()}],"scroll-pe":[{"scroll-pe":p()}],"scroll-pt":[{"scroll-pt":p()}],"scroll-pr":[{"scroll-pr":p()}],"scroll-pb":[{"scroll-pb":p()}],"scroll-pl":[{"scroll-pl":p()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",a]}],fill:[{fill:[e,"none"]}],"stroke-w":[{stroke:[_,I,P]}],stroke:[{stroke:[e,"none"]}],sr:["sr-only","not-sr-only"],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]}}}var ge=Ge(rr);var F=[["background","white","neutral-900"],["foreground","neutral-900","zinc-50"],["primary","zinc-900","zinc-50"],["primary-foreground","zinc-50","zinc-900"],["secondary","zinc-100","zinc-800"],["secondary-foreground","zinc-900","zinc-50"],["muted","zinc-100","zinc-800"],["muted-foreground","zinc-500","zinc-500"],["accent","gray-200","gray-700"],["accent-foreground","zinc-900","zinc-50"],["destructive","red-500","red-900"],["destructive-foreground","zinc-50","zinc-50"],["border","zinc-200","zinc-800"],["input","zinc-200","zinc-800"],["ring","zinc-900","zinc-300"]],me=["text","bg","border","ring","ring-offset"],G=new RegExp("^(?<prefix>.*?)(?<group>"+me.join("|")+")-(?<alias>"+F.map(([e])=>e).sort((e,r)=>r.length-e.length).join("|")+")(?<suffix>.*)$","g");function he(e){if(G.lastIndex=0,!G.test(e))return e;let r=[];for(let t of e.split(" ")){G.lastIndex=0;let o=G.exec(t);if(o){let{prefix:s,group:i,alias:l,suffix:c}=o.groups||{},[,d,b]=F.find(([f])=>f===l);if(!d||!b||!i||!l)throw new Error(`Unable to parse color from "${t}"`);r.push(`${s}${i}-${d}${c} dark:${s}${i}-${b}${c}`)}else r.push(t)}return r.join(" ")}var xe={};for(let[e,r,t]of F)for(let o of me)for(let s=0;s<=100;s+=5){let i=s===0?"":`/${s}`;xe[`${o}-${e}${i}`]=`${o}-${r}${i} dark:${o}-${t}${i}`}function n(...e){return ge(he(le(...e)))}var U=n("z-10 box-border rounded-lg border border-border bg-background shadow-lg"),we=n("will-change-transform","[&:not([data-state])]:hidden","data-[state=open]:animate-in","data-[state=closed]:animate-out","data-[state=open]:fade-in-0","data-[state=closed]:fade-out-0","data-[state=open]:zoom-in-95","data-[state=closed]:zoom-out-95","data-[state=open]:animate-duration-150","data-[state=closed]:animate-duration-200"),ye=n(we,"data-[side=bottom]:slide-in-from-top-2","data-[side=bottom]:slide-out-to-top-2","data-[side=left]:slide-in-from-right-2","data-[side=left]:slide-out-to-right-2","data-[side=right]:slide-in-from-left-2","data-[side=right]:slide-out-to-left-2","data-[side=top]:slide-in-from-bottom-2","data-[side=top]:slide-out-to-bottom-2"),tr=n("box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-secondary"),z=n("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-0"),Z=n("bg-primary text-primary-foreground hover:bg-primary/90"),ve=n("bg-secondary text-secondary-foreground hover:bg-secondary/80"),q="h-10 px-4 py-2",or="h-9 px-3",nr="h-10 w-10",Y=n("flex h-9 rounded-md w-full bg-background px-3 py-2 text-sm placeholder:text-muted-foreground transition","border box-border border-border border-solid","ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0","outline-none focus-visible:outline-none","file:border-0 file:bg-transparent file:text-sm file:font-medium","disabled:cursor-not-allowed disabled:opacity-50"),ir=n("box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700 flex flex-col bg-background"),sr=n("relative w-full flex-1 box-border overflow-y-scroll"),lr=n("ProseMirror","box-border min-h-full px-[max(40px,_calc(50%-330px))] py-[24px] outline-none outline-0",'[&_span[data-mention="user"]]:text-blue-500','[&_span[data-mention="tag"]]:text-violet-500',"[&_pre]:text-white [&_pre]:bg-zinc-800"),ar=n(U,"relative flex min-w-[120px] space-x-1 overflow-auto whitespace-nowrap rounded-md p-1"),cr=n(U,"relative flex flex-col w-xs rounded-lg p-4 gap-y-2 items-stretch"),dr=n(Y),ur=n(z,Z,or),pr=n("relative block max-h-[400px] min-w-[120px] select-none overflow-auto whitespace-nowrap p-1",U),fr=n("relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5",tr),br=n("relative left-2 top-3 h-0 select-none overflow-visible"),gr=n("outline-unset focus:outline-unset relative box-border w-auto cursor-pointer select-none appearance-none rounded border-none bg-transparent px-2 py-1 text-xs transition text-white","opacity-0 hover:opacity-80 [div[data-node-view-root]:hover_&]:opacity-50 [div[data-node-view-root]:hover_&]:hover:opacity-80"),_e=n("z-2 box-border","border-border border-solid border-l-0 border-r-0 border-t-0 border-b"),mr=n(_e,"flex flex-wrap gap-1 p-2 items-center"),hr=n("outline-unset focus-visible:outline-unset flex items-center justify-center rounded-md p-2 font-medium transition focus-visible:ring-2 text-sm focus-visible:ring-ring disabled:pointer-events-none min-w-9 min-h-9","disabled:opacity-50 hover:disabled:opacity-50","bg-transparent hover:bg-secondary data-[state=on]:bg-accent"),xr=n("flex flex-col gap-y-4 p-6 text-sm w-sm",U,ye),wr=n(Y),yr=n(z,Z,q,"w-full"),vr=n("relative block max-h-[600px] max-w-full"),_r=n("h-full w-full object-contain"),Ir=n("absolute bottom-0 right-0 rounded mb-1.5 mr-1.5 p-0.5 transition bg-gray-900/30 active:bg-gray-800/60 text-white/50 active:text-white/80 active:translate-x-0.5 active:translate-y-0.5","opacity-0 hover:opacity-100 [prosekit-resizable:hover_&]:opacity-100 [prosekit-resizable[data-resizing]_&]:opacity-100"),Er=n("transition-all bg-blue-500"),Cr=n("flex items-center box-border justify-center my-[0.5em] h-[1.5em] w-[1.2em] hover:bg-secondary rounded text-muted-foreground/50 transition",we),Nr=n("block"),Tr=n("z-50 overflow-hidden rounded-md border border-solid bg-primary px-3 py-1.5 text-xs text-primary-foreground shadow-sm",ye),Or=n(_e,"grid grid-cols-[min-content_1fr_min-content] gap-2 p-2"),Ar=n(z,ve,nr),Rr=n(z,ve,q),kr=n(z,Z,q),zr=n(Y,"col-start-2"),Sr=n("flex items-center justify-between gap-1"),Lr=n("mt-4 box-border flex max-w-full w-full overflow-x-auto border p-4 rounded-md shadow min-w-0"),Mr=n("i-lucide-italic h-5 w-5"),Pr=n("i-lucide-bold h-5 w-5"),Gr=n("i-lucide-underline h-5 w-5"),Ur=n("i-lucide-strikethrough h-5 w-5"),$r=n("i-lucide-code h-5 w-5"),Br=n("i-lucide-heading-1 h-5 w-5"),jr=n("i-lucide-heading-2 h-5 w-5"),Dr=n("i-lucide-heading-3 h-5 w-5"),Hr=n("i-lucide-heading-4 h-5 w-5"),Vr=n("i-lucide-heading-5 h-5 w-5"),Wr=n("i-lucide-heading-6 h-5 w-5"),Kr=n("i-lucide-undo-2 h-5 w-5"),Fr=n("i-lucide-redo-2 h-5 w-5"),Zr=n("i-lucide-image h-5 w-5"),qr=n("i-lucide-link h-5 w-5"),Yr=n("i-lucide-list h-5 w-5"),Xr=n("i-lucide-list-ordered h-5 w-5"),Jr=n("i-lucide-list-checks h-5 w-5"),Qr=n("i-lucide-list-collapse h-5 w-5"),et=n("i-lucide-indent-increase h-5 w-5"),rt=n("i-lucide-indent-decrease h-5 w-5"),tt=n("i-lucide-square-code h-5 w-5"),ot=n("i-lucide-arrow-down-right h-4 w-4"),nt=n("i-lucide-grip-vertical h-5 w-5"),it=n("i-lucide-search h-5 w-5"),st=n("i-lucide-x h-5 w-5"),lt=n("i-lucide-arrow-left h-5 w-5"),at=n("i-lucide-arrow-right h-5 w-5"),ct=n("i-lucide-chevron-right h-5 w-5");function dt(e,r){let t=Object.keys(r);t.sort((o,s)=>s.length-o.length);for(let o of t)e=ut(e,o,r[o]);return e}function ut(e,r,t){if(t.includes("'"))throw new Error("Target cannot contain single quotes: "+t);return e.replaceAll(` :class="Themes.${r}"`,` class='${t}'`).replaceAll(` className={Themes.${r}}`,` className='${t}'`).replaceAll(` class={Themes.${r}}`,` class='${t}'`).replaceAll(` class=\${Themes.${r}}`,` class='${t}'`).replaceAll(`Themes.${r}`,`'${t}'`).replaceAll(r,t)}function pt(e){return e.replace(/import\s*{\s*Themes\s*}\s*from\s*["']@prosekit\/themes["'];?\n/m,"")}function ft(e){return pt(dt(e,$))}export{xe as Colors,$ as Themes,ft as replaceThemes};

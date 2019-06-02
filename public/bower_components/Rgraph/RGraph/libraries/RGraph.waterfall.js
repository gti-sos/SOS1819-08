
RGraph=window.RGraph||{isRGraph:true};RGraph.Waterfall=function(conf)
{if(typeof conf==='object'&&typeof conf.data==='object'&&typeof conf.id==='string'){var parseConfObjectForOptions=true;}else{var conf={id:conf,data:arguments[1]};}
this.id=conf.id;this.canvas=document.getElementById(this.id);this.context=this.canvas.getContext?this.canvas.getContext("2d"):null;this.canvas.__object__=this;this.type='waterfall';this.max=0;this.data=conf.data;this.isRGraph=true;this.coords=[];this.uid=RGraph.CreateUID();this.canvas.uid=this.canvas.uid?this.canvas.uid:RGraph.CreateUID();this.colorsParsed=false;this.coordsText=[];this.original_colors=[];this.firstDraw=true;this.propertyNameAliases={};this.properties={'chart.background.bars.count':null,'chart.background.bars.color1':'rgba(0,0,0,0)','chart.background.bars.color2':'rgba(0,0,0,0)','chart.background.grid':true,'chart.background.grid.autofit':true,'chart.background.grid.autofit.align':true,'chart.background.grid.color':'#ddd','chart.background.grid.linewidth':1,'chart.background.grid.hsize':20,'chart.background.grid.vsize':20,'chart.background.grid.vlines':true,'chart.background.grid.hlines':true,'chart.background.grid.border':true,'chart.background.grid.align':true,'chart.background.grid.hlines.count':5,'chart.background.grid.vlines.count':20,'chart.background.image':null,'chart.background.image.stretch':true,'chart.background.image.x':null,'chart.background.image.y':null,'chart.background.image.w':null,'chart.background.image.h':null,'chart.background.image.align':null,'chart.background.hbars':null,'chart.linewidth':1,'chart.axes':true,'chart.axes.linewidth':1,'chart.axes.color':'black','chart.colors.stroke':'#666','chart.colors':['green','red','blue'],'chart.colors.sequential':false,'chart.margin.left':35,'chart.margin.right':35,'chart.margin.top':35,'chart.margin.bottom':35,'chart.margin.inner':5,'chart.xaxis':true,'chart.xaxis.position':'bottom','chart.xaxis.tickmarks.count':null,'chart.xaxis.title':'','chart.xaxis.title.pos':null,'chart.xaxis.title.bold':null,'chart.xaxis.title.italic':null,'chart.xaxis.title.size':null,'chart.xaxis.title.font':null,'chart.xaxis.title.color':null,'chart.xaxis.title.x':null,'chart.xaxis.title.y':null,'chart.xaxis.labels':[],'chart.xaxis.labels.bold':null,'chart.xaxis.labels.color':null,'chart.xaxis.labels.font':null,'chart.xaxis.labels.italic':null,'chart.xaxis.labels.size':null,'chart.xaxis.labels.offsetx':0,'chart.xaxis.labels.offsety':0,'chart.xaxis.labels.angle':0,'chart.yaxis':true,'chart.yaxis.tickmarks.count':10,'chart.yaxis.title':'','chart.yaxis.title.bold':null,'chart.yaxis.title.italic':null,'chart.yaxis.title.size':null,'chart.yaxis.title.font':null,'chart.yaxis.title.color':null,'chart.yaxis.title.pos':null,'chart.yaxis.title.align':'left','chart.yaxis.title.x':null,'chart.yaxis.title.y':null,'chart.yaxis.labels':true,'chart.yaxis.labels.count':5,'chart.yaxis.labels.offsetx':0,'chart.yaxis.labels.offsety':0,'chart.yaxis.labels.font':null,'chart.yaxis.labels.size':null,'chart.yaxis.labels.color':null,'chart.yaxis.labels.bold':null,'chart.yaxis.labels.italic':null,'chart.yaxis.scale.max':null,'chart.yaxis.scale.min':0,'chart.yaxis.scale.units.pre':'','chart.yaxis.scale.units.post':'','chart.yaxis.scale.decimals':0,'chart.yaxis.scale.point':'.','chart.yaxis.scale.thousand':',','chart.yaxis.scale.zerostart':true,'chart.labels.above':false,'chart.labels.above.font':null,'chart.labels.above.size':null,'chart.labels.above.bold':null,'chart.labels.above.italic':null,'chart.labels.above.color':null,'chart.labels.above.offsetx':0,'chart.labels.above.offsety':0,'chart.labels.above.specific':null,'chart.labels.above.decimals':0,'chart.labels.above.units.pre':'','chart.labels.above.units.post':'','chart.labels.above.point':'.','chart.labels.above.thousand':',','chart.labels.above.formatter':null,'chart.labels.above.total.italic':null,'chart.labels.above.total.bold':null,'chart.labels.above.total.size':null,'chart.labels.above.total.font':null,'chart.labels.above.total.color':null,'chart.labels.above.total.decimals':null,'chart.labels.above.total.units.pre':null,'chart.labels.above.total.units.post':null,'chart.labels.above.total.point':null,'chart.labels.above.total.thousand':null,'chart.labels.above.total.formatter':null,'chart.text.color':'black','chart.text.size':12,'chart.text.font':'Arial, Verdana, sans-serif','chart.text.bold':false,'chart.text.italic':false,'chart.text.accessible':true,'chart.text.accessible.overflow':'visible','chart.text.accessible.pointerevents':false,'chart.title':'','chart.title.color':'black','chart.title.background':null,'chart.title.hpos':null,'chart.title.vpos':null,'chart.title.bold':null,'chart.title.font':null,'chart.title.size':null,'chart.title.italic':null,'chart.title.color':null,'chart.title.x':null,'chart.title.y':null,'chart.title.halign':null,'chart.title.valign':null,'chart.shadow':false,'chart.shadow.color':'#666','chart.shadow.offsetx':3,'chart.shadow.offsety':3,'chart.shadow.blur':3,'chart.tooltips':null,'chart.tooltips.effect':'fade','chart.tooltips.css.class':'RGraph_tooltip','chart.tooltips.event':'onclick','chart.tooltips.highlight':true,'chart.tooltips.override':null,'chart.highlight.stroke':'rgba(0,0,0,0)','chart.highlight.fill':'rgba(255,255,255,0.7)','chart.contextmenu':null,'chart.crosshairs':false,'chart.crosshairs.color':'#333','chart.crosshairs.hline':true,'chart.crosshairs.vline':true,'chart.annotatable':false,'chart.annotatable.linewidth':1,'chart.annotatable.color':'black','chart.resizable':false,'chart.resizable.handle.background':null,'chart.total':true,'chart.multiplier.x':1,'chart.multiplier.w':1,'chart.events.click':null,'chart.events.mousemove':null,'chart.key':null,'chart.key.background':'white','chart.key.position':'graph','chart.key.halign':'right','chart.key.shadow':false,'chart.key.shadow.color':'#666','chart.key.shadow.blur':3,'chart.key.shadow.offsetx':2,'chart.key.shadow.offsety':2,'chart.key.position.gutter.boxed':false,'chart.key.position.x':null,'chart.key.position.y':null,'chart.key.color.shape':'square','chart.key.rounded':true,'chart.key.linewidth':1,'chart.key.colors':null,'chart.key.interactive':false,'chart.key.interactive.highlight.chart.stroke':'#000','chart.key.interactive.highlight.chart.fill':'rgba(255,255,255,0.7)','chart.key.interactive.highlight.label':'rgba(255,0,0,0.2)','chart.key.labels.color':null,'chart.key.labels.font':null,'chart.key.labels.size':null,'chart.key.labels.bold':null,'chart.key.labels.italic':null,'chart.key.labels.offsetx':0,'chart.key.labels.offsety':0,'chart.bar.offsetx':0,'chart.bar.offsety':0,'chart.clearto':'rgba(0,0,0,0)'}
if(!this.canvas){alert('[WATERFALL] No canvas support');return;}
for(var i=0,len=this.data.length;i<=len;++i){this['$'+i]={}
if(typeof this.data[i]==='string'){this.data[i]=parseFloat(this.data[i]);}}
if(!this.canvas.__rgraph_aa_translated__){this.context.translate(0.5,0.5);this.canvas.__rgraph_aa_translated__=true;}
var RG=RGraph,ca=this.canvas,co=ca.getContext('2d'),prop=this.properties,pa2=RG.path2,win=window,doc=document,ma=Math
if(RG.Effects&&typeof RG.Effects.decorate==='function'){RG.Effects.decorate(this);}
this.set=this.Set=function(name,value)
{var value=typeof arguments[1]==='undefined'?null:arguments[1];if(arguments.length===1&&typeof name==='object'){RG.parseObjectStyleConfig(this,name);return this;}
if(name.substr(0,6)!='chart.'){name='chart.'+name;}
while(name.match(/([A-Z])/)){name=name.replace(/([A-Z])/,'.'+RegExp.$1.toLowerCase());}
prop[name.toLowerCase()]=value;return this;};this.get=this.Get=function(name)
{if(name.substr(0,6)!='chart.'){name='chart.'+name;}
while(name.match(/([A-Z])/)){name=name.replace(/([A-Z])/,'.'+RegExp.$1.toLowerCase());}
return prop[name.toLowerCase()];};this.draw=this.Draw=function()
{RG.fireCustomEvent(this,'onbeforedraw');if(!this.colorsParsed){this.parseColors();this.colorsParsed=true;}
RGraph.DrawBackgroundImage(this);this.marginLeft=prop['chart.margin.left'];this.marginRight=prop['chart.margin.right'];this.marginTop=prop['chart.margin.top'];this.marginBottom=prop['chart.margin.bottom'];this.coords=[];this.coordsText=[];this.centery=((ca.height-this.marginTop-this.marginBottom)/2)+this.marginTop;this.max=0;this.grapharea=ca.height-this.marginTop-this.marginBottom;this.graphwidth=ca.width-this.marginLeft-this.marginRight;this.halfTextHeight=prop['chart.text.size']/2;this.max=this.getMax(this.data);var decimals=prop['chart.yaxis.scale.decimals'];this.scale2=RG.getScale2(this,{'scale.max':typeof(prop['chart.yaxis.scale.max'])=='number'?prop['chart.yaxis.scale.max']:this.max,'scale.min':prop['chart.yaxis.scale.min'],'scale.strict':typeof(prop['chart.yaxis.scale.max'])==='number'?true:false,'scale.decimals':Number(decimals),'scale.point':prop['chart.yaxis.scale.point'],'scale.thousand':prop['chart.yaxis.scale.thousand'],'scale.round':prop['chart.yaxis.scale.round'],'scale.units.pre':prop['chart.yaxis.scale.units.pre'],'scale.units.post':prop['chart.yaxis.scale.units.post'],'scale.labels.count':prop['chart.yaxis.labels.count']});this.max=this.scale2.max;this.min=this.scale2.min;RG.drawBars(this)
RG.Background.draw(this);this.DrawAxes();this.Drawbars();this.DrawLabels();if(prop['chart.xaxis.position']==='bottom'&&prop['chart.axes']&&prop['chart.xaxis']&&prop['chart.yaxis.scale.min']===0){co.strokeStyle=prop['chart.axes.color'];co.strokeRect(prop['chart.margin.left'],ca.height-this.marginBottom,ca.width-this.marginLeft-this.marginRight,0);}
if(prop['chart.contextmenu']){RG.ShowContext(this);}
if(prop['chart.resizable']){RG.AllowResizing(this);}
RG.InstallEventListeners(this);if(prop['chart.key']&&prop['chart.key'].length){RG.DrawKey(this,prop['chart.key'],prop['chart.colors']);}
if(this.firstDraw){this.firstDraw=false;RG.fireCustomEvent(this,'onfirstdraw');this.firstDrawFunc();}
RG.FireCustomEvent(this,'ondraw');return this;};this.drawAxes=this.DrawAxes=function()
{if(!prop['chart.axes']){return;}
co.beginPath();co.strokeStyle=prop['chart.axes.color'];co.lineWidth=prop['chart.axes.linewidth']+0.001;if(prop['chart.yaxis']){co.moveTo(ma.round(this.marginLeft),this.marginTop);co.lineTo(ma.round(this.marginLeft),ca.height-this.marginBottom);}
if(prop['chart.xaxis']){if(prop['chart.xaxis.position']=='center'){co.moveTo(this.marginLeft,ma.round(((ca.height-this.marginTop-this.marginBottom)/2)+this.marginTop));co.lineTo(ca.width-this.marginRight,ma.round(((ca.height-this.marginTop-this.marginBottom)/2)+this.marginTop));}else{var y=ma.floor(this.getYCoord(0));co.moveTo(this.marginLeft,y);co.lineTo(ca.width-this.marginRight,y);}}
var numYTicks=prop['chart.yaxis.tickmarks.count'];if(prop['chart.yaxis']&&prop['chart.yaxis.tickmarks.count']>0){var yTickGap=(ca.height-this.marginTop-this.marginBottom)/numYTicks;for(y=this.marginTop;y<(ca.height-this.marginBottom);y+=yTickGap){if(prop['chart.xaxis.position']=='bottom'||(y!=((ca.height-this.marginTop-this.marginBottom)/2)+this.marginTop)){co.moveTo(this.marginLeft,ma.round(y));co.lineTo(this.marginLeft-3,ma.round(y));}}
if(!prop['chart.xaxis']||prop['chart.xaxis.position']=='center'||prop['chart.yaxis.scale.min']!==0){co.moveTo(this.marginLeft-3,Math.round(ca.height-this.marginBottom));co.lineTo(this.marginLeft,Math.round(ca.height-this.marginBottom));}}
if(prop['chart.xaxis.tickmarks.count']==null){prop['chart.xaxis.tickmarks.count']=this.data.length+(prop['chart.total']?1:0)}
if(prop['chart.xaxis']&&prop['chart.xaxis.tickmarks.count']>0){xTickGap=(ca.width-this.marginLeft-this.marginRight)/prop['chart.xaxis.tickmarks.count'];if(prop['chart.xaxis.position']=='center'){yStart=((ca.height-this.marginBottom-this.marginTop)/2)+this.marginTop-3;yEnd=((ca.height-this.marginBottom-this.marginTop)/2)+this.marginTop+3;}else{yStart=this.getYCoord(0)-(this.scale2.min<0?3:0);yEnd=this.getYCoord(0)+3;}
for(x=this.marginLeft+xTickGap;x<=ca.width-this.marginRight+1;x+=xTickGap){co.moveTo(ma.round(x),yStart);co.lineTo(ma.round(x),yEnd);}
if(!prop['chart.yaxis']){co.moveTo(ma.round(this.marginLeft),yStart);co.lineTo(ma.round(this.marginLeft),yEnd);}}
if(!prop['chart.yaxis']&&prop['chart.xaxis']){co.moveTo(ma.round(this.marginLeft),this.getYCoord(0));co.lineTo(ma.round(this.marginLeft),this.getYCoord(0));}
co.stroke();};this.drawLabels=this.DrawLabels=function()
{var context=co,numYLabels=5,interval=this.grapharea/numYLabels,italic=prop['chart.text.italic'],bold=prop['chart.text.bold'],font=prop['chart.text.font'],size=prop['chart.text.size'],color=prop['chart.text.color'],units_pre=prop['chart.yaxis.scale.units.pre'],units_post=prop['chart.yaxis.scale.units.post'],offsetx=prop['chart.yaxis.labels.offsetx'],offsety=prop['chart.yaxis.labels.offsety'];co.beginPath();co.fillStyle=color;var textConf=RG.getTextConf({object:this,prefix:'chart.yaxis.labels'});if(prop['chart.yaxis.labels']){if(prop['chart.xaxis.position']=='center'){var halfInterval=interval/2;var halfWay=((ca.height-this.marginTop-this.marginBottom)/2)+this.marginTop;for(var i=0,len=this.scale2.labels.length;i<len;++i){RG.text2(this,{font:textConf.font,size:textConf.size,color:textConf.color,bold:textConf.bold,italic:textConf.italic,x:this.marginLeft-5+offsetx,y:this.marginTop+(((this.grapharea/2)/len)*i)+offsety,text:this.scale2.labels[len-i-1],valign:'center',halign:'right',tag:'scale'});RG.text2(this,{font:textConf.font,size:textConf.size,color:textConf.color,bold:textConf.bold,italic:textConf.italic,x:this.marginLeft-5+offsetx,y:halfWay+(((this.grapharea/2)/len)*(i+1))+offsety,text:this.scale2.labels[i],valign:'center',halign:'right',tag:'scale'});}
if(prop['chart.yaxis.scale.zerostart']){RG.text2(co,{font:textConf.font,size:textConf.size,color:textConf.color,bold:textConf.bold,italic:textConf.italic,x:this.marginLeft-5+offsetx,y:halfWay,text:'0',valign:'center',halign:'right',tag:'scale'});}}else{for(var i=0,len=this.scale2.values.length;i<len;++i){var y=this.getYCoord(this.scale2.values[i])+offsety;RG.text2(this,{font:textConf.font,size:textConf.size,color:textConf.color,bold:textConf.bold,italic:textConf.italic,x:this.marginLeft-5+offsetx,y:y,text:this.scale2.labels[i],valign:'center',halign:'right',tag:'scale'});}
if(prop['chart.yaxis.scale.zerostart']||prop['chart.yaxis.scale.min']!==0){RG.text2(co,{font:textConf.font,size:textConf.size,color:textConf.color,bold:textConf.bold,italic:textConf.italic,x:this.marginLeft-5+offsetx,y:this.getYCoord(prop['chart.yaxis.scale.min']||0),text:RG.numberFormat({object:this,number:String(Number(prop['chart.yaxis.scale.min']||0).toFixed(prop['chart.yaxis.scale.min']===0?0:prop['chart.yaxis.scale.decimals'])),unitspre:prop['chart.yaxis.scale.units.pre'],unitspost:prop['chart.yaxis.scale.units.post']}),valign:'center',halign:'right',tag:'scale'});}}}
if(prop['chart.xaxis.labels'].length>0){interval=(ca.width-this.marginLeft-this.marginRight)/prop['chart.xaxis.labels'].length;var halign='center',valign='top',angle=prop['chart.xaxis.labels.angle'];if(angle){halign='right';angle*=-1;}
var labels=prop['chart.xaxis.labels'],offsetx=prop['chart.xaxis.labels.offsetx'],offsety=prop['chart.xaxis.labels.offsety'];var textConf=RG.getTextConf({object:this,prefix:'chart.xaxis.labels'});for(var i=0,len=labels.length;i<len;i+=1){RG.text2(this,{font:textConf.font,size:textConf.size,color:textConf.color,bold:textConf.bold,italic:textConf.italic,x:this.marginLeft+(i*interval)+(interval/2)+offsetx,y:ca.height-this.marginBottom+this.halfTextHeight+offsety,text:labels[i],valign:valign,halign:halign,angle:angle,tag:'labels'});}}
co.stroke();co.fill();if(prop['chart.labels.above']){this.drawLabelsAbove();}};this.drawLabelsAbove=function()
{var data=this.data,unitsPre=prop['chart.labels.above.units.pre'],unitsPost=prop['chart.labels.above.units.post'],decimals=prop['chart.labels.above.decimals'],thousand=prop['chart.labels.above.thousand'],point=prop['chart.labels.above.point'],formatter=prop['chart.labels.above.formatter'];var textConf=RG.getTextConf({object:this,prefix:'chart.labels.above'});for(var i=0;i<this.data.length+(prop['chart.total']?1:0);++i){if(prop['chart.total']&&i===this.data.length){var isTotal=true;}
var value=Number(isTotal?this.total:this.data[i]);if(typeof prop['chart.labels.above.color']==='object'&&prop['chart.labels.above.color']){if(isTotal&&typeof prop['chart.labels.above.color'][2]==='string'){color=prop['chart.labels.above.color'][2];}else if(this.data[i]<0){color=prop['chart.labels.above.color'][1];}else{color=prop['chart.labels.above.color'][0];}}
if(typeof prop['chart.labels.above.total.color']==='object'&&prop['chart.labels.above.total.color']){if(isTotal&&typeof prop['chart.labels.above.total.color'][0]==='string'&&typeof prop['chart.labels.above.total.color'][1]==='string'){if(this.total<0){color=prop['chart.labels.above.total.color'][1];}else{color=prop['chart.labels.above.total.color'][0];}}}
var coords=this.coords[i];var tmpScaleThousand=prop['chart.yaxis.scale.thousand'],tmpScalePoint=prop['chart.yaxis.scale.decimal'];prop['chart.yaxis.scale.thousand']=prop['chart.labels.above.thousand'];prop['chart.yaxis.scale.point']=prop['chart.labels.above.point'];if(formatter){var str=(formatter)({object:this,value:value,index:i});}else{var str=RG.numberFormat({object:this,number:String(value.toFixed(decimals)),unitspre:unitsPre,unitspost:unitsPost,point:point,thousand:thousand});}
if(isTotal||i===this.data.length){if(typeof prop['chart.labels.above.total.font']==='string')textConf.font=prop['chart.labels.above.total.font'];if(typeof prop['chart.labels.above.total.color']==='string')textConf.color=prop['chart.labels.above.total.color'];if(typeof prop['chart.labels.above.total.size']==='number')textConf.size=prop['chart.labels.above.total.size'];if(!RG.isNull(prop['chart.labels.above.total.bold']))textConf.bold=prop['chart.labels.above.total.bold'];if(!RG.isNull(prop['chart.labels.above.total.italic']))textConf.italic=prop['chart.labels.above.total.italic'];if(typeof prop['chart.labels.above.total.units.pre']==='string')unitsPre=prop['chart.labels.above.total.units.pre'];if(typeof prop['chart.labels.above.total.units.post']==='string')unitsPost=prop['chart.labels.above.total.units.post'];if(typeof prop['chart.labels.above.total.decimals']==='number')decimals=prop['chart.labels.above.total.decimals'];if(typeof prop['chart.labels.above.total.formatter']==='function')formatter=prop['chart.labels.above.total.formatter'];if(typeof prop['chart.labels.above.total.thousand']==='string')thousand=prop['chart.labels.above.total.thousand'];if(typeof prop['chart.labels.above.total.point']==='string')point=prop['chart.labels.above.total.point'];if(formatter){var str=(formatter)({object:this,value:value,index:i});}else{str=RG.numberFormat({object:this,number:String(value.toFixed(decimals)),unitspre:unitsPre,unitspost:unitsPost,point:point,thousand:thousand});}
prop['chart.yaxis.scale.thousand']=tmpScaleThousand;prop['chart.yaxis.scale.point']=tmpScalePoint;}
if(typeof prop['chart.labels.above.specific']==='object'&&!RG.isNull(prop['chart.labels.above.specific'])&&(typeof prop['chart.labels.above.specific'][i]==='string'||typeof prop['chart.labels.above.specific'][i]==='number')){str=prop['chart.labels.above.specific'][i];}
RG.text2(this,{font:textConf.font,size:textConf.size,color:textConf.color,bold:textConf.bold,italic:textConf.italic,x:coords[0]+(coords[2]/2)+prop['chart.labels.above.offsetx'],y:(isTotal?this.total:this.data[i])>=0?(coords[1]-3-prop['chart.labels.above.offsety']):(coords[1]+coords[3]+3+prop['chart.labels.above.offsety']),text:str,valign:(isTotal?this.total:this.data[i])>=0?'bottom':'top',halign:'center',tag:'labels.above'});}};this.drawbars=this.Drawbars=function()
{var context=co,canvas=ca,hmargin=prop['chart.margin.inner'],runningTotal=0;co.lineWidth=prop['chart.linewidth']+0.001;for(var i=0,len=this.data.length,seq=0;i<len;++i,++seq){co.beginPath();co.strokeStyle=prop['chart.colors.stroke'];var x=ma.round(this.marginLeft+hmargin+(((this.graphwidth/(this.data.length+(prop['chart.total']?1:0)))*i)*prop['chart.multiplier.x']));var h=this.getYCoord(0)-this.getYCoord(ma.abs(this.data[i]));if(i===0){y=this.getYCoord(0)-h;}else{y=this.getYCoord(runningTotal)-h;}
y=ma.round(y);var w=((ca.width-this.marginLeft-this.marginRight)/(this.data.length+(prop['chart.total']?1:0)))-(2*prop['chart.margin.inner']);w=w*prop['chart.multiplier.w'];if(this.data[i]<0){y+=h;}
co.fillStyle=this.data[i]>=0?prop['chart.colors'][0]:prop['chart.colors'][1];if(prop['chart.colors.sequential']){co.fillStyle=prop['chart.colors'][seq];}
if(prop['chart.shadow']){RG.setShadow(this,prop['chart.shadow.color'],prop['chart.shadow.offsetx'],prop['chart.shadow.offsety'],prop['chart.shadow.blur']);}else{RG.noShadow(this);}
co.rect(x+prop['chart.bar.offsetx'],ma.floor(y)+prop['chart.bar.offsety'],w,ma.floor(h));this.coords.push([x,y,w,h]);runningTotal+=this.data[i];co.stroke();co.fill();}
this.total=runningTotal;if(prop['chart.total']){h=this.getYCoord(0)-this.getYCoord(ma.abs(runningTotal));if(prop['chart.xaxis.position']=='center'){y=runningTotal>0?this.getYCoord(0)-h:this.getYCoord(0);}else{if(runningTotal>0){y=this.getYCoord(0)-h;}else{y=this.getYCoord(0);}}
x=x+(prop['chart.margin.inner']*2)+w;co.fillStyle=prop['chart.colors'][2];if(prop['chart.colors.sequential']){co.fillStyle=prop['chart.colors'][seq]}
pa2(co,'b r % % % % s % f %',x+prop['chart.bar.offsetx'],y+prop['chart.bar.offsety'],w,h,co.strokeStyle,co.fillStyle);var previousCoords=[x,y,w,ma.abs(h)];this.coords.push(previousCoords);}
RG.noShadow(this);co.lineWidth=1;co.strokeStyle='#666';co.beginPath();for(var i=1,len=this.coords.length;i<len;i+=1){var prev=this.coords[i-1],curr=this.coords[i],prevData=this.data[i-1];var y=(prevData>0?prev[1]:prev[1]+prev[3]);co.moveTo(prev[0]+prev[2]+prop['chart.bar.offsetx'],y+prop['chart.bar.offsety']);co.lineTo(curr[0]+prop['chart.bar.offsetx'],(prevData>0?prev[1]:prev[1]+prev[3])+prop['chart.bar.offsety']);}
co.stroke();};this.getShape=this.getBar=function(e)
{for(var i=0,len=this.coords.length;i<len;i++){var mouseXY=RG.getMouseXY(e),mouseX=mouseXY[0],mouseY=mouseXY[1];var left=this.coords[i][0],top=this.coords[i][1],width=this.coords[i][2],height=this.coords[i][3];if(mouseX>=left&&mouseX<=(left+width)&&mouseY>=top&&mouseY<=top+height){var tooltip=RG.parseTooltipText(prop['chart.tooltips'],i);return{0:this,object:this,1:left,x:left,2:top,y:top,3:width,width:width,4:height,height:height,5:i,index:i,tooltip:tooltip};}}
return null;};this.getMax=function(data)
{var runningTotal=0,max=0;for(var i=0,len=data.length;i<len;i+=1){runningTotal+=data[i];max=ma.max(ma.abs(runningTotal),max);}
return ma.abs(max);};this.allowTooltips=this.AllowTooltips=function()
{RG.PreLoadTooltipImages(this);RG.InstallWindowMousedownTooltipListener(this);RG.InstallCanvasMousemoveTooltipListener(this);RG.InstallCanvasMouseupTooltipListener(this);};this.highlight=this.Highlight=function(shape)
{if(typeof prop['chart.highlight.style']==='function'){(prop['chart.highlight.style'])(shape);}else{RG.Highlight.Rect(this,shape);}};this.getObjectByXY=function(e)
{var mouseXY=RG.getMouseXY(e);if(mouseXY[0]>this.marginLeft&&mouseXY[0]<(ca.width-this.marginRight)&&mouseXY[1]>this.marginTop&&mouseXY[1]<(ca.height-this.marginBottom)){return this;}};this.getYCoord=function(value)
{if(prop['chart.xaxis.position']=='center'){if(value<(-1*this.max)){return null;}
var coord=(value/this.max)*(this.grapharea/2);return this.marginTop+(this.grapharea/2)-coord;}else{var coord=((value-this.scale2.min)/(this.max-this.scale2.min))*this.grapharea;coord=coord+this.marginBottom;return ca.height-coord;}};this.parseColors=function()
{if(this.original_colors.length===0){this.original_colors['chart.colors']=RG.arrayClone(prop['chart.colors']);this.original_colors['chart.key.colors']=RG.arrayClone(prop['chart.key.colors']);this.original_colors['chart.crosshairs.color']=RG.arrayClone(prop['chart.crosshairs.color']);this.original_colors['chart.highlight.stroke']=RG.arrayClone(prop['chart.highlight.stroke']);this.original_colors['chart.highlight.fill']=RG.arrayClone(prop['chart.highlight.fill']);this.original_colors['chart.background.bars.color1']=RG.arrayClone(prop['chart.background.bars.color1']);this.original_colors['chart.background.bars.color2']=RG.arrayClone(prop['chart.background.bars.color2']);this.original_colors['chart.background.grid.color']=RG.arrayClone(prop['chart.background.grid.color']);this.original_colors['chart.colors.stroke']=RG.arrayClone(prop['chart.colors.stroke']);this.original_colors['chart.axes.color']=RG.arrayClone(prop['chart.axes.color']);}
var colors=prop['chart.colors'];if(colors){for(var i=0,len=colors.length;i<len;++i){colors[i]=this.parseSingleColorForGradient(colors[i]);}}
var colors=prop['chart.key.colors'];if(colors){for(var i=0,len=colors.length;i<len;++i){colors[i]=this.parseSingleColorForGradient(colors[i]);}}
prop['chart.crosshairs.color']=this.parseSingleColorForGradient(prop['chart.crosshairs.color']);prop['chart.highlight.stroke']=this.parseSingleColorForGradient(prop['chart.highlight.stroke']);prop['chart.highlight.fill']=this.parseSingleColorForGradient(prop['chart.highlight.fill']);prop['chart.background.bars.color1']=this.parseSingleColorForGradient(prop['chart.background.bars.color1']);prop['chart.background.bars.color2']=this.parseSingleColorForGradient(prop['chart.background.bars.color2']);prop['chart.background.grid.color']=this.parseSingleColorForGradient(prop['chart.background.grid.color']);prop['chart.colors.stroke']=this.parseSingleColorForGradient(prop['chart.colors.stroke']);prop['chart.axes.color']=this.parseSingleColorForGradient(prop['chart.axes.color']);};this.reset=function()
{};this.parseSingleColorForGradient=function(color)
{if(!color||typeof color!='string'){return color;}
if(typeof color==='string'&&color.match(/^gradient\((.*)\)$/i)){if(color.match(/^gradient\(({.*})\)$/i)){return RGraph.parseJSONGradient({object:this,def:RegExp.$1});}
var parts=RegExp.$1.split(':');var grad=co.createLinearGradient(0,ca.height-prop['chart.margin.bottom'],0,prop['chart.margin.top']);var diff=1/(parts.length-1);grad.addColorStop(0,RG.trim(parts[0]));for(var j=1,len=parts.length;j<len;++j){grad.addColorStop(j*diff,RG.trim(parts[j]));}}
return grad?grad:color;};this.on=function(type,func)
{if(type.substr(0,2)!=='on'){type='on'+type;}
if(typeof this[type]!=='function'){this[type]=func;}else{RG.addCustomEventListener(this,type,func);}
return this;};this.exec=function(func)
{func(this);return this;};this.firstDrawFunc=function()
{};this.grow=function()
{var opt=arguments[0]||{};var callback=arguments[1]||function(){};var frames=opt.frames||30;var numFrame=0;var obj=this;var data=RG.array_clone(obj.data);for(var i=0,len=obj.data.length;i<len;++i){obj.data[i]/=frames;}
if(obj.get('chart.yaxis.scale.max')==null){var max=obj.getMax(data);var scale2=RG.getScale2(obj,{'scale.max':max});obj.Set('chart.yaxis.scale.max',scale2.max);}
function iterator()
{for(var i=0;i<obj.data.length;++i){obj.data[i]=data[i]*RG.Effects.getEasingMultiplier(frames,numFrame);}
RG.clear(obj.canvas);RG.redrawCanvas(obj.canvas);if(++numFrame<=frames){RGraph.Effects.updateCanvas(iterator);}else{callback(obj);}}
iterator();return this;};RG.register(this);if(parseConfObjectForOptions){RG.parseObjectStyleConfig(this,conf.options);}
return this;};
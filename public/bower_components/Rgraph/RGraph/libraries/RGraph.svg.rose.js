
RGraph=window.RGraph||{isRGraph:true};RGraph.SVG=RGraph.SVG||{};(function(win,doc,undefined)
{var RG=RGraph,ua=navigator.userAgent,ma=Math,win=window,doc=document;RG.SVG.Rose=function(conf)
{this.set=function(name,value)
{if(arguments.length===1&&typeof name==='object'){for(i in arguments[0]){if(typeof i==='string'){name=ret.name;value=ret.value;this.set(name,value);}}}else{var ret=RG.SVG.commonSetter({object:this,name:name,value:value});name=ret.name;value=ret.value;this.properties[name]=value;if(name==='colors'){this.originalColors=RG.SVG.arrayClone(value);this.colorsParsed=false;}}
return this;};this.get=function(name)
{return this.properties[name];};this.id=conf.id;this.uid=RG.SVG.createUID();this.container=document.getElementById(this.id);this.layers={};this.svg=RG.SVG.createSVG({object:this,container:this.container});this.isRGraph=true;this.width=Number(this.svg.getAttribute('width'));this.height=Number(this.svg.getAttribute('height'));this.data=RG.SVG.arrayClone(conf.data);this.originalData=RG.SVG.arrayClone(conf.data);this.type='rose';this.angles=[];this.angles2=[];this.colorsParsed=false;this.originalColors={};this.gradientCounter=1;this.nodes=[];this.shadowNodes=[];this.max=0;this.redraw=false;this.highlight_node=null;this.propertyNameAliases={};RG.SVG.OR.add(this);this.container.style.display='inline-block';this.properties={centerx:null,centery:null,radius:null,marginLeft:35,marginRight:35,marginTop:35,marginBottom:35,amargin:'3deg',backgroundGrid:true,backgroundGridColor:'#ddd',backgroundGridRadialsCount:null,backgroundGridRadialsAngleOffset:0,backgroundGridConcentricsCount:5,backgroundGridLinewidth:1,colorsStroke:'white',colors:['red','black','orange','green','#6ff','#ccc','pink','orange','cyan','maroon','olive','teal'],colorsOpacity:1,textColor:'black',textFont:'Arial, Verdana, sans-serif',textSize:12,textBold:false,textItalic:false,labels:[],labelsFont:null,labelsSize:null,labelsColor:null,labelsBold:null,labelsItalic:null,labelsRadialMargin:10,labelsAngleOffset:0,scaleVisible:true,scaleUnitsPre:'',scaleUnitsPost:'',scaleMax:null,scaleMin:0,scalePoint:'.',scaleThousand:',',scaleRound:false,scaleDecimals:0,scaleFormatter:null,scaleBold:null,scaleItalic:null,scaleColor:null,scaleSize:null,scaleFont:null,scaleLabelsCount:5,linewidth:1,tooltips:null,tooltipsOverride:null,tooltipsEffect:'fade',tooltipsCssClass:'RGraph_tooltip',tooltipsEvent:'click',highlightStroke:'rgba(0,0,0,0)',highlightFill:'rgba(255,255,255,0.7)',highlightLinewidth:1,title:'',titleX:null,titleY:null,titleHalign:'center',titleValign:null,titleSize:null,titleColor:null,titleFont:null,titleBold:null,titleItalic:null,titleSubtitle:null,titleSubtitleX:null,titleSubtitleY:null,titleSubtitleHalign:'center',titleSubtitleValign:null,titleSubtitleSize:null,titleSubtitleColor:'#aaa',titleSubtitleFont:null,titleSubtitleBold:null,titleSubtitleItalic:null,shadow:false,shadowOffsetx:2,shadowOffsety:2,shadowBlur:2,shadowOpacity:0.25,exploded:0,key:null,keyColors:null,keyOffsetx:0,keyOffsety:0,keyLabelsOffsetx:0,keyLabelsOffsety:-1,keyLabelsFont:null,keyLabelsSize:null,keyLabelsColor:null,keyLabelsBold:null,keyLabelsItalic:null,segmentsAngleOffset:0,variant:'normal',effectGrowMultiplier:1,effectRoundrobinMultiplier:1};RG.SVG.getGlobals(this);if(RG.SVG.FX&&typeof RG.SVG.FX.decorate==='function'){RG.SVG.FX.decorate(this);}
var prop=this.properties;this.draw=function()
{RG.SVG.fireCustomEvent(this,'onbeforedraw');this.width=Number(this.svg.getAttribute('width'));this.height=Number(this.svg.getAttribute('height'));this.data=RG.SVG.arrayClone(this.originalData);this.angles=[];for(var i=0;i<this.data.length;++i){this.angles2[i]=[];}
RG.SVG.createDefs(this);this.graphWidth=this.width-prop.marginLeft-prop.marginRight;this.graphHeight=this.height-prop.marginTop-prop.marginBottom;this.centerx=(this.graphWidth/2)+prop.marginLeft;this.centery=(this.graphHeight/2)+prop.marginTop;this.radius=ma.min(this.graphWidth,this.graphHeight)/2;this.centerx=typeof prop.centerx==='number'?prop.centerx:this.centerx;this.centery=typeof prop.centery==='number'?prop.centery:this.centery;this.radius=typeof prop.radius==='number'?prop.radius:this.radius;if(typeof prop.radius==='string'&&prop.radius.match(/^\+|-\d+$/))this.radius+=parseFloat(prop.radius);if(typeof prop.centerx==='string'&&prop.centerx.match(/^\+|-\d+$/))this.centery+=parseFloat(prop.centerx);if(typeof prop.centery==='string'&&prop.centery.match(/^\+|-\d+$/))this.centerx+=parseFloat(prop.centery);if(typeof prop.amargin==='string'&&prop.amargin.match(/([0-9.]+)deg/)){prop.amargin=RegExp.$1/(180/ma.PI);}
for(var i=0;i<this.data.length;++i){if(typeof this.data[i]==='object'){for(var j=0;j<this.data[i].length;++j){if(typeof this.data[i][j]==='string'){this.data[i][j]=RG.SVG.stringsToNumbers(this.data[i][j]);}}}else if(typeof this.data[i]==='string'){this.data[i]=RG.SVG.stringsToNumbers(this.data[i]);}}
this.getMaxValue();RG.SVG.resetColorsToOriginalValues({object:this});this.parseColors();this.scale=RG.SVG.getScale({object:this,numlabels:typeof prop.scaleLabelsCount==='number'?prop.scaleLabelsCount:prop.backgroundGridConcentricCount,unitsPre:prop.scaleUnitsPre,unitsPost:prop.scaleUnitsPost,max:typeof prop.scaleMax==='number'?prop.scaleMax:this.max,min:prop.scaleMin,point:prop.scalePoint,round:prop.scaleRound,thousand:prop.scaleThousand,decimals:prop.scaleDecimals,strict:typeof prop.scaleMax==='number',formatter:prop.scaleFormatter});this.max=this.scale.max;this.drawBackground();this.drawRose();this.drawLabels();RG.SVG.drawTitle(this);if(typeof prop.key!==null&&RG.SVG.drawKey){RG.SVG.drawKey(this);}else if(!RGraph.SVG.isNull(prop.key)){alert('The drawKey() function does not exist - have you forgotten to include the key library?');}
if(prop.shadow){RG.SVG.setShadow({object:this,offsetx:prop.shadowOffsetx,offsety:prop.shadowOffsety,blur:prop.shadowBlur,opacity:prop.shadowOpacity,id:'dropShadow'});}
var obj=this;doc.body.addEventListener('mousedown',function(e)
{obj.hideHighlight(obj);},false);RG.SVG.fireCustomEvent(this,'ondraw');return this;};this.drawBackground=function()
{if(prop.backgroundGrid){var grid=RG.SVG.create({svg:this.svg,parent:this.svg.all,type:'g',attr:{className:'rgraph_radar_grid',fill:'rgba(0,0,0,0)',stroke:prop.backgroundGridColor},style:{pointerEvents:'none'}});var origin=0-(RG.SVG.TRIG.PI/2),radials=(typeof prop.backgroundGridRadialsCount==='number'?prop.backgroundGridRadialsCount:this.data.length),concentrics=prop.backgroundGridConcentricsCount,step=RG.SVG.TRIG.TWOPI/radials;if(radials>0){if(prop.variant==='non-equi-angular'){var radials=this.data.length;for(var i=0,total=0;i<this.data.length;++i){total+=this.data[i][1];}
for(var i=0,sum=0;i<this.data.length;++i){var coords=RG.SVG.TRIG.toCartesian({cx:this.centerx,cy:this.centery,r:this.radius,angle:origin+((sum/total)*RG.SVG.TRIG.TWOPI)+prop.backgroundGridRadialsAngleOffset});var str='M {1} {2} L {3} {4}'.format(this.centerx,this.centery,coords.x,coords.y);RG.SVG.create({svg:this.svg,type:'path',parent:grid,attr:{d:str,stroke:prop.backgroundGridColor,'stroke-width':prop.backgroundGridLinewidth}});sum+=this.data[i][1];}}else{for(var i=0,len=radials;i<len;++i){var coords=RG.SVG.TRIG.toCartesian({cx:this.centerx,cy:this.centery,r:this.radius,angle:origin+(i*step)+prop.backgroundGridRadialsAngleOffset});var str='M {1} {2} L {3} {4}'.format(this.centerx,this.centery,coords.x,coords.y);RG.SVG.create({svg:this.svg,type:'path',parent:grid,attr:{d:str,stroke:prop.backgroundGridColor,'stroke-width':prop.backgroundGridLinewidth}});}}}
if(concentrics>0){for(var j=1;j<=concentrics;j++){RG.SVG.create({svg:this.svg,type:'circle',parent:grid,attr:{cx:this.centerx,cy:this.centery,r:this.radius*(j/concentrics),fill:'transparent',stroke:prop.backgroundGridColor,'stroke-width':prop.backgroundGridLinewidth}});}}}};this.drawRose=function()
{var opt=arguments[0]||{};for(var i=0;i<this.angles.length;++i){this.angles[i].element.parentNode.removeChild(this.angles[i].element);}
this.angles=[];for(var i=0;i<this.data.length;++i){this.angles2[i]=[];}
if(prop.variant==='non-equi-angular'){return this.drawRoseNonEquiAngular(opt);}
var radians=RG.SVG.TRIG.TWOPI/this.data.length;if(!document.getElementById('rgraph_rose_segments_'+this.uid)){var group=RG.SVG.create({svg:this.svg,type:'g',parent:this.svg.all,attr:{id:'rgraph_rose_segments_'+this.uid}});}else{var group=document.getElementById('rgraph_rose_segments_'+this.uid);}
for(var i=0,seq=0;i<this.data.length;++i,++seq){var radius=(this.data[i]/this.scale.max)*this.radius*prop.effectGrowMultiplier,start=(i/this.data.length)*RG.SVG.TRIG.TWOPI*prop.effectRoundrobinMultiplier,end=(((i/this.data.length)*RG.SVG.TRIG.TWOPI)+radians)*prop.effectRoundrobinMultiplier;var explosion=this.getExploded({index:i,start:start-RG.SVG.TRIG.HALFPI,end:end-RG.SVG.TRIG.HALFPI});if(typeof this.data[i]==='object'&&!RG.SVG.isNull(this.data[i])){if(!document.getElementById('rose_'+this.uid+'_segment_group_'+i)){var segment_group=RG.SVG.create({svg:this.svg,type:'g',parent:group,attr:{id:'rose_'+this.uid+'_segment_group_'+i}});}else{var segment_group=document.getElementById('rose_'+this.uid+'_segment_group_'+i)}
for(var j=0,sum=0,accRadius=0;j<this.data[i].length;++j,++seq){if(j===0){prevRadius=0;}
sum+=this.data[i][j];var radius=(sum/this.scale.max)*this.radius*prop.effectGrowMultiplier,cx=this.centerx+(explosion[0]*prop.effectRoundrobinMultiplier),cy=this.centery+(explosion[1]*prop.effectRoundrobinMultiplier);var arcPath=RG.SVG.TRIG.getArcPath2({cx:cx,cy:cy,r:radius,start:((start+prop.amargin)*prop.effectRoundrobinMultiplier)+prop.segmentsAngleOffset,end:((end-prop.amargin)*prop.effectRoundrobinMultiplier)+prop.segmentsAngleOffset,anticlockwise:false});if(j===0){arcPath='{1} z'.format(arcPath);}else{var arcPath2=RG.SVG.TRIG.getArcPath2({cx:cx,cy:cy,r:prevRadius,start:((end-prop.amargin)*prop.effectRoundrobinMultiplier)+prop.segmentsAngleOffset,end:((start+prop.amargin)*prop.effectRoundrobinMultiplier)+prop.segmentsAngleOffset,anticlockwise:true});arcPath='{1} L {2} {3} {4}'.format(arcPath,cx,cy,arcPath2);}
var path=RG.SVG.create({svg:this.svg,type:'path',parent:segment_group,attr:{d:arcPath,fill:prop.colorsSequential?prop.colors[seq]:prop.colors[j],'fill-opacity':prop.colorsOpacity,stroke:prop.colorsStroke,'stroke-width':prop.linewidth,'data-tooltip':(!RG.SVG.isNull(prop.tooltips)&&prop.tooltips.length)?prop.tooltips[seq]:'','data-index':i,'data-centerx':cx,'data-centery':cy,'data-group':i,'data-subindex':j,'data-value':this.data[i][j],'data-start-angle':start+prop.amargin+prop.segmentsAngleOffset,'data-end-angle':end-prop.amargin+prop.segmentsAngleOffset,'data-radius':radius,'data-radius-inner':typeof prevRadius==='number'?prevRadius*prop.effectGrowMultiplier:0,'data-sequential-index':seq}});if(prop.tooltips&&prop.tooltips[seq]){if(prop.tooltipsEvent!=='mousemove'){prop.tooltipsEvent='click';}
(function(index,group,seq,obj)
{path.addEventListener(prop.tooltipsEvent,function(e)
{obj.removeHighlight();RG.SVG.tooltip({object:obj,group:group,index:index,sequentialIndex:seq,text:prop.tooltips[seq],event:e});obj.highlight(e.target);var highlight=RG.SVG.REG.get('highlight');if(prop.tooltipsEvent==='mousemove'){highlight.style.cursor='pointer';}},false);if(prop.tooltipsEvent==='click'){path.addEventListener('mousemove',function(e)
{e.target.style.cursor='pointer';},false);}}(j,i,seq,this));}
this.angles.push({object:this,element:path});this.angles2[i].push({object:this,element:path});var prevRadius=radius;}
seq--;}else{var cx=this.centerx+(explosion[0]*prop.effectRoundrobinMultiplier),cy=this.centery+(explosion[1]*prop.effectRoundrobinMultiplier);var arcPath=RG.SVG.TRIG.getArcPath2({cx:cx,cy:cy,r:radius,start:((start+prop.amargin)*prop.effectRoundrobinMultiplier)+prop.segmentsAngleOffset,end:((end-prop.amargin)*prop.effectRoundrobinMultiplier)+prop.segmentsAngleOffset,anticlockwise:false});var path=RG.SVG.create({svg:this.svg,type:'path',parent:group,attr:{d:'{1} z'.format(arcPath),fill:prop.colorsSequential?prop.colors[i]:prop.colors[0],'fill-opacity':prop.colorsOpacity,stroke:prop.colorsStroke,'stroke-width':prop.linewidth,'data-tooltip':(!RG.SVG.isNull(prop.tooltips)&&prop.tooltips.length)?prop.tooltips[i]:'','data-index':i,'data-centerx':cx,'data-centery':cy,'data-value':this.data[i],'data-start-angle':start+prop.amargin+prop.segmentsAngleOffset,'data-end-angle':end-prop.amargin+prop.segmentsAngleOffset,'data-radius':radius,'data-sequential':seq}});this.angles.push({object:this,element:path});this.angles2[i].push({object:this,element:path});if(prop.tooltips&&prop.tooltips[i]){if(prop.tooltipsEvent!=='mousemove'){prop.tooltipsEvent='click';}
(function(index,obj)
{path.addEventListener(prop.tooltipsEvent,function(e)
{obj.removeHighlight();RG.SVG.tooltip({object:obj,index:index,group:index,sequentialIndex:index,text:prop.tooltips[index],event:e});obj.highlight(e.target);var highlight=RG.SVG.REG.get('highlight');if(prop.tooltipsEvent==='mousemove'){highlight.style.cursor='pointer';}},false);if(prop.tooltipsEvent==='click'){path.addEventListener('mousemove',function(e)
{e.target.style.cursor='pointer';},false);}}(i,this));}}}};this.drawRoseNonEquiAngular=function(opt)
{if(!document.getElementById('rgraph_rose_segments_'+this.uid)){var group=RG.SVG.create({svg:this.svg,type:'g',parent:this.svg.all,attr:{id:'rgraph_rose_segments_'+this.uid}});}else{var group=document.getElementById('rgraph_rose_segments_'+this.uid)}
for(var i=0,total=0;i<this.data.length;++i){total+=parseFloat(this.data[i][1]);}
var start=0;for(var i=0,seq=0;i<this.data.length;++i,++seq){var radians=(this.data[i][1]/total)*RG.SVG.TRIG.TWOPI,end=start+radians;var explosion=this.getExploded({index:i,start:start-RG.SVG.TRIG.HALFPI,end:end-RG.SVG.TRIG.HALFPI});if(typeof this.data[i][0]==='object'&&!RG.SVG.isNull(this.data[i][0])){if(!document.getElementById('rgraph_rose_'+this.uid+'_segment_group_'+i)){var segment_group=RG.SVG.create({svg:this.svg,type:'g',parent:group,attr:{id:'rgraph_rose_'+this.uid+'_segment_group_'+i}});}else{var segment_group=document.getElementById('rgraph_rose_'+this.uid+'_segment_group_'+i)}
for(var j=0,sum=0;j<this.data[i][0].length;++j,++seq){sum+=this.data[i][0][j];if(j===0){var prevRadius=0,radius=(sum/this.scale.max)*this.radius*prop.effectGrowMultiplier,cx=this.centerx+(explosion[0]*prop.effectRoundrobinMultiplier),cy=this.centery+(explosion[1]*prop.effectRoundrobinMultiplier);var arcPath=RG.SVG.TRIG.getArcPath2({cx:cx,cy:cy,r:radius,start:((start+prop.amargin)*prop.effectRoundrobinMultiplier)+prop.segmentsAngleOffset,end:((end-prop.amargin)*prop.effectRoundrobinMultiplier)+prop.segmentsAngleOffset,anticlockwise:false});var arcPath2='';}else{var prevRadius=radius,radius=(sum/this.scale.max)*this.radius*prop.effectGrowMultiplier,cx=this.centerx+(explosion[0]*prop.effectRoundrobinMultiplier),cy=this.centery+(explosion[1]*prop.effectRoundrobinMultiplier);var arcPath=RG.SVG.TRIG.getArcPath2({cx:cx,cy:cy,r:radius,start:((start+prop.amargin)*prop.effectRoundrobinMultiplier)+prop.segmentsAngleOffset,end:((end-prop.amargin)*prop.effectRoundrobinMultiplier)+prop.segmentsAngleOffset,anticlockwise:false});var arcPath2=RG.SVG.TRIG.getArcPath2({cx:cx,cy:cy,r:prevRadius,start:((end-prop.amargin)*prop.effectRoundrobinMultiplier)+prop.segmentsAngleOffset,end:((start+prop.amargin)*prop.effectRoundrobinMultiplier)+prop.segmentsAngleOffset,anticlockwise:true});}
var path=RG.SVG.create({svg:this.svg,type:'path',parent:segment_group,attr:{d:'{1} {2} z'.format(arcPath,arcPath2),fill:prop.colorsSequential?prop.colors[seq]:prop.colors[j],'fill-opacity':prop.colorsOpacity,stroke:prop.colorsStroke,'stroke-width':prop.linewidth,'data-tooltip':(!RG.SVG.isNull(prop.tooltips)&&prop.tooltips.length)?prop.tooltips[i]:'','data-centerx':cx,'data-centery':cy,'data-index':i,'data-subindex':j,'data-value':this.data[i][0][j],'data-start-angle':start+prop.amargin+prop.segmentsAngleOffset,'data-end-angle':end-prop.amargin+prop.segmentsAngleOffset,'data-radius':radius,'data-radius-inner':prevRadius,'data-sequential':seq}});this.angles.push({object:this,element:path});this.angles2[i].push({object:this,element:path});if(prop.tooltips&&prop.tooltips[seq]){if(prop.tooltipsEvent!=='mousemove'){prop.tooltipsEvent='click';}
(function(index,group,seq,obj)
{path.addEventListener(prop.tooltipsEvent,function(e)
{obj.removeHighlight();RG.SVG.tooltip({object:obj,index:index,group:group,sequentialIndex:seq,text:prop.tooltips[seq],event:e});obj.highlight(e.target);var highlight=RG.SVG.REG.get('highlight');if(prop.tooltipsEvent==='mousemove'){highlight.style.cursor='pointer';}},false);if(prop.tooltipsEvent==='click'){path.addEventListener('mousemove',function(e)
{e.target.style.cursor='pointer';},false);}}(j,i,seq,this));}
var prevRadius=radius;}
seq--}else{var radius=(this.data[i][0]/this.scale.max)*this.radius*prop.effectGrowMultiplier,cx=this.centerx+(explosion[0]*prop.effectRoundrobinMultiplier),cy=this.centery+(explosion[1]*prop.effectRoundrobinMultiplier);var arcPath=RG.SVG.TRIG.getArcPath2({cx:cx,cy:cy,r:radius,start:((start+prop.amargin)*prop.effectRoundrobinMultiplier)+prop.segmentsAngleOffset,end:((end-prop.amargin)*prop.effectRoundrobinMultiplier)+prop.segmentsAngleOffset,anticlockwise:false});var path=RG.SVG.create({svg:this.svg,type:'path',parent:group,attr:{d:'{1} z'.format(arcPath),fill:prop.colorsSequential?prop.colors[i]:prop.colors[0],'fill-opacity':prop.colorsOpacity,stroke:prop.colorsStroke,'stroke-width':prop.linewidth,'data-tooltip':(!RG.SVG.isNull(prop.tooltips)&&prop.tooltips.length)?prop.tooltips[i]:'','data-centerx':cx,'data-centery':cy,'data-index':i,'data-value':this.data[i][0],'data-start-angle':start+prop.amargin+prop.segmentsAngleOffset,'data-end-angle':end-prop.amargin+prop.segmentsAngleOffset,'data-radius':radius,'data-sequential':seq}});this.angles.push({object:this,element:path});this.angles2[i].push({object:this,element:path});if(prop.tooltips&&prop.tooltips[i]){if(prop.tooltipsEvent!=='mousemove'){prop.tooltipsEvent='click';}
(function(index,group,seq,obj)
{path.addEventListener(prop.tooltipsEvent,function(e)
{obj.removeHighlight();RG.SVG.tooltip({object:obj,index:index,group:index,sequentialIndex:seq,text:prop.tooltips[index],event:e});obj.highlight(e.target);var highlight=RG.SVG.REG.get('highlight');if(prop.tooltipsEvent==='mousemove'){highlight.style.cursor='pointer';}},false);if(prop.tooltipsEvent==='click'){path.addEventListener('mousemove',function(e)
{e.target.style.cursor='pointer';},false);}}(i,i,seq,this));}}
start+=radians;}};this.redrawRose=function()
{};this.drawLabels=function()
{if(prop.scaleVisible){if(!document.getElementById('rgraph_rose_scale_labels_'+this.uid)){var group=RG.SVG.create({svg:this.svg,type:'g',parent:this.svg.all,attr:{id:'rgraph_rose_scale_labels_'+this.uid}});}else{var group=document.getElementById('rgraph_rose_scale_labels_'+this.uid);}
for(var i=0;i<this.scale.labels.length;++i){var x=this.centerx,y=this.centery-(this.radius/this.scale.labels.length*(i+1));RG.SVG.text({object:this,svg:this.svg,parent:group,tag:'labels.scale',text:this.scale.labels[i],x:x,y:y,halign:'center',valign:'center',background:'rgba(255,255,255,0.7)',padding:2,size:typeof prop.scaleSize==='number'?prop.scaleSize:prop.textSize-2,color:prop.scaleColor||prop.textColor,bold:typeof prop.scaleBold==='boolean'?prop.scaleBold:prop.textBold,italic:typeof prop.scaleItalic==='boolean'?prop.scaleItalic:prop.textItalic,font:prop.scaleFont||prop.textFont});}
var str=RG.SVG.numberFormat({object:this,num:this.scale.min.toFixed(prop.scaleDecimals),prepend:prop.scaleUnitsPre,append:prop.scaleUnitsPost,point:prop.scalePoint,thousand:prop.scaleThousand,formatter:prop.scaleFormatter});RG.SVG.text({object:this,svg:this.svg,parent:group,tag:'labels.scale',text:str,x:this.centerx,y:this.centery,halign:'center',valign:'center',background:'rgba(255,255,255,0.7)',padding:2,size:typeof prop.scaleSize==='number'?prop.scaleSize:prop.textSize-2,color:prop.scaleColor||prop.textColor,bold:typeof prop.scaleBold==='boolean'?prop.scaleBold:prop.textBold,italic:typeof prop.scaleItalic==='boolean'?prop.scaleItalic:prop.textItalic,font:prop.scaleFont||prop.textFont});}
var halign;if(!document.getElementById('rgraph_rose_circular_labels_'+this.uid)){var group=RG.SVG.create({svg:this.svg,type:'g',parent:this.svg.all,attr:{id:'rgraph_rose_circular_labels_'+this.uid}});}else{var group=document.getElementById('rgraph_rose_circular_labels_'+this.uid);}
if(typeof prop.labelsSize!=='number'){prop.labelsSize=prop.textSize+4;}
for(var i=0;i<prop.labels.length;++i){if(prop.variant==='non-equi-angular'){var angle=((Number(this.angles2[i][0].element.getAttribute('data-end-angle'))-Number(this.angles2[i][0].element.getAttribute('data-start-angle')))/2)+Number(this.angles2[i][0].element.getAttribute('data-start-angle'))-RG.SVG.TRIG.HALFPI;}else{var angle=(((RG.SVG.TRIG.TWOPI/prop.labels.length))*i)-RG.SVG.TRIG.HALFPI+prop.labelsAngleOffset+(RG.SVG.TRIG.TWOPI/(2*prop.labels.length));}
var endpoint=RG.SVG.TRIG.getRadiusEndPoint({r:this.radius+prop.labelsRadialMargin,angle:angle});var explosion=this.getExploded({index:i,start:Number(this.angles2[i][0].element.getAttribute('data-start-angle'))-RG.SVG.TRIG.HALFPI,end:Number(this.angles2[i][0].element.getAttribute('data-end-angle'))-RG.SVG.TRIG.HALFPI});endpoint[0]+=this.centerx+explosion[0];endpoint[1]+=this.centery+explosion[1];if(ma.round(endpoint[0])>this.centerx){halign='left';}else if(ma.round(endpoint[0])===this.centerx){halign='center';}else{halign='right';}
RG.SVG.text({object:this,svg:this.svg,parent:group,tag:'labels',text:typeof prop.labels[i]==='string'?prop.labels[i]:'',x:endpoint[0],y:endpoint[1],halign:halign,valign:'center',background:'rgba(255,255,255,0.7)',padding:2,size:typeof prop.labelsSize==='number'?prop.labelsSize:prop.textSize,color:prop.labelsColor||prop.textColor,bold:typeof prop.labelsBold==='boolean'?prop.labelsBold:prop.textBold,italic:typeof prop.labelsItalic==='boolean'?prop.labelsItalic:prop.textItalic,font:prop.labelsFont||prop.textFont});}};this.highlight=function(path)
{var centerx=path.getAttribute('data-centerx'),centery=path.getAttribute('data-centery'),radius=path.getAttribute('data-radius'),radiusInner=path.getAttribute('data-radius-inner'),start=path.getAttribute('data-start-angle'),end=path.getAttribute('data-end-angle');var arcPath=RG.SVG.TRIG.getArcPath3({cx:centerx,cy:centery,r:radius,start:start,end:end,lineto:true});var arcPath_array=RG.SVG.TRIG.getArcPath3({cx:centerx,cy:centery,r:radius,start:start,end:end,lineto:true,array:true});if(radiusInner){var arcPath2=RG.SVG.TRIG.getArcPath3({cx:centerx,cy:centery,r:radiusInner,start:end,end:start,lineto:true,anticlockwise:true});}else{arcPath2=' L {1} {2}'.format(centerx,centery);}
var highlight=RG.SVG.create({svg:this.svg,parent:this.svg.all,type:'path',attr:{d:'M {1} {2} '.format(arcPath_array[1],arcPath_array[2])+arcPath+' '+arcPath2+' z',fill:prop.highlightFill,stroke:prop.highlightStroke,'stroke-width':prop.highlightLinewidth},style:{pointerEvents:'none'}});if(prop.tooltipsEvent==='mousemove'){highlight.addEventListener('mouseout',function(e)
{highlight.parentNode.removeChild(highlight);RG.SVG.hideTooltip();RG.SVG.REG.set('highlight',null);},false);}
RG.SVG.REG.set('highlight',highlight);};this.parseColors=function()
{if(!Object.keys(this.originalColors).length){this.originalColors={colors:RG.SVG.arrayClone(prop.colors),highlightFill:RG.SVG.arrayClone(prop.highlightFill)}}
var colors=prop.colors;if(colors){for(var i=0;i<colors.length;++i){colors[i]=RG.SVG.parseColorRadial({object:this,color:colors[i]});}}
prop.highlightFill=RG.SVG.parseColorRadial({object:this,color:prop.highlightFill});};this.getMaxValue=function()
{var max=0;if(prop.variant==='non-equi-angular'){for(var i=0;i<this.data.length;++i){if(!RG.SVG.isNull(this.data[i])){if(typeof this.data[i][0]==='number'){max=ma.max(max,this.data[i][0]);}else if(typeof this.data[i][0]==='object'){max=ma.max(max,RG.SVG.arraySum(this.data[i][0]));}}}}else{for(var i=0;i<this.data.length;++i){if(!RG.SVG.isNull(this.data[i])){if(typeof this.data[i]==='number'){max=ma.max(max,this.data[i]);}else if(typeof this.data[i]==='object'){max=ma.max(max,RG.SVG.arraySum(this.data[i]));}}}}
this.max=max;};this.getRadius=function(value)
{return((value-prop.scaleMin)/(this.scale.max-prop.scaleMin))*this.radius;};this.roundRobin=function()
{};this.on=function(type,func)
{if(type.substr(0,2)!=='on'){type='on'+type;}
RG.SVG.addCustomEventListener(this,type,func);return this;};this.exec=function(func)
{func(this);return this;};this.removeHighlight=this.hideHighlight=function()
{var highlight=RG.SVG.REG.get('highlight');if(highlight){highlight.setAttribute('fill','transparent');highlight.setAttribute('stroke','transparent');highlight=null;RG.SVG.REG.set('highlight',null);}};this.getExploded=function(opt)
{var index=opt.index,start=opt.start,end=opt.end,exploded=prop.exploded,explodedX,explodedY;if(typeof exploded==='object'&&typeof exploded[index]==='number'){explodedX=ma.cos(((end-start)/2)+start)*exploded[index];explodedY=(ma.sin(((end-start)/2)+start)*exploded[index]);}else if(typeof exploded==='number'){explodedX=ma.cos(((end-start)/2)+start)*exploded;explodedY=ma.sin(((end-start)/2)+start)*exploded;}else{explodedX=0;explodedY=0;}
return[explodedX,explodedY];};this.grow=function(opt)
{var obj=this,opt=arguments[0]||{},frame=-1,frames=opt.frames||60,callback=opt.callback||function(){};prop.effectGrowMultiplier=0.01;this.draw();function iterator()
{++frame;var multiplier=RG.SVG.FX.getEasingMultiplier(frames,frame);prop.effectGrowMultiplier=multiplier;obj.drawRose();if(frame>=frames){callback(obj);}else{RG.SVG.FX.update(iterator);}}
iterator();return this;};this.roundrobin=function(opt)
{var obj=this,opt=arguments[0]||{},frame=-1,frames=opt.frames||60,callback=opt.callback||function(){};prop.effectRoundrobinMultiplier=0.01;this.draw();function iterator()
{++frame;var multiplier=RG.SVG.FX.getEasingMultiplier(frames,frame);prop.effectRoundrobinMultiplier=multiplier;obj.drawRose();if(frame>=frames){callback(obj);}else{RG.SVG.FX.update(iterator);}}
iterator();return this;};for(i in conf.options){if(typeof i==='string'){this.set(i,conf.options[i]);}}};return this;})(window,document);
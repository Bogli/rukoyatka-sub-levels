/**
 * Created with JetBrains PhpStorm.
 * User: Admin
 * Date: 05.10.13
 * Time: 0:02
 * To change this template use File | Settings | File Templates.
 */
function reByildMenu(block,rebuildSub){
    var rebuildSub = rebuildSub || false;
//    alert('hello');
//    alert('rebuild='+rebuild);
    $(block).show();
    var cnt_n = $(block+">ul>li").length;
//    alert(cnt_n);
    var allWidth = parseInt($(block).outerWidth(true));//необходимая ширина
//    alert(allWidth);
    var realWidth = getMinWidth(block,cnt_n);
//        alert(realWidth);
    var widthElem = parseInt((allWidth-realWidth)/cnt_n);//добавить к ширине елемента
//    alert('widthElem='+widthElem+' cnt_n='+cnt_n);
    resizeMenu(block,cnt_n,widthElem);//добавляем падинг
//    alert('hello');
    var realWidth = getRealWidth(block,cnt_n);//ширина после изменений
//    alert(realWidth);
    var raznicaWidth = allWidth - realWidth;//разница
//    alert('raznicaWidth='+raznicaWidth+' '+' realWidth='+realWidth);

    var widthElemLast = parseInt($(block+">ul>li:eq("+(cnt_n-1)+")>a").css('width'))+raznicaWidth;
//    alert(widthElemLast);
    $(block+">ul>li:eq("+(cnt_n-1)+")>a").css('width',widthElemLast+'px');
    $(block+">ul>li:eq("+(cnt_n-1)+")>a>span").css('width',widthElemLast+'px');

    if(rebuildSub){
        rebuildSubLevelMenu(block);
        rebuildSubLevelMenuForStolb(block);
        rebuildSubLevelMenuForWidth(block);
    }
}
function getMinWidth(block,cnt_n){
    var realWidth = 0,elemWidth = 0,heightElem = 0;
    var j;
    for(var i=0;i<cnt_n;i++){
        $(block+">ul>li:eq("+i+")>a>span").css('width','1px');
        heightElem = parseInt($(block+">ul>li:eq("+i+")>a>span").css('height'));
//        alert('do='+heightElem);
        if(heightElem>39){
            for(j=1;j<200;j++){
                $(block+">ul>li:eq("+i+")>a>span").css('width',j+'px');
                heightElem = parseInt($(block+">ul>li:eq("+i+")>a>span").css('height'));
                if(heightElem<40) j=400;
            }
        }
//        alert('posle='+heightElem);
        realWidth = realWidth + parseInt($(block+">ul>li:eq("+i+")").outerWidth(true));

        elemWidth = parseInt($(block+">ul>li:eq("+i+")>a").css('width'));
//        alert($(block+">ul>li:eq("+i+")>a").css('width'));
        $(block+">ul>li:eq("+i+")>a").css('width',elemWidth+'px');
        $(block+">ul>li:eq("+i+")>a>span").css('width',elemWidth+'px');
    }
    return realWidth;
}
function getRealWidth(block,cnt_n){
    var realWidth = 0,elemWidth = 0;
    for(i=0;i<cnt_n;i++){
        realWidth = realWidth + parseInt($(block+">ul>li:eq("+i+")").outerWidth(true));
    }
    return realWidth;
}
function resizeMenu(block,cnt_n,width){
    var elemWidth = 0;
    for(i=0;i<cnt_n;i++){
        elemWidth = parseInt($(block+">ul>li:eq("+i+")>a").css('width'));
        $(block+">ul>li:eq("+i+")>a").css('width',(elemWidth+width)+'px');
        $(block+">ul>li:eq("+i+")>a>span").css('width',(elemWidth+width)+'px');
    }
}
//Перещот висоти подменю для корекности випадения елементов
function peshotHover(block){
    $(block).css('height','auto');
    var cnt_n = $(block+">li").length;
//    alert(cnt_n);
    var realheight = 0;
    for(i=0;i<cnt_n;i++){
        realheight = realheight + parseInt($(block+">li:eq("+i+")").outerHeight(true));
//        alert('realheight='+realheight+' i='+i);
    }
    $(block).css('height','0');
    el = $('head').html();
//    alert(el);
    el += '<style type="text/css">.horizontalMenu>li:hover>ul'+block+'{height: '+realheight+'px !important;}</style>';
    $('head').html(el);
}

function rebuildSubLevelMenu(block){
    var cnt_n_ul = $(block+">ul>li>ul").length;
    if(cnt_n_ul==0) return false;
    var len_li = 0, j,maxWidth = 0,widthA = 0,realWidth = 0;
    var elem_li,heightUl=0;

    for(var i=0;i<cnt_n_ul;i++){
        len_li = $(block+">ul>li>ul:eq("+i+")>li").length;
//        alert(len_li);
        maxWidth = 0;
        realWidth = 0;
        //визначається максимальна ширина ссилки
        $(block+">ul>li>ul:eq("+i+")").show();
        for(j=0;j<len_li;j++){
            elem_li = block+">ul>li>ul:eq("+i+")>li:eq("+j+")";
            widthA = parseInt($(elem_li + '>a').outerWidth(true));
            if(widthA>maxWidth) maxWidth = widthA;
        }

        //общитуем ширину для подуровней ul і li
        if(maxWidth>0){
            realWidth = maxWidth+10;
            if(maxWidth>220) maxWidth = 220;
        }
        $(block+">ul>li>ul:eq("+i+")>li").css('width',maxWidth+'px');
        $(block+">ul>li>ul:eq("+i+")>li>a").css('whiteSpace','normal');
        if(len_li>20){
            if(len_li>20 && len_li<=40){
//                alert('20-40');
                realWidth = (maxWidth+10)*2;
            }else if(len_li>40 && len_li<=60){
//                alert('40-60');
                realWidth = (maxWidth+10)*3;
            }
        }
        //устанавливаэм ранее перещитаную ширину
        $(block+">ul>li>ul:eq("+i+")").css('width',realWidth+'px');

        //перемещаем подуровень посередине относительно главного уровня
        if(i>0 && i<cnt_n_ul-1 && realWidth>0){
//            alert(i);
            realWidth = realWidth + 30;
            var withMainLi = parseInt($(block+">ul>li:eq("+i+")").outerWidth(true));
            var left = -1 * parseInt(realWidth/2) + parseInt(withMainLi/2);
            $(block+">ul>li>ul:eq("+i+")").css('left',left+'px');
        }
        //скриваем подуровень
        $(block+">ul>li>ul:eq("+i+")").hide();
    }
}
function rebuildSubLevelMenuForWidth(block){
    var cnt_n_ul = $(block+">ul>li>ul").length;
    if(cnt_n_ul==0) return false;
    var len_li = 0, j,maxWidth = 0,widthA = 0,realWidth = 0;
    var elem_li,heightUl=0;
    var headStr = '<style type="text/css">';

    for(var i=0;i<cnt_n_ul;i++){
        len_li = $(block+">ul>li>ul:eq("+i+")>li").length;
//        alert(len_li);
        maxWidth = 0;
        realWidth = 0;
        //визначається максимальна ширина ссилки
        $(block+">ul>li>ul:eq("+i+")").show();

        //обраховується висота підрівнів
        heightUl = parseInt($(block+">ul>li>ul:eq("+i+")").css('height'));
//        alert(heightUl);
        headStr += 'menu.catalog-category>ul>li:nth-child('+(i+1)+'):hover>ul{height: '+heightUl+'px !important;}'

    }

    $(block+">ul>li>ul>li>a").css('whiteSpace','normal');
    //пічля всіх перерахунків ховаемо підрівень
    $(block+">ul>li>ul").css('height','0');
    headStr += 'menu.catalog-category>ul>li>ul{';
    headStr += '-webkit-transition: all 300ms ;-moz-transition: all 300ms ;-ms-transition: all 300ms ;-o-transition: all 300ms ;transition: all 300ms ;';
    headStr += '}</style>';
    $('head').append(headStr);
}
function rebuildSubLevelMenuForStolb(block){
    var cnt_n_ul = $(block+">ul>li>ul").length;
    var len_li,widthUl,j,blockText,liBlock;
    for(var i=0;i<cnt_n_ul;i++){
        widthUl = $(block+">ul>li>ul:eq("+i+")").outerWidth(true);
//        alert(widthUl);
        if(widthUl>490){
            len_li = $(block+">ul>li>ul:eq("+i+")>li").length;
            if(widthUl<720){
                liBlock = block+">ul>li>ul:eq("+i+")>li";
                blockText = pereroshotUlLI(liBlock,len_li,2);
                $(block+">ul>li>ul:eq("+i+")").html(blockText);
            }else{
                liBlock = block+">ul>li>ul:eq("+i+")>li";
                blockText = pereroshotUlLI(liBlock,len_li,3);
                $(block+">ul>li>ul:eq("+i+")").html(blockText);
            }
        }
    }
}
function pereroshotUlLI(liBlock,len_li,cntShow){
    var cntTmp = parseFloat(len_li/cntShow).toFixed(0);
//    alert('cntTmp='+cntTmp);
    var blockTmp = '',elem_li,blockText = '';
    var start,end;
    for(var i=0;i<cntShow;i++){
        start = i*cntTmp;
        end = (i+1)*cntTmp;
        blockTmp = getLiBlocks(liBlock,start,end);
        blockText += '<ul>' + blockTmp +'</ul>';
    }
    return blockText;
}
function getLiBlocks(liBlock,start,end){
    var blockTmp='',elem_li,liWidth;
    for(var j=start;j<end;j++){
        elem_li = liBlock+":eq("+j+")";
        if(undefined != $(elem_li).html()){
            liWidth = $(elem_li).css('width');
            blockTmp += '<li style="width: ' + liWidth + '">' + $(elem_li).html() +'</li>';
        }
    }
    return blockTmp;
}
var block;
function chekTagsMenu(blockElem){
    block = blockElem;
    var len = $(block+' li').length;
    var widthElem,elem;
    var text,html;
    for(var i=0;i<len;i++){
        elem = block + ' li:eq(' + i + ')';
        widthElem = parseInt($(elem+' .tags-main-text span').outerWidth(true));
//        alert(widthElem);
        if(182<widthElem){
            $(elem + ' .tags-one').addClass('tags-big');
            text = $(elem+' .tags-main-text span').text();
            html = $(elem+' .tags-main-text span').html();
            $(elem+' .tags-main-text span').html(text);
            $(elem + ' .tags-one').attr('onclick','showTagsBig('+i+')');
            $(elem + ' .tags-all').html(html);
        }else{
            $(elem + ' .tags-one').removeClass('tags-big-sel');
        }
    }
}
function showTagsBig(i){
    var elem = block + ' li:eq(' + i + ')';
    $(elem + ' .tags-one').toggleClass('tags-big-sel');
    $(elem + ' .tags-all').toggle(100);
}
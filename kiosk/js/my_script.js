$(document).ready(function(){
    // 전체 상품 목록
    var goodList = [{name:'아메리카노',price:4500,src:'ame.png',desc:'진한 에스프레소의 맛과 향을 부드럽게 즐길 수 있는 아메리칸 스타일의 커피'},
                {name:'프리미엄 블렌드 딥라떼',price:5500,src:'deep.png',desc:'풍성한 우유 거품 위에 프리미엄 블렌드 리스트레또 샷이 더해져 깊은 커피 풍미를 느낄 수 있는 라떼'},
                {name:'콜드브루',price:5000,src:'cold.png',desc:'콜드브루 전용 블렌드를 상온의 물로 오랜시간 추출해 달콤한 산미와 부드러운 바디감이 살아있는 커피'},
                {name:'카페모카',price:6000,src:'mocha.png',desc:'진한 에스프레소와 우유, 달콤 쌉싸름한 초콜릿이 어우러진 커피'},
                {name:'카푸치노',price:5000,src:'cappu.png',desc:'에스프레소에 실키하고 폭신폭신한 우유 거품이 풍부하게 더해진 커피'},
                {name:'아포가토',price:8000,src:'affo.png',desc:'바닐라 아이스크림과 리스트레또 더블샷이 어우러져 부드럽고 진한 맛의 아포가토'},
                {name:'딸기듬뿍라떼',price:6000,src:'straw.png',desc:'딸기를 듬뿍 담은 베이스에 부드러운 우유의 풍미를 더한 과일 라떼'},
                {name:'우리고구마라떼',price:6000,src:'potato.png',desc:'국내산 100% 고구마에 따뜻한 우유를 더해 고소하게 즐기는 라떼'},
                {name:'제주말차라떼',price:6500,src:'jeju.png',desc:'제주산 말차 파우더로 만들어 깊고 진한 말차 본연의 풍미를 살린 라떼'},
                {name:'핫/아이스초코',price:6000,src:'choco.png',desc:'진한 초콜렛과 우유가 어우러져 달콤한 초콜릿 음료'},
                {name:'복숭아얼그레이',price:5500,src:'earl.png',desc:'달콤한 복숭아와 얼그레이의 베르가못 향의 조화, 깔끔하면서도 달콤한 티베리에이션 음료'},
                {name:'홍자몽차',price:6000,src:'red.png',desc:'자몽과일 특유의 달콤 쌉싸름한 맛을 즐길 수 있는 과일차'},
                {name:'캐모마일',price:4500,src:'chamo.png',desc:'캐모마일 꽃잎을 그대로 말려 노란색의 향긋한 꽃향이 그대로 살아 있는 허브차'},
                {name:'페퍼민트',price:4500,src:'paper.png',desc:'입안 가득 깔끔한 청량감으로 기분까지 상쾌한 허브차'},
                {name:'딸기 생크림',price:6000,src:'cream.png',desc:'부드러운 생크림과 달콤한 딸기 필링이 샌딩된 조각 케이크'},
                {name:'뉴욕 치즈 케이크',price:6000,src:'cake.png',desc:'부드럽고 촉촉한 식감과 진한 크림 치즈 맛의 구움 치즈케이크'},
                {name:'고구마 치즈 케이크',price:7000,src:'cheese.png',desc:'달콤하고 부드러운 고구마 무스에 진한 치즈가 어우러진 고구마 케이크'},
                {name:'티라미수 쏘스윗박스',price:10000,src:'tiramisu.png',desc:'마스카포네 치즈무스와 커피시럽의 촉촉한 시트, 진한 발로나 코코아 파우더가 조화로운 오리지널 티라미스 케이크'},
                {name:'콘치즈 데니쉬',price:5000,src:'danish.png',desc:'데니쉬 시트에 고소하고 달콤한 스위트콘과 짭쪼름한 햄, 치즈가 가득 들어있어 단짠의 매력이 있는 데니쉬 제품'},
                {name:'크림치즈 스콘',price:3000,src:'scone.png',desc:'버터향이 가득한 촉촉한 비스켓 속 크림치즈가 들어간 풍미 가득한 비스켓'},
                {name:'더블 초코 마카롱',price:3500,src:'macaron.png',desc:'진한 초콜릿 가나슈를 토핑 후 초콜릿 버터크림에 초코진주 크런치를 토핑하여 더욱 진한 초콜릿 맛과 다양한 식감까지 느낄 수 있는 뚱카롱'},
                {name:'아이스크림 크로플',price:7500,src:'croffle.png',desc:'겉바속촉, 펄슈가를 토핑한 크로플에 달달한 아이스크림을 곁들인 제품'},
                ];

    // 현재 보고 있는 상품
    var currentGood = {};
    
    // 주문목록
    var cart = {
            orders:new Array(),
            total:0,
            sumOrderTotal:function(){
                this.total=0;
                for(v of this.orders){
                    this.total += v.price;
                }
                return this.total;
            }
    };

    // 금액 콤마로 구분
    $.numberWithCommas = function(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    // 토스트 메세지
    function createToast(msg) {
        new Audio('sound/cancel.mp3').play();
        $.toast(msg, {
          duration: 2000,
          type: 'info'
        });
    }

    // 토스트 메세지 설정
    $.toast.config.align = 'center';
    $.toast.config.width = 400;
    $.toast.config.closeForStickyOnly = false;

    // 드래그 전 이미지 위치
    var imgPos = $('div.detail img').offset();

    // 타이머
    var timer;

    window.onblur = stopInterval;
    window.onfocus = startInterval;

    function startInterval() {
        if(timer==null) {
            // 다른 에니메이션을 방해하지 않도록 stop(true)를 걸지 않음. 타이머의 우선순위는 낮음.
            timer = setInterval(function(){$('div.detail img').fadeOut().fadeIn().fadeOut().fadeIn();}, 5000);
        }
    }

    function stopInterval() {
        if(timer) {
            clearInterval(timer);
            timer = null;
        }
    }

    // 상품 이미지 드래그
    $('div.detail img').draggable({
        containment: ".wrapper",
        start:function(event,ui){
            imgPos = $(this).offset();
            $(this).stop(true,true);
            stopInterval();
        },
        stop:function(event,ui){
            var imgWidth = $(this).width();
            var imgHeight = $(this).height();
            var dest = $('div.cart i').offset();
            var destWidth = $('div.cart i').width();
            var destHeight = $('div.cart i').height();
            $(this).css({top:0,left:0});

            // 주문목록 영역 안으로 들어갔을 때
            if(ui.offset.top+imgHeight/1.5>dest.top) {
                cart.orders[cart.orders.length]=$.extend(true, {}, currentGood);
                cart.sumOrderTotal();
                var $order = $('<div class=\"order\">- '+currentGood.name+' '+$.numberWithCommas(parseInt(currentGood.price))+'원 <img src=\"images/x.webp\"></div>');
                $order.appendTo('div.cart').hide().fadeIn();
                new Audio('sound/add.mp3').play();
                $(this).stop(true).animate({top:dest.top-imgPos.top-(destHeight/2),left:dest.left-imgPos.left-(imgWidth/2)+(destWidth/2),width:'10%',opacity:1},1000,'easeInOutExpo',function(){$('div.cart i').effect('shake');$(this).css({top:-1*(imgPos.top),left:0,width:'100%',opacity:0});new Audio('sound/ready.mp3').play();}).animate({top:0,opacity:1},1000,"easeOutBounce",function(){startInterval();});
            }
            else {
                startInterval();
            }
        }
    });

    // 주문 삭제 버튼 동적 이벤트 바인딩
    $(document).on('click','div.order>img',function(){
        var idx = $('div.order').index($(this).parent());
        $(this).parent().animate({opacity:0,'padding-left':'+50%'},500,function(){
            var good = cart.orders[idx].name;
            cart.orders.splice(idx,1);
            $(this).remove();
            createToast(good + '의 주문을 취소했습니다');
        });
    });

    // 상위메뉴 클릭
    $('li.menu').click(function(event){
        //$(this).not('.good').children('ul').slideToggle();
        $(event.target).not('.good').siblings('ul').slideToggle().closest('li').siblings().children('ul').slideUp();
    });

    //상품 선택
    $('li.good').hover(function(){
        var audio = new Audio('sound/ready.mp3');
        audio.play();
        var imgName = $(this).text();
        // 클릭한 상품의 정보를 검색해서 가져옴
        var arrGood = $.grep(goodList, function(e){
                        return (e.name == imgName);
                    });
        // 존재한다면 가장 먼저 검색된 요소만
        if(arrGood.length>0){
            currentGood.name=arrGood[0].name;
            currentGood.price=arrGood[0].price;
            //currentGood.ea=arrGood[0].ea;

            $(this).html('<span>☞ </span>'+currentGood.name);
            $(this).css({color:'#fff'});
            $('li.good').not(this).children('span').remove();
            $('li.good').not(this).css({color:'#000'});
            $(this).hide().fadeIn(300);

            stopInterval();
            $('div.detail img').stop(true).attr('src','images/'+arrGood[0].src).css({top:-1*(imgPos.top),left:0,width:'100%',opacity:0}).animate({top:0,opacity:1},1000,"easeOutBounce",function(){});
            $('div.detail .comment').stop(true).html('<b>'+arrGood[0].name+'</b> - '+$.numberWithCommas(parseInt(arrGood[0].price))+'원<br>'+arrGood[0].desc).show();
            startInterval();
        }
    },function(){return false;});

    // 상품 이미지 더블클릭
    $('div.detail img').dblclick(function(){
        imgPos = $(this).offset();
        var imgWidth = $(this).width();
        var imgHeight = $(this).height();
        var dest = $('div.cart i').offset();
        var destWidth = $('div.cart i').width();
        var destHeight = $('div.cart i').height();

        cart.orders[cart.orders.length]=$.extend(true, {}, currentGood);
        cart.sumOrderTotal();
        stopInterval();
        var $order = $('<div class=\"order\">- '+currentGood.name+' '+$.numberWithCommas(parseInt(currentGood.price))+'원 <img src=\"images/x.webp\"></div>');
        $order.appendTo('div.cart').hide().fadeIn();
        new Audio('sound/add.mp3').play();
        $(this).stop(true).animate({top:dest.top-imgPos.top-(destHeight/2),left:dest.left-imgPos.left-(imgWidth/2)+(destWidth/2),width:'10%',opacity:1},1000,'easeInOutExpo',function(){$('div.cart i').effect('shake');$(this).css({top:-1*(imgPos.top),left:0,width:'100%',opacity:0});new Audio('sound/ready.mp3').play();}).animate({top:0,opacity:1},1000,"easeOutBounce",function(){startInterval();});
    });

    //결제 버튼 클릭
    $('.payment .btn').click(function(){
        new Audio('sound/hi.mp3').play();
        $("#result").text('총 결제금액은 '+$.numberWithCommas(cart.sumOrderTotal())+'원입니다');
        $("#result").dialog({width:300,my: 'center', at: 'center',show: { effect: "blind", duration: 800 }});

    });
});
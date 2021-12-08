// 導覽列
var course_type_data=["所有課程","科技","音樂","攝影","藝術","設計","行銷","投資理財"];

var vm1=new Vue({
  el: "#app1",
  data: {
    logo_reverse: false,
    course_types: course_type_data
  }
});


  // 探索課程
$(".discover_course").mouseover(function(){
  $(".nav").addClass("reverse");
  vm1.logo_reverse=true;
});

$(".discover_course").mouseleave(function(){
  $(".nav").removeClass("reverse");
  vm1.logo_reverse=false;
});

  // 搜尋
$(".nav_item.search").click(function(){
  $(this).addClass("on_search");
});

$(".search_cancel").click(function(e){
  e.stopPropagation();
  $(".nav_item.search").removeClass("on_search");
  $(".nav_item.search input").val("");
});

  // 滾動下來時的變化
var nav_height=$(".nav").height();
$(window).scroll(function(){
  if(window.scrollY>nav_height){
    $(".nav").addClass("reverse");
    vm1.logo_reverse=true;
    
  }else{
    $(".nav").removeClass("reverse");
    vm1.logo_reverse=false;
  }
});




// slide資料
var slide_show=[
  {
    url: "https://storage.googleapis.com/hh-static/banner-mm-economic-20190429/banner-M%E5%B9%B3%E6%96%B9-b.jpg",
    slogan: "看懂財經M平方，看懂財經運行"
  },
  {
    url: "https://storage.googleapis.com/hh-static/banner-chatbot-20190429/chatbot_banner-b.png",
    slogan: "突破算法の後社群神器"
  },
  {
    url: "https://storage.googleapis.com/hh-static/banner-reading-books/banner-reading-books-L.jpg",
    slogan: "專為忙碌現代人打造的閱讀心法"
  },
  {
    url: "https://storage.googleapis.com/hh-static/banner-novel-20190422/banner-novel-L.jpg",
    slogan: "從招式進階到文字內力"
  },
];

var slide_length=slide_show.length;
slide_show.push(slide_show[0]);
slide_show.unshift(slide_show[slide_length-1]);

// Vue for Slide_show

var vm2=new Vue({
  el: "#app2",
  data:{
    slides: slide_show,
    main_slogan: "學那些學校不會教的事"
  }
});



// slide_show

var slide_count=1;
function slideRight(){
  if(slide_count>slide_length){
    slide_count=1;
    $(".pages").css("transition-duration","0s");
    $(".slide_slogans").css("transition-duration","0s");
    $(".pages").css("left",-100*slide_count+"%");
    $(".slide_slogans").css("left",-100*slide_count+"%");
    slide_count+=1;
    setTimeout(function(){
      $(".pages").css("transition-duration","0.5s");
      $(".slide_slogans").css("transition-duration","0.5s");
      $(".pages").css("left",-100*slide_count+"%");
      $(".slide_slogans").css("left",-100*slide_count+"%");
    },1);   
  }else{
    slide_count+=1;
    $(".pages").css("left",-100*slide_count+"%");
    $(".slide_slogans").css("left",-100*slide_count+"%");
  }
}

$(".right").click(function(){
  if(slide_count>slide_length){
    slide_count=1;
    $(".pages").css("transition-duration","0s");
    $(".slide_slogans").css("transition-duration","0s");
    $(".pages").css("left",-100*slide_count+"%");
    $(".slide_slogans").css("left",-100*slide_count+"%");
    slide_count+=1;
    setTimeout(function(){
      $(".pages").css("transition-duration","0.5s");
      $(".slide_slogans").css("transition-duration","0.5s");
      $(".pages").css("left",-100*slide_count+"%");
      $(".slide_slogans").css("left",-100*slide_count+"%");
    },1);   
  }else{
    slide_count+=1;
    $(".pages").css("left",-100*slide_count+"%");
    $(".slide_slogans").css("left",-100*slide_count+"%");
  }
});

$(".left").click(function(){
  if(slide_count<1){
    slide_count=slide_length;
    $(".pages").css("transition-duration","0s");
    $(".slide_slogans").css("transition-duration","0s");
    $(".pages").css("left",-100*slide_count+"%");
    $(".slide_slogans").css("left",-100*slide_count+"%");
    slide_count+=-1;
    setTimeout(function(){
      $(".pages").css("transition-duration","0.5s");
      $(".slide_slogans").css("transition-duration","0.5s");
      $(".pages").css("left",-100*slide_count+"%");
      $(".slide_slogans").css("left",-100*slide_count+"%");
    },10);
  }else{
    slide_count+=-1;
    $(".pages").css("left",-100*slide_count+"%");
    $(".slide_slogans").css("left",-100*slide_count+"%");
  }
});

var auto_slide;
function play_slide(){
  auto_slide=setInterval(function(){
    slideRight();
  },3000);
};

play_slide();

function stop_slide(){
  clearInterval(auto_slide);
};

$(".slide_control>.left, .slide_control>.right").mouseenter(function(){
  stop_slide();
});

$(".slide_control>.left, .slide_control>.right").mouseleave(function(){
  play_slide();
});


// 課程



var api_url={
  notify_data:"https://awiclass.monoame.com/api/command.php?type=get&name=notifydata",
  array_data: "https://awiclass.monoame.com/api/command.php?type=get&name=itemdata",
  hahow_data: "https://awiclass.monoame.com/api/command.php?type=get&name=hahowdata"
};


var vm3=new Vue({
  el: "#app3",
  data: {
    hahow_data: "載入課程中...",
    screenWidth: window.innerWidth,
  },
  mounted: function(){
    $.ajax({
      url: api_url.hahow_data,
      success: function(res){
        vm3.hahow_data=JSON.parse(res);
      }
    });
  },
  computed: {
    rate: function(){
      var progress=[];
      for(var i=0;i<this.hahow_data.length;i++){
        progress[i]=parseInt((this.hahow_data[i].numSoldTickets/this.hahow_data[i].successCriteria.numSoldTickets)*100);
      }
      return progress;
    }
  },
  methods:{
    handleResize: function(){
      this.screenWidth=window.innerWidth;
    }
  },
  created:function(){
    window.addEventListener("resize",this.handleResize);
    this.handleResize();
  },
  destroyed: function(){
    window.removeEventListener("resize",this.handleResize);
  }
});

// 使用vue.js監看螢幕大小
// data:{
//   screenWidth: window.innerWidth
// }

// 方法1
// 為甚麼要用箭頭涵式 而 一般函式寫法卻無法運作 還未理解

// mounted: function(){
//     window.onresize = () => {
//       this.screenWidth = window.innerWidth;
//     }
//   },

// 方法2
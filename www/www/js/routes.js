var routes = [
  {
    path: '/',
    url: 'index.html',
  },
{
    path: '/signup/',
    url: './pages/signup.html',
    on:{
        pageInit: function (e, page) {
          login_screen.close();
        },
        pageBeforeRemove: function (e, page){
          login_screen.open();
        },
    }
  },
  {
    path: '/userprof/',
    url: './pages/profile.html',
    on:{
        pageInit: function(e, page){
          var username = localStorage.getItem('username');
          var authorization = localStorage.getItem('authorization');
          console.log(username+ "wala or naa?");
          app.request({
          url: 'https://desolate-basin-69053.herokuapp.com/user/info/'+username ,
          type: "GET",
          contentType: 'application/json; charset=utf-8',
          dataType: "json",
          headers: {
                'Authorization' : authorization
                      },  
          success: function(data){
            // user info in userprofile.html
            $("#name").html('');
            $("#name").append('<h2>'+data.user.first_name+' '+data.user.last_name+'</h2>');
            $("#contact").html('');
            $("#contact").append(data.user.contact_number)
            $("#contact").html('');
            $("#contact").append(data.user.contact_number)
            // userName in side pannel
            $("#showuser").html('');
            $("#showuser").append(data.user.username)
            $("#bday").html('');
            $("#bday").append(moment(data.user.birth_date).format('MMMM D Y'));
            $("#gender").html('');
            $("#gender").append(data.user.gender)
          },
          error: function(data){
              alert("user is not found");
          }
     });
        }
    }
  },
  {
    path: '/form/',
    url: './pages/form.html',
  },
  {
    path: '/educational/',
    url: './pages/educational.html',
  },
  {
    path: '/english/',
    url: './pages/english.html',
  },
  {
    path: '/math/',
    url: './pages/math.html',
  },
  {
    path: '/science/',
    url: './pages/science.html',
  },
  {
    path: '/history/',
    url: './pages/history.html',
  },
  {
    path: '/fictional/',
    url: './pages/fictional.html',
  },
  {
    path: '/Adventure/',
    url: './pages/Adventure.html',
  },
  {
    path: '/Action/',
    url: './pages/Action.html',
  },
  {
    path: '/Drama/',
    url: './pages/Drama.html',
  },
  {
    path: '/Horror/',
    url: './pages/Horror.html',
  },
  {
    path: '/Mystery/',
    url: './pages/Mystery.html',
  },
  {
    path: '/Mythology/',
    url: './pages/Mythology.html',
  },
  {
    path: '/non-fictional/',
    url: './pages/non-fictional.html',
  },
  {
    path: '/biology/',
    url: '../pages/biology.html',
  },
  {
    path: '/essay/',
    url: './pages/essay.html',
  },
  {
    path: '/journalism/',
    url: './pages/journalism.html',
  },
  {
    path: '/personalNarrative/',
    url: './pages/personalNarrative.html',
  },
  {
    path: '/referenceBook/',
    url: './pages/referenceBook.html',
  },
  {
    path: '/speech/',
    url: './pages/speech.html',
  },
  {
    path: '/login/',
    url: './pages/login.html',
  },
  {
    path: '/item/',
    url: './pages/item-page.html',
  },
  {
    path: '/form-result/',
    url: './pages/form-result.html',
  },
  {
    path: '/form-add/',
    url: './pages/form-add.html',
  },
  {
    path: '/dashboard-comment/',
    url: './pages/dashboard-comment.html',
  },
  {
    path: '/homepage/',
    url: './pages/homepage.html',
  },
  // Left View Pages
  {
    path: '/left-page-1/',
    url: './pages/left-page-1.html',
  },
  {
    path: '/left-page-2/',
    url: './pages/left-page-2.html',
  },
  // Page Loaders & Router
  {
    path: '/page-loader-template7/:user/:userId/:posts/:postId/',
    templateUrl: './pages/page-loader-template7.html',
  },
  {
    path: '/page-loader-component/:user/:userId/:posts/:postId/',
    componentUrl: './pages/page-loader-component.html',
  },
   // Components
  {
    path: '/sales_activity/',
    url: './pages/sales_activity.html',
  },
  {
    path: '/action-sheet/',
    componentUrl: './pages/action-sheet.html',
  },
  {
    path: '/login-screen-page/',
    componentUrl: './pages/login-screen-page.html',
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];

function allbooks() {
  var tokens = localStorage.getItem('token');
  loops = [];
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/bookshelf/books',
    method: "GET",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    success: function (data) {
      console.log(data);
      var employee_data = "";
      for (var i = 0; i < data.book.length; i++) {

        employee_data += '<div class="col-25">';
        employee_data += '<a href="/item/" onclick="onebook(); bookindex(\'' + data.book[i].book_id + '\'); bookowner(\'' + data.book[i].owner_username + '\')">' + '<img src="' + data.book[i].book_cover + '" width="100" height="100">' + '</a>';
        employee_data += '<div class="container">' + data.book[i].title + '</div>';
        employee_data += '</div>';
      }
      $('#allbook').append(employee_data);
    }
  });
}

function recentadded() {
  var tokens = localStorage.getItem('token');
  loops = [];
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/bookshelf/books/latest',
    method: "GET",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    success: function (data) {
      console.log(data);
      var employee_data = "";
      for (var i = 0; i < data.book.length; i++) {
        employee_data += '<div class="swiper-slide">';
        employee_data += '<a href="/item/" onclick="onebook(); bookindex(\'' + data.book[i].book_id + '\'); bookowner(\'' + data.book[i].owner_username + '\')">';
        employee_data += '<img src="' + data.book[i].book_cover + '" style="width: 100%;height: 100%;">' + '</a>';
        employee_data += '</div>';
      }
      $('#new').append(employee_data);
    }
  });
}
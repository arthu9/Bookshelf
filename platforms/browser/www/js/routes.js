var routes = [
  {
    path: '/',
    url: 'index.html',
  },
  {
    path: '/signup/',
    url: './pages/signup.html',
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
    path: '/fictional/',
    url: './pages/fictional.html',
  },
  {
    path: '/non-fictional/',
    url: './pages/non-fictional.html',
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

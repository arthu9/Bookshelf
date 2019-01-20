// Dom7
// import Framework7 from 'framework7';
var $$ = Dom7;
var login_screen;

// Init App
var app = new Framework7({
  init: false,
  id: 'io.Framework7.Bookshelf',
  root: '#app',
  theme: "auto",
  routes: routes,
  on: {
    init: function () {
        console.log('App initialized');
        createLogin();
    },
    pageInit: function () {
        console.log('Page initialized');
    },
  },
  panel: {
    leftBreakpoint: 960,
  },  
});

var mainView = app.views.create('.view-left', {
  url: '/'
});

// Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/'
});

function createLogin(){
    login_screen = app.loginScreen.create({
    content:
      '<div class="login-screen">'+
    '<div class="view">'+
      '<div class="page">'+
        '<div class="page-content login-screen-content">'+
          '<div class="login-screen-title" style="color: #673ab7; font-family:cursive;"><br>'+
          'Bookshelf'+
          '<br></div>'+
          '<form id="loginform">'+
            '<div class="list">'+
              '<ul>'+
                '<li class="item-content item-input">'+
                  '<div class="item-inner">'+
                    '<div class="item-title item-label">'+
                    'Username'+
                    '</div>'+
                    '<div class="item-input-wrap">'+
                      '<input type="text" id="username" name="username" placeholder="Username" required validate>'+
                      '<span class="input-clear-button"></span>'+
                    '</div>'+
                  '</div>'+
                '</li>'+
                '<li class="item-content item-input">'+
                  '<div class="item-inner">'+
                    '<div class="item-title item-label">'+
                    'Password'+
                    '</div>'+
                    '<div class="item-input-wrap">'+
                      '<input type="password" id="password" name="password" placeholder="Password" required validate>'+
                      '<span class="input-clear-button"></span>'+
                    '</div>'+
                  '</div>'+
                '</li>'+
              '</ul>'+
            '</div>'+
            '<div class="list">'+
              '<ul>'+
                '<li>'+
                '<button type="button" class="col button button-round button-fill button-login" style="width:60%; margin-right:auto !important;margin-left:auto !important;">'+
                'Log In'+
                '</button>'+
                '</li>'+
              '</ul>'+
              '<div class="block-footer">'+
              'New to bookshelf? '+
              '<a href="#">Create an account.'+
              '</a>'+
             ' </div>'+
            '</div>'+
          '</form>'+
        '</div>'+
      '</div>'+
    '</div>'+
  '</div>',
        on: {
        opened: function () {
            console.log('Login Screen opened')
        }
        }
    });

    login_screen.open(false);
    checkLogin();


    $('.button-login').on('click', function (e) {
        var username = $("#username").val();
        var password = $("#password").val();
        if(username != '' && password !='' ){
        app.request({
            async: true, 
            url: 'https://desolate-basin-69053.herokuapp.com/login',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                'username': username,
                'password': password
                    }),
            type: "POST",
            dataType: "json",
            crossDomain: true,
            headers: {'Authorization' : 'Basic ' + btoa(username + ':' + password)},
        error: function (data) {
          app.dialog.alert('Invalid username or password!', 'Login Error');
        },

        success: function (data)  {
            app.dialog.alert('Welcome ' + username, 'Login Success');
            localStorage.setItem('token', data.token);
            localStorage.setItem('authorization', 'Basic' + btoa(username + ':' +password));
            localStorage.setItem('username', username);
            app.loginScreen.close();
        },

        complete: function (jqXHR) {
                      if (jqXHR.status == '401') {
                          console.log(jqXHR.status)
         }}

    });
        }
        else{
          app.dialog.alert('invalid username or password!', 'Login Error')
        }
    });  
}

function checkLogin(){
  var token = "";
  if (typeof(Storage) !== "undefined" && localStorage.getItem("token")!=="") {
      token = localStorage.getItem("token");
  }
  if(token){
  login_screen.close();
  }else{
  login_screen.open();
  }
}

function searchCheck(that) {
      if (that.value == "isbn_") {
          console.log(that.value);
          document.getElementById("isbn-check").style.display = "block";
          document.getElementById("author-check").style.display = "none";
          document.getElementById("title-check").style.display = "none";
      } else if (that.value == "author_") {
          console.log(that.value);
          document.getElementById("author-check").style.display = "block";
          document.getElementById("isbn-check").style.display = "none";
          document.getElementById("title-check").style.display = "none";
      } else if (that.value == "title_") {
          console.log(that.value);
          document.getElementById("title-check").style.display = "block";
          document.getElementById("author-check").style.display = "none";
          document.getElementById("isbn-check").style.display = "none";
      } else {
          document.getElementById("ifYes").style.display = "none";
      }
  }

function paymentMethod1() {
  var checkRate = document.getElementById("for-rent");

        if (checkRate.checked == true) {
            document.getElementById("price-rate").style.display = "block";
        } else {
            document.getElementById("price-rate").style.display = "none";
        }
}

function paymentMethod2() {
  var checkSale = document.getElementById("for-sale");

        if (checkSale.checked == true) {
            document.getElementById("price-sale").style.display = "block";
        } else {
            document.getElementById("price-sale").style.display = "none";
        }
}


$(document).on('page:init', function (e) {  
  // Code for About page
  var page = e.detail;
   if (page.name === 'home') {
       //getDashboard();
   }
});

$('.button-logout').on('click', function (e) {
    app.dialog.confirm('Are you sure you want to exit?','Logging Out', function () {
        localStorage.removeItem("token");
        localStorage.clear();
        checkLogin();
        //location.reload();
    });    
});


// function addbookauthor(author_name){
//   var tokens = localStorage.getItem('token');
//   alert(author_name)
//     app.request({
//       url: 'https://desolate-basin-69053.herokuapp.com/mobile/user/author_check/'+author_name,
//       contentType: 'application/json; charset=utf-8',
//       mothod: "GET",
//       crossDomain: true,
//       headers: {'x-access-token': tokens},

//       },
//   });
// }

function printhher(n,m,o,pasa){
  return '<div class="card-header">'+
        '<div class="demo-facebook-name" id="title">'+n+'</div>'+
      '</div>'+
      '<div id="cover"><img src="'+m+'"/></div>'+
      '<div class="card-content card-content-padding">'+

        '<p id="author_name">'+o+'</p>'+
        '<p class="likes">Rating: 4.5/5</p>'+
      '</div>'+
      '<div class="card-footer">'+
      '<a onclick="get_index(\''+pasa+'\');" href="/form-add/" class="link right" name="\''+pasa+'\'" id="myform1" value="\''+pasa+'\'" >Add Book</a>'+
      '</div>';
}

function get_index(pasa){
  $("a").click(function() {
    var fired_button = $(this).val();
    var index_set = localStorage.setItem('index', pasa);
  });
}

function addbook()
  {
    var price = '500';
    var method = $("#method").val();
    // var quantity = $("#quantity").val();
    var index = localStorage.getItem('index');
    var edition = JSON.parse(localStorage.getItem("stire"))[index]['edition'];
    var isbn = JSON.parse(localStorage.getItem("stire"))[index]['isbn'];
    var description = JSON.parse(localStorage.getItem("stire"))[index]['description'];
    var publisher_name = JSON.parse(localStorage.getItem("stire"))[index]['publishers'];
    var title = JSON.parse(localStorage.getItem("stire"))[index]['title'];
    var author_name = JSON.parse(localStorage.getItem("stire"))[index]['author_name'];
    var book_cover = JSON.parse(localStorage.getItem("stire"))[index]['book_cover'];
    var year = JSON.parse(localStorage.getItem("stire"))[index]['year'];
    var tokens = localStorage.getItem('token');
    var username = localStorage.getItem('username');
    var fiction =['Adventure', 'Action', 'Drama', 'Horror', 'Mystery', 'Mythology'];
    var nonFiction = ['Biography', 'Essay', 'Journalism', 'Personal Narrative', 'Reference Book', 'Speech'];
    var academics = ['English', 'History', 'Math', 'Science'];
    alert(tokens);
    var category = "";
    var genre1 = $("#genre").val();
     if (fiction.includes(genre1)) {
              var category= "Fiction";
            } else if (nonFiction.includes(genre1)) {
              var category= "Non-Fiction";
            }
            else {
              var category= "Educational";
            }

    var selectedchecktxt = $('ul input:checked').map(function(){
        return $(this).next('i').text();
      }).get();

    app.request({    
        async: true, 
        url: 'https://desolate-basin-69053.herokuapp.com/user/addbook',
        contentType: 'application/json; charset=utf-8',
        headers: {'x-access-token': tokens},
        method: "POST",
        dataType: "json",
        crossDomain: true,
        data: JSON.stringify({
            

            "isbn": isbn,
            "title": title,
            "publisher_name": publisher_name, 
            "year": year, 
            "current_user": username ,
            "author_name": author_name,
            "quantity": $("#quantity").val(),
            "method": selectedchecktxt,
            "price": price,
            "book_cover": book_cover,
            "genre": $("#genre").val(),
            "category": category,
            "description": description
          }),

        success: function(data) {
        console.log(data);
        alert(title+ " book is added")
        },
        
        error: function (data) {
        console.log(data);
        }
    });
}
function gettitle(title){
  localStorage.setItem('titleni', title);
}

function addbooktitle(title){
  var tokens = localStorage.getItem('token');
  var title = localStorage.getItem('titleni');
  alert(title)
  loops = [];
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/mobile/user/title_check/' + title,
    method: "GET",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    success: function (data) {
      console.log(data);
      var employee_data = "";
        for (var i = 0; i < data.book.length; i++) 
        {
           employee_data += '<div class="col-50" style="padding:2%;text-align:center;background=#f7f7f7;">';
          employee_data += '<h3><div class="container">' + data.book[i].title +'</div></h3>';
           if (data.book[i].book_cover == '#' ){
              employee_data += '<img src="images/showmore.jpg" style="width: 90;height: 150">';
          }
          else{
             employee_data += '<img src="' + data.book[i].book_cover + '" width="90" height="150">';
          }
           employee_data += '<div class="container"><p>' + data.book[i].author_name + '</p></div>';
           employee_data += '<a class="col button button-fill" href="/form-add/" onclick="get_one(\'' + i + '\')">' + 'ADD BOOK' + '</a>';
          employee_data += '</div>';
        }
      $('#result').append(employee_data);
    }
  });
}

function search1(){
  var types = $("#booktype").val();
  var isbn = $("#isbn1").val();
  var title = $("#titleni").val();
  var author_name = $("#author_name").val();
 
  if (types == "isbn_"){ 
    addbookisbn(isbn);
    getisbn(isbn)
  } else if (types == "title_"){
    addbooktitle(title);
    gettitle(title)
  } else if (types == "author_")
    addbookauthor(author_name);
}


function addbookauthor(author_name){
  var tokens = localStorage.getItem('token');
loops = [];
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/mobile/user/author_check/' + author_name,
    method: "GET",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },    
    dataType: "json",
    crossDomain: true,
    success: function (data) {
      console.log(data);
      var employee_data = "";
        for (var i = 0; i < data.book.length; i++) 
        {
          employee_data += '<div class="col-50" style="padding:2%;text-align:center;background=#f7f7f7;">';
          employee_data += '<h3><div class="container">' + data.book[i].title +'</div></h3>';
          employee_data += '<img src="' + data.book[i].book_cover + '" width="90" height="150">';
           employee_data += '<div class="container"><p>' + data.book[i].author_name + '</p></div>';
           employee_data += '<a class="col button button-fill" href="/form-add/" onclick="get_one(\'' + i + '\')">' + 'ADD BOOK' + '</a>';
          employee_data += '</div>';
        }
      $('#result').append(employee_data);
    }
  });
}


function get_one(i) {
  alert(i)
  localStorage.setItem('index1', i);
}

function getisbn(isbn){
  alert(isbn)
  localStorage.setItem('isbn', isbn);
}

function addbookisbn(isbn) {
   var tokens = localStorage.getItem('token');

   app.request({
      url: 'https://desolate-basin-69053.herokuapp.com/mobile/user/isbn_check/' + isbn,
      contentType: 'application/json; charset=utf-8',
      method: "GET",
      dataType: "json",
      crossDomain: true,
      headers: { 'x-access-token': tokens },
      success: function (data) {
         var employee_data1 = "";
         for (var i = 0; i < data.book.length; i++) {
            employee_data1 += '<div class="col-50" style="padding:2%;text-align:center;background=#f7f7f7;">';
            employee_data1 += '<h3><div class="container">' + data.book[i].title + '</div></h3>';
            var x = data.book[i].book_cover;
            y = String(x)
            if (y == 'undefined') {
               employee_data1 += '<img src="images/showmore.jpg" style="width: 90px;height: 150px">';
            }
            else {
               employee_data1 += '<img src="' + data.book[i].book_cover + '" width="90" height="150">';
            }
            employee_data1 += '<div class="container"><p>' + data.book[i].author_name + '</p></div>';
            employee_data1 += '<a class="col button button-fill" href="/form-add/" onclick="get_one(\'' + data.book[i].title + '' + data.book[i].author_name + '' + data.book[i].book_cover + '' + data.book[i].description + '' + data.book[i].isbn + '' + data.book[i].publishers + '' + data.book[i].year + '' + data.book[i].edition + '\')">' + 'ADD BOOK' + '</a>';
            employee_data1 += '</div>';
         }
         $('#result').append(employee_data1);

      }
   });
}

app.init();
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
              '<a href="/signup/">Create an account'+
              '</a>'+
             ' </div>'+
            '</div>'+
          '</form>'+
        '</div>'+
      '</div>'+
    '</div>'+
    '<div class="preloader"></div>'+
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
      app.preloader.show();
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
          app.preloader.hide();
          app.dialog.alert('Invalid username or password!', 'Login Error');
        },

        success: function (data)  {
            localStorage.setItem('token', data.token);
            localStorage.setItem('authorization', 'Basic' + btoa(username + ':' +password));
            localStorage.setItem('username', username);
            app.preloader.hide();
            app.dialog.alert('Welcome ' + username, 'Login Success');
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
  var checkRate = document.getElementById("options2");

  if (checkRate.checked == true) {
    document.getElementById("price-rate").style.display = "block";

  } else {
    document.getElementById("price-rate").style.display = "none";
  }
}


function paymentMethod2() {
  var checkSale = document.getElementById("options3");

  if (checkSale.checked == true) {
    document.getElementById("price-sale").style.display = "block";
  } else {
    document.getElementById("price-sale").style.display = "none";
  }
}

// create searchbar
var searchbar = app.searchbar.create({
  el: '.searchbar',
  searchContainer: '.list',
  searchIn: '.item-title',
  on: {
    search(sb, query, previousQuery) {
      console.log(query, previousQuery);
    }
  }
});

function signUp1() {
  document.getElementById("signUp1").style.display = "none";
  document.getElementById("signUp2").style.display = "block";
}

function signUp2() {
  document.getElementById("signUp1").style.display = "block";
  document.getElementById("signUp2").style.display = "none"; 
}

function signUp3() {
  document.getElementById("signUp1").style.display = "none";
  document.getElementById("signUp2").style.display = "none";
  document.getElementById("signUp3").style.display = "block";
}

function signUp4() {
  document.getElementById("signUp1").style.display = "none";
  document.getElementById("signUp2").style.display = "block";
  document.getElementById("signUp3").style.display = "none";
}

function signup0(){
        var fname = $("#first_name").val();
        var lname = $("#last_name").val();
        var contact_number = $("#contact_number").val();
        var birthdate = $("#birthdate").val();
        var gender = $("#gender").val();
        var username = $("#username").val();
        var password = $("#password").val();
        var address = $("#address").val();
        $.ajax({
          url: "https://desolate-basin-69053.herokuapp.com/signup",
          contentType: 'application/json; charset=utf-8',
          data: JSON.stringify({
            'first_name': fname,
            'last_name': lname,
            'contact_number': contact_number,
            'birth_date': birthdate,
            'gender': gender,
            'username': username,
            'password': password,
            'address': address
          }),
          method: "POST",
          dataType: "json",
          crossDomain: true,
          success: function(resp) {
            console.log("success");
            alert("Registered successfully!");
            checkLogin();
          },
          error: function (e) {
            alert(birthdate)
            console.log('error');
          }
        });
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
function sik() {
  selected = [];
  selected1 = [];

  $("input:checkbox[name=select]:checked").each(function () {

    selected.push($(this).val());
  });
  for (var i = 0; i < selected.length; i++) {
    var e = { 'method': selected[i] }
    selected1.push(e);
  }
  localStorage.setItem("siked1", JSON.stringify(selected));
  localStorage.setItem("siked", JSON.stringify(selected1));
}



function addbook()
  {
  var priceRent = '';
  var priceSale = '';
  if ($("#pricerate").val() == '') {
    priceRent = '0';
  } else {
    priceRent = $("#pricerate").val();
  }

  if ($("#pricesale").val() == '') {
    priceSale = '0';
  } else {
    priceSale = $("#pricesale").val();
  }

  var i = localStorage.getItem('index');
  var method1 = localStorage.getItem('siked')
  var edition = JSON.parse(localStorage.getItem('books'))[i]['edition'];
  var isbn = JSON.parse(localStorage.getItem("books"))[i]['isbn'];
  var description = JSON.parse(localStorage.getItem('books'))[i]['description'];
  var publisher_name = JSON.parse(localStorage.getItem('books'))[i]['publishers'];
  var title = JSON.parse(localStorage.getItem('books'))[i]['title'];
  var author_name = JSON.parse(localStorage.getItem('books'))[i]['author_name'];
  var book_cover = JSON.parse(localStorage.getItem('books'))[i]['book_cover'];
  var year = JSON.parse(localStorage.getItem('books'))[i]['year'];
  var tokens = localStorage.getItem('token');
  var username = localStorage.getItem('username');
  var fiction = ['Adventure', 'Action', 'Drama', 'Horror', 'Mystery', 'Mythology'];
  var nonFiction = ['Biography', 'Essay', 'Journalism', 'Personal Narrative', 'Reference Book', 'Speech'];
  var academics = ['English', 'History', 'Math', 'Science'];
  alert(tokens);
  var category = "";
  var genre1 = $("#genre").val();
  if (fiction.includes(genre1)) {
    var category = "Fiction";
  } else if (nonFiction.includes(genre1)) {
    var category = "Non-Fiction";
  } else if (academics.includes(genre1)) {
    var category = "Academics";
  }else {
    var category = "Educational";
  }


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
          "current_user": username,
          "author_name": author_name,
          "quantity": $("#quantity").val(),
          "methods": method1,
          "price": priceSale,
          "rate": priceRent,
          "book_cover": book_cover,
          "genre": $("#genre").val(),
          "category": category,
          "edition": edition,
          "description": description
          }),

        success: function(data) {
        console.log(data);
        alert(title+ " book is added")
        app.router.navigate('/');
        },
        
        error: function (data) {
        console.log(data);
        }
    });
}


function addbooktitle(title){
  var tokens = localStorage.getItem('token');

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
      result1 = [];
        for (var i = 0; i < data.book.length; i++) 
        {
          employee_data += '<div class="col-50" style="padding:2%;margin-bottom:2%;text-align:center;background:#efefef;">';
          employee_data += '<h3><div class="container">' + data.book[i].title +'</div></h3>';
           employee_data += '<img src="' + data.book[i].book_cover + '" width="90" height="150">';
          employee_data += '<p><div class="container">' + data.book[i].author_name + '</div></p>';
           employee_data += '<a class="col button button-fill" href="/form-add/" onclick="get_one(\'' + i + '\')">' + 'ADD BOOK' + '</a>';
          employee_data += '</div>';
          var r = { 'author_name': data.book[i]['author_name'], 'isbn': data.book[i]['isbn'], 'title': data.book[i]['title'], 'book_cover': data.book[i]['book_cover'], 'publishers': data.book[i]['publishers'], 'description': data.book[i]['description'], 'year': data.book[i]['year'], 'types': data.book[i]['types'], 'book_id': data.book[i]['book_id'], 'edition': data.book[i]['edition'] }
          result1.push(r);
        }
      $('#result').append(employee_data);
      localStorage.setItem("books", JSON.stringify(result1));
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
  } else if (types == "title_"){
    addbooktitle(title);
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
      result1 = [];
        for (var i = 0; i < data.book.length; i++) 
        {
          employee_data += '<div class="col-50" style="padding:2%;margin-bottom:2%;text-align:center;background:#efefef;">';
          employee_data += '<h3><div class="container">' + data.book[i].title +'</div></h3>';
          employee_data += '<img src="' + data.book[i].book_cover + '" width="90" height="150">';
          employee_data += '<p><div class="container">' + data.book[i].author_name + '</div></p>';
           employee_data += '<a class="col button button-fill" href="/form-add/" onclick="get_one(\'' + i + '\')">' + 'ADD BOOK' + '</a>';
          employee_data += '</div>';
          var r = { 'author_name': data.book[i]['author_name'], 'isbn': data.book[i]['isbn'], 'title': data.book[i]['title'], 'book_cover': data.book[i]['book_cover'], 'publishers': data.book[i]['publishers'], 'description': data.book[i]['description'], 'year': data.book[i]['year'], 'types': data.book[i]['types'], 'book_id': data.book[i]['book_id'], 'edition': data.book[i]['edition'] }
        result1.push(r);
      }
      $('#result').append(employee_data);
      localStorage.setItem("books", JSON.stringify(result1));
    }
  });
}


function get_one(i) {
  localStorage.setItem('index', i);
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
          result1 = [];
         for (var i = 0; i < data.book.length; i++) {
            employee_data1 += '<div class="col-50" style="padding:2%;margin-bottom:2%;text-align:center;background:#efefef;">';
            employee_data1 += '<h3><div class="container">' + data.book[i].title + '</div></h3>';
            employee_data1 += '<img src="' + data.book[i].book_cover + '" width="90" height="150">';
            employee_data1 += '<p><div class="container">' + data.book[i].author_name + '</div></p>';
            employee_data1 += '<a class="col button button-fill" href="/form-add/" onclick="get_one(\'' +i+'\')">' + 'ADD BOOK' + '</a>';
            employee_data1 += '</div>';
           var r = { 'author_name': data.book[i]['author_name'], 'isbn': data.book[i]['isbn'], 'title': data.book[i]['title'], 'book_cover': data.book[i]['book_cover'], 'publishers': data.book[i]['publishers'], 'description': data.book[i]['description'], 'year': data.book[i]['year'], 'types': data.book[i]['types'], 'book_id': data.book[i]['book_id'], 'edition': data.book[i]['edition'] }
          result1.push(r);
        }
        $('#result').append(employee_data1);
        localStorage.setItem("books", JSON.stringify(result1));
      }
   });
}
function bookindex(i) {
  localStorage.setItem('bookid', i);
}

function bookowner(i) {
  localStorage.setItem('bookowners', i);
}



function toprated() {
  var tokens = localStorage.getItem('token');
  loops = [];
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/bookshelf/books/toprated',
    method: "GET",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    success: function (data) {
      console.log(data);
      var employee_data = "";
      for (var i = 0; i < data.book.length; i++) {
        employee_data += '<div class="swiper-wrapper">';
        employee_data += '<div class="swiper-slide">';
        employee_data += '<a href="/item/" onclick="onebook(); bookindex(\'' + data.book[i].book_id + '\'); bookowner(\'' + data.book[i].owner_username + '\')">' + '<img src="' + data.book[i].book_cover + '" width="100" height="100">' + '</a>';
        employee_data += '<p>' + data.book[i].title + '</p>';
        employee_data += '</div>';
        employee_data += '</div>';
      }
      $('#rated').append(employee_data);
    }
  });
}

function topborrow() {
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
        employee_data += '<a onclick="onebook(); bookindex(\'' + data.book[i].book_id + '\'); bookowner(\'' + data.book[i].owner_username + '\')" href="/item/">';
        employee_data += '<img src="' + data.book[i].book_cover + '" style="width: 100%;height: 100%;">' + '</a>';
        employee_data += '</div>';
      }
      $('#borrow').append(employee_data);
    }
  });
}

function books() {
  recentadded();
  toprated();
  topborrow();
  allbooks();       
}

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
        employee_data += '<div class="col-33" style="text-align:center;">';
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
    url: 'https://desolate-basin-69053.herokuapp.com/bookshelf/books/recent',
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
        employee_data += '<a onclick="onebook(); bookindex(\'' + data.book[i].book_id + '\'); bookowner(\'' + data.book[i].owner_username + '\')" href="/item/">';
        employee_data += '<img src="' + data.book[i].book_cover + '" style="width: 100%;height: 100%;">' + '</a>';
        employee_data += '</div>';
      }
      $('#new').append(employee_data);
    }
  });
}

function onebook() {
  var tokens = localStorage.getItem('token');
  var currentusername = localStorage.getItem('username');
  var b = localStorage.getItem('bookid');
  var username = localStorage.getItem('bookowners');
  loops = [];
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/user/bookshelf/book',
    method: "POST",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    data: JSON.stringify({
      'book_id': b,
      'current_user': currentusername,
      'username': username

    }),
    success: function (data) {
      console.log(data);
      // alert("dasdasjd")
      var title = "";
      var cover = "";
      var owner = "";

      // for (var i = 0; i < data.book.length; i++) {

        title += '<div class="demo-facebook-name">' + data.book[0].title;
        title += '<a href="#" class="link" style="float: right !important;">';
        title += '<i class="icon material-icons md-only size-100">bookmark_border</i>';
        title += '</a>';
        title += '</div>';
      // }
      $('#title').append(title);
      // for (var i = 0; i < data.book.length; i++) {

        cover += '<img src="' + data.book[0].book_cover + '"width="80%" height="75%"/ class="row center">';
        cover += '<br>' + data.book[0].author_name;
        cover += '<p class="likes">Rating:' + data.book[0].rating+'</p>';
      // }
      $('#cover').append(cover);
      // for (var i = 0; i < data.book.length; i++) {

        owner += '<ul>';
        owner += '<li>';
        owner += '<a href="#">Name:' + data.book[0].owner+'</a>';
        owner += '</li>';
        owner += '</ul>';  
      // }
      $('#owner').append(owner);
    }
  });
}


// function categoryEducation() {
//   english();
// }

function english() {
  var tokens = localStorage.getItem('token');
  var genre_name = "English"
  loops = [];
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/interests/view2/' + genre_name,
    method: "GET",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    success: function (data) {
      console.log(data);
      var employee_data = "";
      for (var i = 0; i < data.book.length; i++) {

        employee_data += '<div class="col-33" style="text-align:center;">';
        employee_data += '<a href="/item/" onclick="onebook(); bookindex(\'' + data.book[i].book_id + '\'); bookowner(\'' + data.book[i].owner_username + '\')">' + '<img src="' + data.book[i].book_cover + '" width="100" height="100">' + '</a>';
        employee_data += '<div class="container">' + data.book[i].title + '</div>';
        employee_data += '</div>';
      }
      $('#english1').append(employee_data);
    }
  });
}

function Science() {
  var tokens = localStorage.getItem('token');
  var genre_name = "Science"
  loops = [];
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/interests/view2/' + genre_name,
    method: "GET",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    success: function (data) {
      console.log(data);
      if (data.book.length == 0){
        app.dialog.alert('Sorry, nothing to display');
      }else{
      var employee_data = "";
      for (var i = 0; i < data.book.length; i++) {

        employee_data += '<div class="col-33" style="text-align:center;">';
        employee_data += '<a href="/item/" onclick="onebook(); bookindex(\'' + data.book[i].book_id + '\'); bookowner(\'' + data.book[i].owner_username + '\')">' + '<img src="' + data.book[i].book_cover + '" width="100" height="100">' + '</a>';
        employee_data += '<div class="container">' + data.book[i].title + '</div>';
        employee_data += '</div>';
      }
        $('#Science').append(employee_data);
    }
    }
  });
}

function math() {
  var tokens = localStorage.getItem('token');
  var genre_name = "Math"
  loops = [];
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/interests/view2/' + genre_name,
    method: "GET",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    success: function (data) {
      console.log(data);
      if (data.book.length == 0) {
        app.dialog.alert('Sorry, nothing to display');
      } else {
        var employee_data = "";
        for (var i = 0; i < data.book.length; i++) {

          employee_data += '<div class="col-33" style="text-align:center;">';
          employee_data += '<a href="/item/" onclick="onebook(); bookindex(\'' + data.book[i].book_id + '\'); bookowner(\'' + data.book[i].owner_username + '\')">' + '<img src="' + data.book[i].book_cover + '" width="100" height="100">' + '</a>';
          employee_data += '<div class="container">' + data.book[i].title + '</div>';
          employee_data += '</div>';
        }
        $('#math').append(employee_data);
      }
    }
  });
}
function history() {
  var tokens = localStorage.getItem('token');
  var genre_name = "History"
  loops = [];
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/interests/view2/' + genre_name,
    method: "GET",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    success: function (data) {
      console.log(data);
      if (data.book.length == 0) {
        app.dialog.alert('Sorry, nothing to display');
      } else {
        var employee_data = "";
        for (var i = 0; i < data.book.length; i++) {

          employee_data += '<div class="col-33" style="text-align:center;">';
          employee_data += '<a href="/item/" onclick="onebook(); bookindex(\'' + data.book[i].book_id + '\'); bookowner(\'' + data.book[i].owner_username + '\')">' + '<img src="' + data.book[i].book_cover + '" width="100" height="100">' + '</a>';
          employee_data += '<div class="container">' + data.book[i].title + '</div>';
          employee_data += '</div>';
        }
        $('#history').append(employee_data);
      }
    }
  });
}
function Adventure() {
  var tokens = localStorage.getItem('token');
  var genre_name = "Adventure"
  loops = [];
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/interests/view2/' + genre_name,
    method: "GET",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    success: function (data) {
      console.log(data);
      if (data.book.length == 0) {
        app.dialog.alert('Sorry, nothing to display');
      } else {
        var employee_data = "";
        for (var i = 0; i < data.book.length; i++) {

          employee_data += '<div class="col-33" style="text-align:center;">';
          employee_data += '<a href="/item/" onclick="onebook(); bookindex(\'' + data.book[i].book_id + '\'); bookowner(\'' + data.book[i].owner_username + '\')">' + '<img src="' + data.book[i].book_cover + '" width="100" height="100">' + '</a>';
          employee_data += '<div class="container">' + data.book[i].title + '</div>';
          employee_data += '</div>';
        }
        $('#Adventure').append(employee_data);
      }
    }
  });
}
function Action() {
  var tokens = localStorage.getItem('token');
  var genre_name = "Action"
  loops = [];
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/interests/view2/' + genre_name,
    method: "GET",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    success: function (data) {
      console.log(data);
      if (data.book.length == 0) {
        app.dialog.alert('Sorry, nothing to display');
      } else {
        var employee_data = "";
        for (var i = 0; i < data.book.length; i++) {

          employee_data += '<div class="col-33" style="text-align:center;">';
          employee_data += '<a href="/item/" onclick="onebook(); bookindex(\'' + data.book[i].book_id + '\'); bookowner(\'' + data.book[i].owner_username + '\')">' + '<img src="' + data.book[i].book_cover + '" width="100" height="100">' + '</a>';
          employee_data += '<div class="container">' + data.book[i].title + '</div>';
          employee_data += '</div>';
        }
        $('#Action').append(employee_data);
      }
    }
  });
}
function Drama() {
  var tokens = localStorage.getItem('token');
  var genre_name = "Drama"
  loops = [];
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/interests/view2/' + genre_name,
    method: "GET",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    success: function (data) {
      console.log(data);
      if (data.book.length == 0) {
        app.dialog.alert('Sorry, nothing to display');
      } else {
        var employee_data = "";
        for (var i = 0; i < data.book.length; i++) {

          employee_data += '<div class="col-33" style="text-align:center;">';
          employee_data += '<a href="/item/" onclick="onebook(); bookindex(\'' + data.book[i].book_id + '\'); bookowner(\'' + data.book[i].owner_username + '\')">' + '<img src="' + data.book[i].book_cover + '" width="100" height="100">' + '</a>';
          employee_data += '<div class="container">' + data.book[i].title + '</div>';
          employee_data += '</div>';
        }
        $('#Drama').append(employee_data);
      }
    }
  });
}
function Horror() {
  var tokens = localStorage.getItem('token');
  var genre_name = "Horror"
  loops = [];
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/interests/view2/' + genre_name,
    method: "GET",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    success: function (data) {
      console.log(data);
      if (data.book.length == 0) {
        app.dialog.alert('Sorry, nothing to display');
      } else {
        var employee_data = "";
        for (var i = 0; i < data.book.length; i++) {

          employee_data += '<div class="col-33" style="text-align:center;">';
          employee_data += '<a href="/item/" onclick="onebook(); bookindex(\'' + data.book[i].book_id + '\'); bookowner(\'' + data.book[i].owner_username + '\')">' + '<img src="' + data.book[i].book_cover + '" width="100" height="100">' + '</a>';
          employee_data += '<div class="container">' + data.book[i].title + '</div>';
          employee_data += '</div>';
        }
        $('#Horror').append(employee_data);
      }
    }
  });
}
function Mystery() {
  var tokens = localStorage.getItem('token');
  var genre_name = "Mystery"
  loops = [];
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/interests/view2/' + genre_name,
    method: "GET",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    success: function (data) {
      console.log(data);
      if (data.book.length == 0) {
        app.dialog.alert('Sorry, nothing to display');
      } else {
        var employee_data = "";
        for (var i = 0; i < data.book.length; i++) {

          employee_data += '<div class="col-33" style="text-align:center;">';
          employee_data += '<a href="/item/" onclick="onebook(); bookindex(\'' + data.book[i].book_id + '\'); bookowner(\'' + data.book[i].owner_username + '\')">' + '<img src="' + data.book[i].book_cover + '" width="100" height="100">' + '</a>';
          employee_data += '<div class="container">' + data.book[i].title + '</div>';
          employee_data += '</div>';
        }
        $('#Mystery').append(employee_data);
      }
    }
  });
}
function Mythology() {
  var tokens = localStorage.getItem('token');
  var genre_name = "Mythology"
  loops = [];
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/interests/view2/' + genre_name,
    method: "GET",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    success: function (data) {
      console.log(data);
      if (data.book.length == 0) {
        app.dialog.alert('Sorry, nothing to display');
      } else {
        var employee_data = "";
        for (var i = 0; i < data.book.length; i++) {

          employee_data += '<div class="col-33" style="text-align:center;">';
          employee_data += '<a href="/item/" onclick="onebook(); bookindex(\'' + data.book[i].book_id + '\'); bookowner(\'' + data.book[i].owner_username + '\')">' + '<img src="' + data.book[i].book_cover + '" width="100" height="100">' + '</a>';
          employee_data += '<div class="container">' + data.book[i].title + '</div>';
          employee_data += '</div>';
        }
        $('#Mythology').append(employee_data);
      }
    }
  });
}
function biology() {
  var tokens = localStorage.getItem('token');
  var genre_name = "Biography"
  loops = [];
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/interests/view2/' + genre_name,
    method: "GET",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    success: function (data) {
      console.log(data);
      if (data.book.length == 0) {
        app.dialog.alert('Sorry, nothing to display');
      } else {
        var employee_data = "";
        for (var i = 0; i < data.book.length; i++) {

          employee_data += '<div class="col-33" style="text-align:center;">';
          employee_data += '<a href="/item/" onclick="onebook(); bookindex(\'' + data.book[i].book_id + '\'); bookowner(\'' + data.book[i].owner_username + '\')">' + '<img src="' + data.book[i].book_cover + '" width="100" height="100">' + '</a>';
          employee_data += '<div class="container">' + data.book[i].title + '</div>';
          employee_data += '</div>';
        }
        $('#biology').append(employee_data);
      }
    }
  });
}
function essay() {
  var tokens = localStorage.getItem('token');
  var genre_name = "Essay"
  loops = [];
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/interests/view2/' + genre_name,
    method: "GET",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    success: function (data) {
      console.log(data);
      if (data.book.length == 0) {
        app.dialog.alert('Sorry, nothing to display');
      } else {
        var employee_data = "";
        for (var i = 0; i < data.book.length; i++) {

          employee_data += '<div class="col-33" style="text-align:center;">';
          employee_data += '<a href="/item/" onclick="onebook(); bookindex(\'' + data.book[i].book_id + '\'); bookowner(\'' + data.book[i].owner_username + '\')">' + '<img src="' + data.book[i].book_cover + '" width="100" height="100">' + '</a>';
          employee_data += '<div class="container">' + data.book[i].title + '</div>';
          employee_data += '</div>';
        }
        $('#essay').append(employee_data);
      }
    }
  });
}
function journalism() {
  var tokens = localStorage.getItem('token');
  var genre_name = "Journalism"
  loops = [];
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/interests/view2/' + genre_name,
    method: "GET",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    success: function (data) {
      console.log(data);
      if (data.book.length == 0) {
        app.dialog.alert('Sorry, nothing to display');
      } else {
        var employee_data = "";
        for (var i = 0; i < data.book.length; i++) {

          employee_data += '<div class="col-33" style="text-align:center;">';
          employee_data += '<a href="/item/" onclick="onebook(); bookindex(\'' + data.book[i].book_id + '\'); bookowner(\'' + data.book[i].owner_username + '\')">' + '<img src="' + data.book[i].book_cover + '" width="100" height="100">' + '</a>';
          employee_data += '<div class="container">' + data.book[i].title + '</div>';
          employee_data += '</div>';
        }
        $('#journalism').append(employee_data);
      }
    }
  });
}
function personalnarrative() {
  var tokens = localStorage.getItem('token');
  var genre_name = "Personal Narrative"
  loops = [];
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/interests/view2/' + genre_name,
    method: "GET",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    success: function (data) {
      console.log(data);
      if (data.book.length == 0) {
        app.dialog.alert('Sorry, nothing to display');
      } else {
        var employee_data = "";
        for (var i = 0; i < data.book.length; i++) {

          employee_data += '<div class="col-33" style="text-align:center;">';
          employee_data += '<a href="/item/" onclick="onebook(); bookindex(\'' + data.book[i].book_id + '\'); bookowner(\'' + data.book[i].owner_username + '\')">' + '<img src="' + data.book[i].book_cover + '" width="100" height="100">' + '</a>';
          employee_data += '<div class="container">' + data.book[i].title + '</div>';
          employee_data += '</div>';
        }
        $('#Personalnarrative').append(employee_data);
      }
    }
  });
}
function referencebook() {
  var tokens = localStorage.getItem('token');
  var genre_name = "Reference Book"
  loops = [];
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/interests/view2/' + genre_name,
    method: "GET",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    success: function (data) {
      console.log(data);
      if (data.book.length == 0) {
        app.dialog.alert('Sorry, nothing to display');
      } else {
        var employee_data = "";
        for (var i = 0; i < data.book.length; i++) {

          employee_data += '<div class="col-33" style="text-align:center;">';
          employee_data += '<a href="/item/" onclick="onebook(); bookindex(\'' + data.book[i].book_id + '\'); bookowner(\'' + data.book[i].owner_username + '\')">' + '<img src="' + data.book[i].book_cover + '" width="100" height="100">' + '</a>';
          employee_data += '<div class="container">' + data.book[i].title + '</div>';
          employee_data += '</div>';
        }
        $('#referencebook').append(employee_data);
      }
    }
  });
}
function speech(){
  var tokens = localStorage.getItem('token');
  var genre_name = "Speech"
  loops = [];
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/interests/view2/' + genre_name,
    method: "GET",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    success: function (data) {
      console.log(data);
      if (data.book.length == 0) {
        app.dialog.alert('Sorry, nothing to display');
      } else {
        var employee_data = "";
        for (var i = 0; i < data.book.length; i++) {

          employee_data += '<div class="col-33" style="text-align:center;">';
          employee_data += '<a href="/item/" onclick="onebook(); bookindex(\'' + data.book[i].book_id + '\'); bookowner(\'' + data.book[i].owner_username + '\')">' + '<img src="' + data.book[i].book_cover + '" width="100" height="100">' + '</a>';
          employee_data += '<div class="container">' + data.book[i].title + '</div>';
          employee_data += '</div>';
        }
        $('#speech').append(employee_data);
      }
    }
  });
}
function search() {
  var tokens = localStorage.getItem('token');
  alert($("#search").val());
  loops = [];
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/user/bookshelf/search',
    method: "GET",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    data: JSON.stringify({
      'item': $("#search").val()

    }),
    success: function (data) {
      console.log(data);
      if (data.book.length == 0) {
        app.dialog.alert('Sorry, nothing to display');
      } else {
        var employee_data = "";
        for (var i = 0; i < data.book.length; i++) {

          employee_data += '<li class="item-content">';
          employee_data += '<div class="item-inner">';
          employee_data += '<div class="item-title">' + data.book[i].title +'</div>';
          employee_data += '</div>';
          employee_data += '</li>';
        }
        $('#books').append(employee_data);
      }
    }
  });
}
app.init();

var user_id = null;



function login()
    {
      var username = $("#username").val();
        var password = $("#password").val();
        $.ajax({
            url: 'https://desolate-basin-69053.herokuapp.com/login',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                'username': username,
                'password': password
                    }),
            type: "POST",
            dataType: "json",
            crossDomain: true,
            headers: {
                'Authorization' : 'Basic ' + btoa(username + ':' + password)
                    },
          error: function (data) {
            console.log(e)
          },
          success: function (data)  {
              // alert("maayohon");
              // localStorage.setItem('acc_type', data.acc_type);
              localStorage.setItem('token', data.token);
              // localStorage.setItem('acc_id', data_acc_id);
              window.location.replace('/logged.html');
              localStorage.setItem( 'Basic ' + btoa(username + ':' + password));            
          },
          complete: function (jqXHR) {
                        if (jqXHR.status == '401') {
                            console.log(jqXHR.status)
          }}
        });
    }


// var token = token
// var user_id = null;

// function login() {
//     $.ajax(
//         {   
//             type: "POST",
//             url: 'https://bookshelfv2-api.herokuapp.com/login',
//             contentType: 'application/json; charset=utf-8',
//             dataType: "json",
//             data: JSON.stringify({
//                 username: $("#username").val(),
//                 password: $("#password").val()
//             }),
                
//             error: function (data) {
//                 alert('Wrong username/password');
//                 user_id = data.userid;
//                 // window.location.replace('http://www.google.com/');
//             },
//             success: function (data) {
//                 if (data.status == 'ok') {
//                     window.location.replace('/logged.html');
//                 }
//                 else {
//                     // window.location.replace('http://www.google.com/');
//                     alert(data.message); 
//                     // console.log(data);
//                     // callback(data);
//                 }

//             }
//         });
// }


function profile2(user){

 $.ajax({
            url: 'http://127.0.0.1:5000/user/info' ,
            type: "GET",
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            success: function(data) {
                if (data.message  == 'ok') {
                                
                      // username = data.user.username;
                      // first_name = data.user.first_name;
                      // last_name = da.user.last_name;
                      // contact_number = data.user.contact_number;
                      // birth_date = data.user.birth_date;
                      // gender = data.user.gender;
                      // profpic = data.user.profpic;
                      $("#profile").append(profile(data.user[0].first_name));
                      $("#infmain").append(infoMerge(data.user[0].last_name, data.user[0].first_name, data.user[0].birth_date, data.user[0].gender));
                      console.log(data.user[0].first_name);

                } else
                {
                    // $("#profile").html("");
                    alert(data.message);
                }
            }
        });
}
 //});
function profile(first_name)
{
   return '<h2>' +first_name+ '</h2>';
}

function infoMerge(lname, fname, bday, gender){
  return '<ul>'+
          '<li><label>Full Name:</label>'+ lname+', '+fname+'</li>'+
          '<li><label>Birthdate: </label>'+ bday+'</li>'+
          '<li><label>Gender:</label>' +gender+'</li>'+
          '<li><label>Address:</label>dadad</li>'+
        '</ul>';
}





// <script>
//   $(document).ready(function(){
//     $.getJSON("linkherokuapp.com/api/directory",function(data){
//       var directory_data='';
//       $.each(data,function(key,value){
//         directory_data += '<tr>';
//         val = value.contact;
//         yu =value.address;
//         directory_data += '<td onclick="info('+val+')" location = "call.html"><h2>'+value.name+'</h2></td>';
//         directory_data += '</tr>';
//       });
//       $('#directory_table').append(directory_data);
//     });
//   });

// </script>

function addbook(form){
    // var = localStorage.getItem('token');
    xhr = new XMLHttpRequest();
    var url = "https://bookshelfv2-api.herokuapp.com/user/addbook";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () { 
        if (xhr.readyState == 4 && xhr.status == 200) {
            var json = JSON.parse(xhr.responseText);
            alert("kahayag sa kaugmaon");

            // console.log(json.form.id.value +", " + json.form.acc_type.value + ", " + json.form.email.value + ", " + json.form.pass.value);
        }
        else {
            alert("Ready na mi!");
        }
    }
    var json =JSON.stringify({
        "title": form.title.value,
        "publisher_name":form.publisher_name.value, 
        "year":form.year.value, 
        "edition":form.edition.value,
        "types":form.types.value,
        "author_fname":form.author_fname.value,
        "author_lname":form.author_lname.value,
        "isbn":form.isbn.value,
        // "categories":form.categories.value,
        // "descrip":form.descrip.value,
        // "selltype":form.selltype.value,
        // "bookprice":form.bookprice.value,
    });
    console.log(json)
    xhr.send(json);
    // $.ajax({
    //       url: "http://127.0.0.1:5000/user/addbook",
    //       contentType: 'application/json; charset=utf-8',
    //       data: JSON.stringify({
    //         'title':$("#title").val(),
    //         'publisher_name':$("#publisher_name").val(),
    //         'year':$("#year").val(),
    //         'edition':$("#edition").val(),
    //         'types':$("#types").val(),
    //         'author_fname':$("#author_fname").val(),
    //         'author_lname':$("#author_lname").val(),
    //         'isbn':$('#isbn').val(),
    //       }),
    //       method: "POST",
    //       dataType: "json",
    //       crossDomain: true,
    //       success: function() {
    //         console.log("success");
    //         alert("Added successfully!");
    //         window.location.replace("/logged.html");
    //       },
    //       error: function () {
    //         console.log('error');
    //       }
    //     });
}

function searchCheck(that) {
        if (that.value == "isbn_") {
            document.getElementById("isbn-check").style.display = "block";
            document.getElementById("author-check").style.display = "none";
            document.getElementById("title-check").style.display = "none";
        } else if (that.value == "author_") {
            document.getElementById("author-check").style.display = "block";
            document.getElementById("isbn-check").style.display = "none";
            document.getElementById("title-check").style.display = "none";
        } else if (that.value == "title_") {
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

function showTab() {
  document.getElementById('showTab1').style.display = "block";
}

function test() {
var toggle  = document.getElementById("toggle");
var content = document.getElementById("content");

toggle.addEventListener("click", function() {
  content.classList.toggle("show");
});
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
          url: "https://nameless-cove-48814.herokuapp.com/signup",
          contentType: 'application/json; charset=utf-8',
          data: JSON.stringify({
            'first_name': fname,
            'last_name': lname,
            'contact_number': contact_number,
            'birthdate': birthdate,
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
          },
          error: function (e) {
            alert(birthdate)
            console.log('error');
          }
        });
         }



var app = new Framework7();

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
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

    $.ajax({    
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
    })
}



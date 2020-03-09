$(document).ready(function () {
    var returnedArr = JSON.parse(localStorage.getItem('dataArr'));

    $.ajax({
        url: "https://jsonplaceholder.typicode.com/posts",
        Type: "GET",
        success: function (resp) {
            var number;
            var heading;
            var body;
            var row;
            var btnContainer;
            var edit;
            var del;


            //show data from LocalStorage
            for (var i = 0; i < returnedArr.length; i++) {
                number = $('<p>').html(returnedArr[i].id);
                heading = $('<td>').html(returnedArr[i].title);
                body = $('<td>').html(returnedArr[i].body);
                row = $('<tr>');
                edit = $('<button>').html('Edit').addClass('edit').attr('id', returnedArr[i].id);
                del = $('<button>').html('Delete').addClass('del').attr('id', returnedArr[i].id);
                btnContainer = $('<section>');
                btnContainer.append(edit);
                btnContainer.append(del);
                row.append(number);
                row.append(heading);
                row.append(body);
                row.append(btnContainer);
                $('table').append(row);
            }
        },
    });

    //handle delete button click
    $(document).on('click', ('.del'), function () {
        var confirmation = confirm('are you sure to delete this post ?');
        if (confirmation) {
            var idAttr = $(this).attr('id');
            $.ajax({
                url: "https://jsonplaceholder.typicode.com/posts/" + idAttr,
                Type: "DELETE",
                success: function (resp) {},
            });

            //remove post from DOM
            $(this).parent().parent().remove();


            //search for the post id in LocalStorage then remove it
            for (var i = 0; i < returnedArr.length; i++) {
                if (returnedArr[i].id == idAttr) {
                    returnedArr.splice(i, 1);
                }
            }

            //append new data to LocalStorage
            localStorage.setItem('dataArr', JSON.stringify(returnedArr))
        }
    })


    //handle edit button cllick
    $(document).on('click', ('.edit'), function () {

        var idAttr = $(this).attr('id');

        //get required post to edit
        $.ajax({
            url: "https://jsonplaceholder.typicode.com/posts/" + idAttr,
            Type: "GET",
            success: function (resp) {
                if (resp) {
                    localStorage.setItem("elementObj", JSON.stringify(resp));
                } else {
                    alert("can't delete")
                }
                //navigate to edit page
                window.location.href = './edit.html';
            },
        });
    })

})
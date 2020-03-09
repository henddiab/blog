var areaTitle = $('#title');
var areabody = $('#body');
var index;


//get post data
var returnedObj = JSON.parse(localStorage.getItem('elementObj'));

//get all data to edit on it
var data = JSON.parse(localStorage.getItem('dataArr'));

areaTitle.html(returnedObj.title);
areabody.html(returnedObj.body);

function save() {
    if (areaTitle.val() == "" || areabody.val() == "") {
        alert('please enter data to edit')
    } else {
        //get the new values
        returnedObj.title = areaTitle.val();
        returnedObj.body = areabody.val();


        //loop through all data to get new index after elements deleted
        for (var i = 0; i < data.length; i++) {
            if (data[i].id == returnedObj.id) {
                index = i;
            }
        }

        $.ajax({
            url: "https://jsonplaceholder.typicode.com/posts/" + returnedObj.id,
            Type: "PUT",
            success: function (resp) {
                if (resp) {
                    console.log(resp);

                    //edit on original data
                    data[index].title = areaTitle.val();
                    data[index].body = areabody.val();
                    localStorage.setItem('dataArr', JSON.stringify(data));
                    localStorage.setItem('elementObj', JSON.stringify(returnedObj));
                } else {
                    alert('error')
                }
            },
        });

        alert('post updated successfully');

        window.location.href = './home.html';

    }
}
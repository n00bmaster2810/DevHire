let postBtn = document.querySelectorAll(".edit-post");

let post;

postBtn.forEach((btn) => {
  let post = JSON.parse(postBtn.dataset.post);
  console.log(post);
  $("#editJobOffer").val(post.jobOffer);
  $("#editDescription").val(post.description);
  $("#editTags").val(post.tags);
  let path = "/editPost/" + post._id;
  $("#submit").click(function () {
    $("#editPost").attr("action", path);
    $("#editPost").attr("method", "POST");
  });
});

//postBtn.addEventListener("click", (e) => {
//  post = JSON.parse(postBtn.dataset.post);
//  console.log(post);
//  $("#editJobOffer").val(post.jobOffer);
//  $("#editDescription").val(post.description);
//  $("#editTags").val(post.tags);
//  let path = "/editPost/" + post._id;
//  $("#submit").click(function () {
//	  $("#editPost").attr("action", path);
//    $("#editPost").attr("method", "POST");
//  });
//});

let deletePostBtn = document.querySelectorAll(".del-post");

deletePostBtn.forEach(btn => {
  $(btn).click(() => {
    post = JSON.parse(deletePostBtn.dataset.post);
    console.log(post);
    let path = "/companies/deletePost/" + post._id;
    $("#deletePost").click(function () {
      window.location = path;
    });
  });
});

//deletePostBtn.addEventListener("click", (e) => {
//  post = JSON.parse(deletePostBtn.dataset.post);
//  console.log(post);
//  let path = "/companies/deletePost/" + post._id;
//  $("#deletePost").click(function () {
//    window.location = path;
//  });
//});
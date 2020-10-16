let postBtn = document.querySelector(".edit-post");

let post;

postBtn.addEventListener("click", (e) => {
  post = JSON.parse(postBtn.dataset.post);
  console.log(post);
  $("#editJobOffer").val(post.jobOffer);
  $("#editDescription").val(post.description);
  $("#editTags").val(post.tags);
  let path = "/editPost/" + post._id;
  $("#submit").click(function () {
	  $("#editPost").attr("action", path);
	  $("#editPost").attr("method", "POST")
  });
});

let deletePostBtn = document.querySelector(".del-post");

deletePostBtn.addEventListener("click", (e) => {
  post = JSON.parse(deletePostBtn.dataset.post);
  console.log(post);
  let path = "/companies/deletePost/" + post._id;
  //$("#deletePost").click(function () {
    //$("#deletePost").attr("href", path);
  //});
  $("#deletePost").click(function () {
    window.location = path;
  });
});
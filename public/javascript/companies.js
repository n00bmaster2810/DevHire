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

//$("#editJobOffer").val(post.jobOffer);
//let editJobOffer = document.getElementById("editJobOffer");
//editJobOffer.setAttribute("value", post.jobOffer);

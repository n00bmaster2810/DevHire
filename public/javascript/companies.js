let postBtn = document.querySelectorAll(".edit-xyz");

postBtn.forEach((btn) => {
  let post = JSON.parse(btn.dataset.post);
  console.log(post);
  $("#editJobOffer").val(post.jobOffer);
  $("#editDescription").val(post.description);
  $("#editTags").val(post.tags);
  $("#editEndDate").val(post.endDate);
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
    let post = JSON.parse(btn.dataset.post);
    console.log(post);
    let path = "/companies/deletePost/" + post._id;
    $("#deletePost").click(function () {
      window.location = path;
    });
  });
});


let profileBtn = document.getElementById("profile");

$(profileBtn).click(() => {
  let profile = JSON.parse(profileBtn.dataset.user);
  console.log(profile);
  $("#editName").val(profile.name);
  $("#editWebsite").val(profile.website);
  $("#editHeadquarter").val(profile.headquarter);
  $("#linkedin").val(profile.linkedin);
  $("#facebook").val(profile.facebook);
  $("#twitter").val(profile.twitter);
  $("#pininterest").val(profile.pininterest);
  $("#instagram").val(profile.instagram);
})
//deletePostBtn.addEventListener("click", (e) => {
//  post = JSON.parse(deletePostBtn.dataset.post);
//  console.log(post);
//  let path = "/companies/deletePost/" + post._id;
//  $("#deletePost").click(function () {
//    window.location = path;
//  });
//});
let details = document.querySelectorAll(".detail");
details.forEach((btn) => {
  $(btn).click(() => {
    let post = JSON.parse(btn.dataset.post);
    console.log(post);
    $("#detailModalTitle").html(post.jobOffer);
    $("#detailBody").html(post.description);
  });
});

$("#carousel").find(".carousel-item").first().addClass("active");

let apply = document.querySelectorAll(".apply");
apply.forEach((btn) => {
	$(btn).click(() => {
    let post = JSON.parse(btn.dataset.post);
    let comp = JSON.parse(btn.dataset.comp);
    $("#compId").val(comp._id);
    $("#postId").val(post._id);
    console.log(post);
    console.log(comp);
  });
});

//$(function () {
//  $("#searchName").autocomplete({
//    source: function (req, res) {
//      $.ajax({
//        url: "autocomplete/",
//        dataType: "jsonp",
//        type: "GET",
//        data: req,
//        success: function (data) {
//          res(data);
//        },
//        error: function (err) {
//          console.log(err.status);
//        },
//      });
//    },
//    minLength: 1,
//    select: function (event, ui) {
//      if (ui.item) {
//        $("#searchName").val(ui.item.label);
//      }
//    },
//  });
//});

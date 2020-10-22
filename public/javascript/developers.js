let details = document.querySelectorAll(".detail");
details.forEach((btn) => {
  $(btn).click(() => {
    post = JSON.parse(btn.dataset.post);
    console.log(post);
    $("#detailModalTitle").html(post.jobOffer);
    $("#detailBody").html(post.description);
  });
});

let apply = document.querySelectorAll(".apply");
apply.forEach((btn) => {
	$(btn).click(() => {
    post = JSON.parse(btn.dataset.post);
    console.log(post);
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

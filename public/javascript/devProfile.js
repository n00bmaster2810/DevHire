let editExpBtn = document.querySelectorAll(".expEdit");

editExpBtn.forEach((btn) => {
  $(btn).click(() => {
    let exp = JSON.parse(btn.dataset.exp);
    console.log(exp);
    let path = "/editExp/" + exp._id;
    $("#editTitle").val(exp.title);
    $("#editType").val(exp.type);
    $("#editCompany").val(exp.company);
    $("#editLocation").val(exp.location);
    $("#editStart").val(exp.startDate);
    $("#editEnd").val(exp.endDate);
    $("#editIndustry").val(exp.industry);
    $("#editDescription").val(exp.description);
    $("#saveChanges").click(() => {
      $("#editExpForm").attr("action", path);
      $("#editExpForm").attr("method", "POST");
    });
  });
});

let editCertBtn = document.querySelectorAll(".certEdit");

editCertBtn.forEach((btn) => {
  $(btn).click(() => {
    let cert = JSON.parse(btn.dataset.cert);
    console.log(cert);
    let path = "/editCert/" + cert._id;
    $("#editNameCert").val(cert.name);
    $("#editOrgCert").val(cert.organisation);
    $("#editIssue").val(cert.issueDate);
    $("#editCred").val(cert.url);
    $("#saveCert").click(() => {
      $("#editCertForm").attr("action", path);
      $("#editCertForm").attr("method", "POST");
    });
  });
});


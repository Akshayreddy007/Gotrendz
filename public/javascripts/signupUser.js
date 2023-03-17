var signUpNewUser=()=>{
    var userInfo = {};
    userInfo.accId = $("#signupName").val();
    userInfo.accPass = $("#signupPass").val();
    userInfo.accMail = $("#signupmail").val();
    $.ajax({
        url:"/new/user/signUp",
        method: "POST",
        data:userInfo,
        dataType:"JSON",
        success:(res)=>{
            if(res.msg=="success"){
                $("#success").html("Successfully registered");
            }
        },
        error:(err)=>{
            console.log(err);
        }
    })
}
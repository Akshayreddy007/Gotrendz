var showSelectedPage = (type)=>{
    var temUrl = "templates/";
    switch(type){
        case "login":
            temUrl+='login.htm';
            break;
        case"signup":
            temUrl+='signup.htm';
            break;
        case"fpass":
            temUrl+='fpassword.htm';
            break;
        case"productPage":
            window.location.hash = "productPage";
            temUrl+='productpage.htm';
            break;
        case"addNewProduct":
            temUrl+='Admin.htm';
            break;
    }
    $.ajax({
        url: temUrl,
        method: "GET",
        data: {},
        success: (res)=>{
            $(".maincontent").html(res);
            if(type=="login"||type=="signup"){
                showCaptcha();
            }else if(type=="productPage"){
                $.ajax({
                    url:"/get/productDetails",
                    method:"POST",
                    dataType:"JSON",
                    data:{},
                    success:(res)=>{
                        if(res.productDetails){
                            $(".logout").show();
                            products = res.productDetails;
                            for (var i = 0 ; i < products.length; i++) {
                                loadProductData(products[i]);
                            }
                        }else{
                            showSelectedPage("login")
                            $(".logout").hide();
                        }
                    }
                })
            }
        }
    })
};
var showCaptcha=()=>{
    $("#capcha").show();
    captchaText = chapchaOtpLib.generateCapcha();
    $("#capcha").html("<b>" + captchaText + '</b>');

    html2canvas($('#capcha'), {
        onrendered: function (canvas) {
            var screenshot = canvas.toDataURL('image/png');
            $('#captchaImage').attr('src', screenshot);
            $("#capcha").hide();
        },
    });
}
$(document).ready(()=>{
    var currentHash = window.location.hash;
    currentHash = currentHash.replace("#","");
    showSelectedPage(currentHash);
})

var productTemplate, products;
var loadProductTemplate=()=>{
    $.ajax({
        url:"templates/productLoading.htm",
        method:"GET",
        data:{},
        success:(res)=>{
            productTemplate = res;
        }
    })
}
loadProductTemplate();
var validateCredentials=()=>{
    let userCaptcha = $('#captchatext').val();
    if(userCaptcha!=captchaText){
        $(".capchaErr").show();
        showCaptcha();
        $("#captchatext").val("");
        return;
    }
    $(".capchaErr").hide();
    let userDetails={};
    userDetails.accId=$("#userName").val();
    userDetails.accPass=$("#userPass").val();
    $.ajax({
        url:"/validate/userCredentials",
        method: "POST",
        dataType: "JSON",
        data:userDetails,
        success:(res)=>{
            if(res.msg == "Valid"){
                let type = "productPage"
                if(res.isAdmin){
                    type = "addNewProduct"
                }
                $(".accDetailsInvaid").hide();
                showSelectedPage(type);
            }else{
                $(".accDetailsInvaid").show();
                showCaptcha();
            }
        },
        error:(err)=>{
            $(".accDetailsInvaid").show();
        }
    })
    
}

var enableLogin=()=>{
    !$('#captchatext').val()? $("#loginbtn1").attr("disabled",true):$("#loginbtn1").attr("disabled",false);
    !$('#captchatext').val()? $("#signupbtn1").attr("disabled",true):$("#signupbtn1").attr("disabled",false);
}

var showPassword=()=>{
    $("#check").is(':checked')? $("#userPass").attr("type","text"):$("#userPass").attr("type","password");
    $("#check").is(':checked')? $("#signupPass").attr("type","text"):$("#signupPass").attr("type","password");
    $("#Recheck").is(':checked')? $("#signupRePass").attr("type","text"):$("#signupRePass").attr("type","password");
}

var loadProductData=(pdetails)=>{
    var handleBarTemplate = Handlebars.compile(productTemplate);
    var productTemplateWithData = handleBarTemplate(pdetails);
    $("#pDetailsContainer").append(productTemplateWithData);
}
var signOutUser=()=>{
    $.ajax({
        url:"/user/signout",
        method:"POST",
        dataType:"JSON",
        success:(res)=>{
            showSelectedPage("login");
            $(".logout").hide();
        }
    })
}
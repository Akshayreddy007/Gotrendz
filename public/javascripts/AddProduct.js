var imageUrl = '';
var addNewProduct=()=>{
    let productDetails ={};
    productDetails.image= imageUrl;
    productDetails.name= $("#pname").val();
    productDetails.text=$("#ptext").val();
    productDetails.Price=$("#pprice").val();

    $.ajax({
        url: "/add/new/Product",
        method: "POST",
        data: productDetails,
        dataType: "JSON",
        success: ()=>{
            $(".succssBlock").show(100);
            $(".succssBlock").html("Product has added successfully");
            $("#pname").val("");
            $("#ptext").val("");
            $("#pprice").val("");
            $("input[type=insertImage]").val("");
        },
        error:()=>{
            console.log("error");
        }
    })
}

var uploadNewImage =()=>{
    var image = $("input[name=insertImage]")[0].files[0];
    let formData = new FormData();
    formData.append("InsertImage",image);

    $.ajax({
        url:"/add/new/Image",
        method:"POST",
        data:formData,
        enctype: "multipart/form-data",
        processData: false,
        contentType: false,
        dataType: "JSON",
        success:(res)=>{
            imageUrl = res.file_path;
        },
        error:(err)=>{
            console.log("error"+err);
        }
    })
};
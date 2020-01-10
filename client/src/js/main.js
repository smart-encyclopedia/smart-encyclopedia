$(window).on("load", function () {
    $("#loaded").hide()
})

$(document).ready(function () {
    $("#parseImage").click(function () {
        $("#fullTexts").html("")
        $('.gambarSearched').html("")
        $('#titlePT').html('')
        $('#perWord').html('')
        $("#loaded").show()
        let image = $('#urlImage').val()
        let languange = $('#languageImage').val()
        console.log(languange, "ini langueage")
        console.log(`http://localhost:3000/sisa/getMeaning/?url=${image}&lang=${languange}`)
        $.ajax({
            type: "GET",
            url: `http://localhost:3000/sisa/getMeaning/?url=${image}&lang=${languange}`,
            success: function (imageParsed) {
                $("#loaded").hide()
                console.log(imageParsed)
                $('.gambarSearched').html("")
                $('.gambarSearched').append(`<img src="${image}" class="img-fluid col-md-2 col-md-5 col-md-offset-5" alt="Responsive image">
                    `)

                $('#titlePT').html('')
                $('#titlePT').append(`Words`)

                let hasilAll = '<p>'
                for (let hasil of imageParsed.perWord) {
                    hasilAll += '<span onClick=(alert("' + hasil + '"))>' + hasil + ' </span>'
                }
                hasilAll += '</p>'
                $('#perWord').html('')
                $('#perWord').append(hasilAll)

            },
            error: function (err) {

                $('.gambarSearched').html("")
                $('.gambarSearched').append(`<img src="${image}" class="img-fluid" alt="Responsive image">
                `)

                $('#titlePT').html('')
                $('#perWord').html('')
                let errMsg = "Image cannot be parsed"
                if (err.message === "Request failed with status code 404") {
                    errMsg = "The image you are looking for is not found"
                }
                $('#fullTexts').append(`
                          <div class="row">
                          <div class="col align-middle">
                          <h3>${errMsg}<h3>
                          </div>
                          </div>
                      `)
                $('#loaded').hide()
            }
        })
    })
})
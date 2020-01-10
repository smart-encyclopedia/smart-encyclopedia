$(window).on("load", function () {
    $("#loaded").hide()
})

$(document).ready(function () {
    $(document).on('keyup',  function (event) {
        if (event.keyCode === 13) {
            $('#submit-btn').trigger('click');
        }
    });

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

$('#collapser').click(function() {
   // console.log('this is collapse example .val()', $('#collapser').text())
   getThesaurusItems($('#collapser').text().trim())
})
function processData() {
    const text = $('#input-word').val();
    const langTo = $('#lang-to').val();
    let langOrigin = $('#lang-origin').val();

    if (!langOrigin) {
        
    } else {
        translate(text, langOrigin, langTo);
    }
}

async function getLang(text) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/api/translator/detectLang",
            data: {text},
            dataType: "json",
            success: async function (response) {
                langOrigin = response.lang;
                const hasilTranslate = await translate(text, langOrigin, 'id');
                console.log(hasilTranslate, 'hasil promise translate')
                resolve(hasilTranslate)
            }
        });
    })
}

async function translate(text, from, to) {
    return new Promise((resolve, rj) => {
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/api/translator/translate",
            data: {
                text, from, to
            },
            dataType: "json",
            success: function (response) {
                console.log(response.text[0], 'ini resp');
                
                // $('#translated').html(`${response.text[0]}`);
                resolve(response.text[0])
            }
        });
    })
}

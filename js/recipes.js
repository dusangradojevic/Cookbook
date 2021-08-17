$(document).ready(function() {
    let recipes = JSON.parse(localStorage.getItem("recipes"))
    let sort = null
    let sortPrev = null

    function sortRecipes() {
        sort = $("select").val()
        if (sort != null && (sort == sortPrev) == false) {
            for (let i = 0; i < recipes.length - 1; ++i) {
                for (let ii = i + 1; ii < recipes.length; ++ii) {
                    let rating1 = recipes[i].ratingNum == 0 ? 0 : recipes[i].ratingSum / recipes[i].ratingNum
                    let rating2 = recipes[ii].ratingNum == 0 ? 0 : recipes[ii].ratingSum / recipes[ii].ratingNum
                    
                    let condition
                    switch (sort) {
                        case "sort-diff-asc":   condition = recipes[i].difficulty > recipes[ii].difficulty
                            break
                        case "sort-diff-desc":  condition = recipes[i].difficulty < recipes[ii].difficulty
                            break 
                        case "sort-rtg-asc":    condition = rating1 > rating2
                            break
                        case "sort-rtg-desc":    condition = rating1 < rating2
                            break
                    }

                    if (condition == true) {
                        let tmp = recipes[i]
                        recipes[i] = recipes[ii]
                        recipes[ii] = tmp
                    }
                }
            }
            sortPrev = sort
        }
    }

    function showRecipes() {
        sortRecipes()

        let group = $(".menu-tab ul li a.active").attr("id")
        
        let currRecipe = ""
        for (let i = 0; i < recipes.length; ++i) {
            if (recipes[i].group == group || group == "all") {
                let rtg = recipes[i].ratingNum == 0 ? 0 : (recipes[i].ratingSum / recipes[i].ratingNum).toFixed(1)

                currRecipe += "<div id='" + recipes[i].id + "' class='col-lg-4 col-md-6 special-grid recipes " + recipes[i].group + "'>" + 
                                    "<a href='#'>" +
                                        "<img src='" + recipes[i].img + "' class='img-recipe' alt='Image'>" +
                                        "<p style='color: #719a0a;'>" + recipes[i].name + " | Težina: " + recipes[i].difficulty + " | Ocena: " + rtg + "</p>" +
                                    "</a>" +
                                "</div>"
            }
        }
        $("#pics").html(currRecipe)
    }

    showRecipes()



    // Show recipe
    $(document).on("click", ".recipes", function() {
        let recipe = recipes.find(element=>element.id == $(this).attr('id'))
        localStorage.setItem("recipeSingle", JSON.stringify(recipe))
        window.location.href = "recipe.html"
    });


    // Show certain food group
    $(".nav-link").click(function() {
        showRecipes()
    })


    //Sort type change
    $("select").change(function() {
        showRecipes()
    })
})
//collapse the collapsable nav when out-of-focus
(function(){ //same as document.addEventListener("DOMContentLoaded"..)
    //same as document.querySelector("#navbarToggle").addEventListener("blur")
    $("#navbarToggle").blur(function(event){
        var screenWidth = window.innerWidth;
        if(screenWidth<768){
            $("collapsable-nav").collapse('hide');
        }
    });
});
(function(global){
    var dc={};
    var homeHTML = "home-snippet.html";
    var allCategoriesUrl = "http://davids-restaurant.herokuapp.com/categories.json";
    var categoriesTitleHTML="snippets/categories-title-snippet.html";
    var categoryHTML = "snippets/category-snippet.html";
    var menuItemsUrl = "http://davids-restaurant.herokuapp.com/menu_items.json?category=";
    var menuItemsTitleHtml = "snippet/menu-items-title.html";
    var menuItemHTML = "snippet/menu-item.html";

    //convenience function for inserting innerHTML for 'select'
    var insertHTML = function(selector, html){
        var targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    };

    //Show loading icon inside element identified by 'selector'.
    var showLoading=function(selector){
        var html ="<div class='text-center'>";
        html+="<img src='1.jpg'></div>";
        insertHTML(selector,html);
    };
    //Return substitute of '{{propName}}' with propValue in the given string
    var insertProperty = function(string, propName, propValue){
        var propertyToReplace = "{{"+propName+"}}";
        string = string.replace(new RegExp(propToReplace, "g"),propValue);
        return string;
    }

    //remove the class 'active' from home page and switch to menu button
var switchMenuToActive = function(){
    //remove 'active' from home button
    var classes = document.querySelector("#naHomeButton").className;
    classes = classes.replace(new RegExp("active", "g"),"");
    document.querySelector("#navHomeButon").className = classes;

    //add 'active' to menu button if not there already
    classes = document.querySelector("#navMenuButton").className;
    if(classes.indexOf("active") == -1){
        classes+=" active";
        document.querySelector("#navMenuButton").className = classes;
    }
};

    //on page load(before images or css)
    document.addEventListener("DOMcontentLoaded",function(event){
        //on first load, show home view
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(homeHTML, function(responseText){
            document.querySelector("#main-content").innerHTML=responseText;
        },false);
    });

    //load the menu categories view
    dc.loadMenuCategories = function(){
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(allCategoriesUrl, buildAndShowCategoriesHTML);
    };

    //load menu-items view;'category-short' is short_name for a category
    dc.loadMenuItems = function (categoryShort){
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(menuItemUrl+ categoryShort, buildAndShowMenuItemsHTML);
    };

    //Builds HTML for the categories page based on the data from the server
    function buildAndShowCategoriesHTML(categories){
        //load title snippet of categoreis page
        $ajaxUtils.sendGetRequest(categoriesTitleHTML, function(categoriesTitleHTML){
            //retrieve single category snippet
            $ajaxUtils.sendGetRequest(categoryHTML, function(categoryHTML){
                var categoriesViewHTML= buildCategoriesViewHTML(categories, categoriesTitleHTML, categoryHTML);
                insertHTML("#main-content", categoriesViewHTML);
            }, false);
        }, false);
    }

    //using categories data and snippet html build categories view HTML to be inserted in to the page
    function buildCategoriesViewHTML(categories, categoriesTitleHTML, categoryHTML){
        var finalHTML=categoriesTitleHTML;
        finalHTML+="<section class='row'>";
        //loop over categories
        for(var i =0;i<categories.length; i++){
            //insert category value
            var html=categoryHTML;
            var name=""+categories[i].name;
            var short_name=categories[i].short_name;
            html = insertProperty(html,"name", name);
            html = insertProperty(html,"short_name",short_name);
            finalHTML+=html;
        }
        finalHTML+="</section>";
        return finalHTML;
    }

    //build html for the single category page based on the data from the server
    function buildAndShowMenuItemsHTML(categoryMenuItems){
        //load title snippet of menu items page
        $ajaxUtils.sendGetRequest(menuItemsTitleHtml, function(menuItemsTitleHtml){
            //retrieve single menu items snippet
            $ajaxUtils.sendGetRequest(menuItemHTML, function(menuItemHTML){
                var menuItemsViewHTML = buildMenuItemsViewHTML(categoryMenuItems, menuItemsTitleHtml, menuItemHTML);
                insertHTML("#main-content", menuItemsViewHTML);

            },false);
        },false);
    }
     //using category and menu item data and snippets html; build menu items view html to be inserted to the page.
     function buildMenuItemsViewHTML(categoryMenuItems,menuItemsTitleHtml, menuItemHTML){
        menuItemsTitleHtml = insertProperty(menuItemsTitleHtml, "name", categoryMenuItems.category.name);
        menuItemsTitleHtml = insertProperty(menuItemsTitleHtml, "special_instructions", categoryMenuItems.category.special_instructions);
        var finalHTML=menuItemsTitleHtml;
        finalHTML+="<section class = 'row'>";
        //loop over menu items
        var menuItems = categoryMenuItems.menu_items;
        var catShortName= categoryMenuItems.category.short_name;
        for(var i=0; i<menuItems.length;i++){
            //insert menu item values
            var html=menuItemsUrl;
            html = insertProperty(html, "short_name", menuItems[i].short_name);
            html = insertProperty(html,"catShortName", catShortName);
            html = insertItemPrice(html, "price_small", menuItems[i].price_small);
            html = insertItemPortionName(html,"small_portion_name", menuItems[i].small_portion_name);
            html = insertItemPrice(html, "price_large", menuItems[i].price_large);
            html = insertItemPortionName(html, "large_portion_name",menuItems[i].large_portion_name);
            html = insertProperty(html,"name", menuItems[i].name);
            html = insertProperty(html,"description",menuItems[i].description);

            //add clearfix after every second menu item
            if(i%2!=0){
                html+="<div class='clearfix visible-lg-block visible-md-block'></div>";
            }
            finalHTML+=html;
        }
        finalHTML+="</section>";
        return finalHTML;
    }

    //append price with '$' if price exists
     function insertItemPrice(html, pricePropName, PriceValue){
        //if not specified, replace with empty string
        if(!PriceValue){
            return insertProperty(html, pricePropName, "");
        }
        PriceValue = "$"+PriceValue.toFixed(2);
        html = insertProperty(html, pricePropName, PriceValue);
        return html;
     }
     //appends portion name in parens if it exists
     function insertItemPortionName(html, protionPropName, portionValue){
         //if not specified, return original string
         if(!portionValue){
             return insertProperty(html, protionPropName, "");
         }
     }
    global.$dc=dc;
})(window);
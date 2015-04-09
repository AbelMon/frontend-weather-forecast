// Javascript Code.
jQuery(document).ready(function($) {
    $(".view_weather").click(function () {
        var country = $("input[name=country]").val();
        var province = $("input[name=province]").val();
        country = country.toLowerCase();
        var temp_type = $("input[name=temperature]:checked").val();
        var code_country = "";

        /*fields full*/
        if (country != "" && province != "") {
            $.ajax({
            url: "countries.json", dataType: "json",
            success : function(parsed_json) {
                /*Get country code*/
                for (var i=0; i <= 242; i++) {
                    if (parsed_json[i]["name"].toLowerCase() === country) {
                        code_country = parsed_json[i]["code"]
                    };
                };

                if (code_country.length === 0) {
                    no_country();
                } else {
                    $.ajax({
                    url : "http://api.wunderground.com/api/0d95ff1db656d6bf/geolookup/conditions/q/"+code_country+"/"+province+".json",
                    dataType : "jsonp",
                    success : function(parsed_json) {
                        if (parsed_json["response"]["error"]) {
                            city_no_found();
                        } else {
                            var location = parsed_json['location']['city'];
                            var weather = parsed_json["current_observation"]["weather"];
                            var weather_icon = parsed_json["current_observation"]["icon_url"];
                            var wind = parsed_json["current_observation"]["wind_string"];

                            /*Type of temperature*/
                            if (temp_type === "Fahrenheit") {
                                var temp_f = parsed_json['current_observation']['temp_f'];
                                valid_search_fahr(weather_icon, temp_f, weather, wind, location);
                            } else {
                                var temp_c = parsed_json['current_observation']['temp_c'];
                                valid_search_celcius(weather_icon, temp_c, weather, wind, location);
                            };
                        };
                    }
                    });
                        };
                    }
                    });
        } else {
            empty_input();
        }
    });
});

var sad_face = "<img src='images/sad.png' alt='sad face'>";
var error_no_city = "<p class='info error'>Sorry, we have no information of this city.</p>";
var some_wrong = "<h2 class='title_search'>Something is wrong...</h2>";
var no_filled = "<h2 class='title_search'>Please fill out all fields.</h2>";
var country_no = "<p class='error'>I don't know this country, but you can search again.</p>";
var weather_title = "<h2 class='title_search'>Weather forecast</h2>";

var city_no_found = function() {
    if ($(".title_search").length === 0) {
        $(".modal-header").append(some_wrong);
        $(".icon").append(sad_face);
        $(".description").append(error_no_city);
    } else {
        $('.title_search').remove();
        $("img").remove();
        $(".error").remove();
        $(".modal-header").append(some_wrong);
        $(".icon").append(sad_face);
        $(".description").append(error_no_city);
    };
};

var empty_input = function() {
    if ($(".title_search").length === 0) {
        $(".modal-header").append(no_filled);
        $(".icon").append(sad_face);
        $(".description").append("<p class='error'>What do you want to search?</p>");
    } else {
        $('.title_search').remove();
        $("img").remove()
        $(".error").remove();
        $(".modal-header").append(no_filled);
        $(".icon").append(sad_face);
        $(".description").append("<p class='error'>What do you want to search?</p>");
    };
};

var no_country = function() {
    if ($(".title_search").length === 0) {
        $(".modal-header").append(some_wrong);
        $(".icon").append(sad_face);
        $(".description").append(country_no);
    } else {
        $('.title_search').remove();
        $('img').remove();
        $('.error').remove();
        $(".modal-header").append(some_wrong);
        $(".icon").append(sad_face);
        $(".description").append(country_no);
    };
};

var valid_search_fahr = function(icon, temperature, weather, wind, city) {
    if ($(".title_search").length === 0) {
        $(".modal-header").append("<h2 class='title_search'>Weather forecast : "+ city +".</h2>");
        $(".icon").append("<img src='" + icon + "' alt='icon description'>");
        $(".description").append("<p class='error'> <b>Current temperature : </b>" + temperature + "°F.</p>");
        $(".description").append("<p class='error'> <b>Weather : </b>" + weather + ".</p>");
        $(".description").append("<p class='error'> <b>Wind conditions : </b>" + wind + ".</p>");
    } else {
        $('.title_search').remove();
        $("img").remove();
        $(".error").remove();
        $(".modal-header").append("<h2 class='title_search'>Weather forecast : "+ city +".</h2>");
        $(".icon").append("<img src='" + icon + "' alt='icon description'>");
        $(".description").append("<p class='error'> <b>Current temperature : </b>" + temperature + "°F.</p>");
        $(".description").append("<p class='error'> <b>Weather : </b>" + weather + ".</p>");
        $(".description").append("<p class='error'> <b>Wind conditions : </b>" + wind + ".</p>");
    };
};

var valid_search_celcius = function(icon, temperature, weather, wind, city) {
    if ($(".title_search").length === 0) {
        $(".modal-header").append("<h2 class='title_search'>Weather forecast : "+ city +".</h2>");
        $(".icon").append("<img src='" + icon + "' alt='icon description'>");
        $(".description").append("<p class='error'> <b>Current temperature : </b>" + temperature + "°C.</p>");
        $(".description").append("<p class='error'> <b>Weather : </b>" + weather + ".</p>");
        $(".description").append("<p class='error'> <b>Wind conditions : </b>" + wind + ".</p>");
    } else {
        $('.title_search').remove();
        $("img").remove();
        $(".error").remove();
        $(".modal-header").append("<h2 class='title_search'>Weather forecast : "+ city +".</h2>");
        $(".icon").append("<img src='" + icon + "' alt='icon description'>");
        $(".description").append("<p class='error'> <b>Current temperature : </b>" + temperature + "°F.</p>");
        $(".description").append("<p class='error'> <b>Weather : </b>" + weather + ".</p>");
        $(".description").append("<p class='error'> <b>Wind conditions : </b>" + wind + ".</p>");
    };
};


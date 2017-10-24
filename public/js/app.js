$(function(){

  /* MAIN VARIABLES:: */
  var splittedDate = "";
  var userYear = 0;
  var userMonth = 0;
  var userDay = 0;
  var numberOfDaysToAdd = 0;
  var countryCode = "";
  var initialDate = "";
  var finalDate = "";
  var userHolidays = "";

  /* We create the first datapicker so users can enter its initial date:: */
  $("#inputInitialDate").datepicker({
    dateFormat: "yy-mm-dd"
  });

  $("#form-button").click(function(event){
    event.preventDefault();

    if ($("#inputInitialDate").val() != ''){
      if ($("#inputNumbers").val().length > 0){
        if ($("#inputCountryCode").val().length > 0){

          $("#calendar-container").css("width", "100%");
          $("#calendar-container").css("display", "inline-block");

          /* We initialize the main variables:: */
          splittedDate = $("#inputInitialDate").val().split("-")
          userYear = splittedDate[0];
          userMonth = splittedDate[1];
          userDay = splittedDate[2];

          /* We storage the user days and its country code:: */
          numberOfDaysToAdd = parseInt($("#inputNumbers").val(), 10);
          countryCode = $("#inputCountryCode").val();

          /* We calculate how many days will have the calendar:: */
          initialDate = new Date(userYear, userMonth - 1, userDay);
          initialDate.setDate(initialDate.getDate() + numberOfDaysToAdd);

          /*console.log(userMonth);
          console.log(userYear + "-" + userMonth + "-" + userDay);
          console.log(initialDate);*/

          /* We call the Holiday api and storage the dates we get from it:: */
          //var apiURL = "https://holidayapi.com/v1/holidays?key=a6fa68e0-b791-4176-a30d-3a02251d2260&country=" + countryCode + "&year="+ userYear +"&month="+ parseInt(userMonth, 10);
          var apiURL = "https://holidayapi.com/v1/holidays?key=356c36aa-07f5-4b05-ab69-b03d427dc2fa&country=" + countryCode + "&year="+ userYear +"&month="+ parseInt(userMonth, 10);
          var jqxhr = $.getJSON(apiURL, function(data){
            var holidays = new Array();
            $.each(data, function(key, val) {
              for (var i = 0; i < val.length; i++){
                holidays.push(val[i].date);
                localStorage.setItem("localHolidays", holidays);
              }
            });
          }).fail(function(){
            alert("The connection to the API failed!");
          });

          /* Localstorage with the holidays:: */
          userHolidays = localStorage.localHolidays.split(",");

          /* Finally, we create the output calendar, with the initial date, final date and the holidays:: */
          $('#datepicker').datepicker({
              dateFormat: 'mm-dd-yy',
              //showButtonPanel: true,
              showOn: "button",
              buttonImage: "images/calendar.gif",
              buttonImageOnly: true,
              minDate: new Date(userYear, userMonth - 1, userDay),
              maxDate: new Date(initialDate.getFullYear(), initialDate.getMonth(), initialDate.getDate()),
              inline: true,
              beforeShowDay: function(date){
                var day = date.getDay();
                var formattedDate = jQuery.datepicker.formatDate("yy-mm-dd", date);
                return [true, (userHolidays.indexOf(formattedDate)===-1) ? "": "markholiday"];
              }
          });

        }else{
          alert("Please enter the country code.")
        }
      }else{
        alert("Please enter the number of days.");
      }
    }else{
      alert("Please select an initial date.");
    }

  });

});

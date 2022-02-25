$(document).ready(function(){
   $('form').submit(function(e){
      e.preventDefault()
      let valueInput = $('#pokemon-input').val()
      
      $.ajax({
         url: "https://pokeapi.co/api/v2/pokemon/" + valueInput,
         success: function (response) {
            let name = response.name
            let image = response.sprites.front_shiny
            let weight = response.weight

            $('#poke-info').html(`
            <div class="text-center">
               <h3>${name}</h3>
               <img src="${image}">
               <h6>Peso: ${weight}</h6>
            </div>
            `)
            
            let estadisticas = []

            response.stats.forEach(element => {
               estadisticas.push({
                  label: element.stat.name,
                  y: element.base_stat,
               })
            });

            let config = {
               animationEnabled : true,
               title: {
                  text: "estadisticas"
               },
               axisY: {
                  title: "valor",
               },
               axisX: {
                  title: "estadisticas",
               },
               data: [
                  {
                     type: "column",
                     dataPoints: estadisticas
                  }
               ]
            }
            var chart = new CanvasJS.Chart("poke-stats", config)
            chart.render()
         }
      });
   })
})
tableData = data


        var tbody = d3.select("tbody");
        var row = tbody.append("tr");
        
        
        // Attach an event to listen for the form button
        
        
        // row.append("td").text(newGrade[i])
        // Actually, [i] will be the column-wise 2nd operator
        
        function react_to_button() {
        // Prevent the form from refreshing the page
            d3.event.preventDefault();
            var filtered_data = tableData;
            console.log("Your button is reacting");
            
            var state_input = d3.select("#state").property("value");
            
            console.log(state_input);
          
            console.log(filtered_data)
            if (state_input) {
                filtered_data = filtered_data.filter(temporary_row => temporary_row.state === state_input);
            }
            console.log(filtered_data);
            datapuller(filtered_data);
        };
        
        
        function datapuller(data) {
        
        // data.forEach(function(ufoReport) {
        //     console.log(ufoReport);
        //     var row = tbody.append("tr");
        //     Object.entries(ufoReport).forEach(function([key, value]) {
        //       console.log(key,value)
        //     })
        // });
        
        // First, clear out any existing data
            tbody.html("");
            console.log(data);
            data.forEach(function(ufoReport) {
            // console.log(ufoReport);
            var row = tbody.append("tr");
            Object.entries(ufoReport).forEach(function([key, value]) {
                // console.log(key, value);
                // Append a cell to the row for each value
                // in the weather report object
                var cell = tbody.append("td");
                cell.text(value);
            });
            });
        
        };
        
        console.log("Main Line");
        
        d3.selectAll("#filter-btn").on("click", react_to_button);
        
        
        datapuller(tableData);
        
        
        
        
        // function dateSelector(date) {
        //     return date.;
        //   }
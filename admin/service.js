
$(document).ready(function() {
    fetchServices();

    function fetchServices() {
        $.ajax({
            url: 'fetch_services.php', // Calls the PHP backend
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                console.log("Fetched Data:", response); // Debugging - Check if data is retrieved

                let tableBody = $('#servicesTableBody');
                tableBody.empty(); // Clear previous data

                if (response.length > 0) {
                    response.forEach(service => {
                        tableBody.append(`
                            <tr>
                                <td>${service.id}</td>
                                <td>${service.service_name.trim()}</td> <!-- Ensure no extra spaces -->
                                <td>${parseFloat(service.cost).toFixed(2)}</td>
                                <td>
                                    <a href="#" class="edit tooltip" data-tooltip="Edit"><ion-icon name="create"></ion-icon></a>
                                    <a href="#" class="trash tooltip" data-tooltip="Delete"><ion-icon name="trash"></ion-icon></a>
                                </td>
                            </tr>
                        `);
                    });
                } else {
                    tableBody.append(`<tr><td colspan="4">No services available</td></tr>`);
                }
            },
            error: function(xhr, status, error) {
                console.error("AJAX Error:", status, error); // Debugging AJAX errors
            }
        });
    }
});


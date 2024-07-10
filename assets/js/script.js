
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault();
        const id = document.getElementById("heroInput").value; //Id ingresado por el usuario
        fetch(
            "https://superheroapi.com/api.php/dc09fe791af15976a47c60a7a9502998/" + id
        )
            .then((response) => response.json())
            .then((data) => {
                const connections =
                    data.connections["group-affiliation"] || "No disponible";
                const publisher = data.biography.publisher || "No disponible";
                const occupation = data.work.occupation || "No disponible";
                const firstAppearance =
                    data.biography["first-appearance"] || "No disponible";
                const height =
                    data.appearance.height.join(", ") || "No disponible";
                const weight =
                    data.appearance.weight.join(", ") || "No disponible";
                const aliases =
                    data.biography.aliases.join(", ") || "No disponible";

                document.getElementById("heroInfo").innerHTML = `
                    <div class="row">
                        <div class="col-md-4 my-auto text-center">
                            <img id="heroImg" src="${data.image.url}" height="350px" alt="${data.name}" />
                        </div>
                        <div class="col-md-4">
                            <div class="card-body">
                                <h5 class="card-text"><b>NOMBRE:</b></h5>
                                <h4 class="card-title"><b>${data.name}</b></h4>
                                <p class="card-text"><b>CONEXIONES:</b> ${connections}</p>
                                <p class="card-text"><b>FECHA DE PUBLICACION:</b> ${publisher}</p>
                                <p class="card-text"><b>OCUPACION:</b> ${occupation}</p>
                                <p class="card-text"><b>PRIMERA APARICION:</b> ${firstAppearance}</p>
                                <p class="card-text"><b>ALTURA:</b> ${height}</p>
                                <p class="card-text"><b>PESO:</b> ${weight}</p>
                                <p class="card-text"><b>ALIAS:</b> ${aliases}</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div id="heroStats" style="height: 360px; width: 100%"></div>
                        </div>
                    </div>
                `;
                const stats = [
                    { y: data.powerstats.intelligence, label: "Inteligencia" },
                    { y: data.powerstats.strength, label: "Fuerza" },
                    { y: data.powerstats.speed, label: "Velocidad" },
                    { y: data.powerstats.durability, label: "Resistencia" },
                    { y: data.powerstats.power, label: "Poder" },
                    { y: data.powerstats.combat, label: "Combate" },
                ];

                const config = {
                    theme: "light1",
                    animationEnabled: true,
                    title: {
                        text: "Estadísticas de Poder para " + data.name,
                    },
                    data: [
                        {
                            type: "pie",
                            startAngle: 25,
                            toolTipContent: "<b>{label}</b>: {y}",
                            showInLegend: true,
                            legendText: "{label}",
                            indexLabelFontSize: 16,
                            indexLabel: "{label}  ({y})",
                            dataPoints: stats,
                        },
                    ],
                };
                const chart = new CanvasJS.Chart("heroStats", config);
                chart.render();
            })
            .catch((error) => {
                alert("Ocurrió un error:", error);
            });
    });
});

const ApiKey = "3cfa46a813d54de3b4282f87b146530b";
const baseUrl = "https://api.football-data.org/v2/";
const leagueId = "2021";
const baseEndPoin = `${baseUrl}competitions/${leagueId}`;
const teamEndPoin = `${baseUrl}competitions/${leagueId}/teams`;
const standingEndPoin = `${baseUrl}competitions/${leagueId}/standings`;
const matchEndPoin = `${baseUrl}competitions/${leagueId}/matches`;

const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");
const fetchHeader = {
    headers: {
        'X-Auth-Token': ApiKey
    }
};

function getListTeams() {
    title.innerHTML = "Daftar Tim Liga Primer Inggris"
    fetch(teamEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.teams);
            let teams = "";
            resJson.teams.forEach(team => {
                teams += `
                <li class="collection-item avatar">
                    <img src="${team.crestUrl}" alt="" class="circle">
                    <span class="title">${team.name}</span>
                    <p>Berdiri: ${team.founded} <br>
                       Markas: ${team.venue}
                    </p>
                    <a href="#!" data-id="${team.id}" class="secondary-content"><i class="material-icons" data-id="${team.id}">info</i></a>
                </li>
                `
            });
            contents.innerHTML = '<ul class="collection">' + teams + '</ul>'
            
            const detail = document.querySelectorAll('.secondary-content');
            detail.forEach(btn=>{
                btn.onclick = (event)=>{
                    showTeamInfo(event.target.dataset.id);
                }
            })
        }).catch(err => {
            console.error(err);
        })
}

function showTeamInfo(id)
{
    let url = baseUrl + "teams/" + id;

    fetch(url, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson);
   
            title.innerHTML = "Detail Tim " + resJson.name

            let competition = "";
            let anggota = "";
            let i = 1;
            resJson.activeCompetitions.forEach(competitions => {
                competition += `
                <tr>
                    <td style="padding-left:20px;">${i}.</td>
                    <td>${competitions.name}</td>
                    <td>${competitions.area.name}</td>
                    <td>${competitions.plan}</td>
                </tr>
                `;
                i++;
            });
            resJson.squad.forEach(squads => {
                anggota += `
                <div class="col s12 m6">
                        <div class="card light-blue lighten-4">
                            <div class="card-content black-text">
                                <span class="card-title"><h5>${squads.name}</h5></span>
                                <table>
                                    <tr>
                                        <td>ID</td>
                                        <td>:</td>
                                        <td>${squads.id}</td>
                                    </tr>
                                    <tr>
                                        <td>Position</td>
                                        <td>:</td>
                                        <td>${squads.position}</td>
                                    </tr>
                                    <tr>
                                        <td>Tempat, Tanggal Lahir</td>
                                        <td>:</td>
                                        <td>${squads.countryOfBirth}, ${squads.dateOfBirth.substr(0,10)}</td>
                                    </tr>
                                    <tr>
                                        <td>Kewarganegaraan</td>
                                        <td>:</td>
                                        <td>${squads.nationality}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                </div>
                `;
                i++;
            });
            contents.innerHTML = `
            <div class="row">
                <div class="col s12">
                    <br><center><img src="${resJson.crestUrl}"></center><br>
                    <h4>Deskripsi</h4>
                    <table class="striped">
                        <tr>
                            <td>ID</td>
                            <td>:</td>
                            <td>${resJson.id}</td>
                        </tr
                        <tr>
                            <td>Nama</td>
                            <td>:</td>
                            <td>${resJson.name}</td>
                        </tr>
                        <tr>
                            <td>Tahun dibentuk</td>
                            <td>:</td>
                            <td>${resJson.founded}</td>
                        </tr>
                        <tr>
                            <td>Area</td>
                            <td>:</td>
                            <td>${resJson.area.name}</td>
                        </tr>
                        <tr>
                            <td>Alamat</td>
                            <td>:</td>
                            <td>${resJson.address}</td>
                        </tr>
                        <tr>
                            <td>No. Telepon</td>
                            <td>:</td>
                            <td>${resJson.phone}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>:</td>
                            <td>${resJson.email}</td>
                        </tr>
                        <tr>
                            <td>Website</td>
                            <td>:</td>
                            <td>${resJson.website}</td>
                        </tr>
                        <tr>
                            <td>Venue</td>
                            <td>:</td>
                            <td>${resJson.venue}</td>
                        </tr>
                        <tr>
                            <td>Warna</td>
                            <td>:</td>
                            <td>${resJson.clubColors}</td>
                        </tr>
                    </table>
                </div>
                <div class="col s12">
                    <h4>Kometisi Aktif</h4>
                    <table class="centered">
                        <thead>
                            <th>No.</th>
                            <th>Kompetisi</th>
                            <th>Area</th>
                            <th>Plan</th>
                        </thead>
                        <tbody>
                            ${competition}
                        </tbody>
                    </table>
                </div>
                <div class="col s12">
                    <h4>Squad</h4>
                    <div class="row">
                        ${anggota}
                    </div>
                </div>
            </div>
            `;
        }).catch(err => {
            console.error(err);
        })
}

function getListStandings() {
    title.innerHTML = "Klasemen Sementara Liga Primer Inggris";
    fetch(standingEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.standings[0]);
            let teams = "";
            let i = 1;
            resJson.standings[0].table.forEach(team => {
                teams += `
                <tr>
                    <td style="padding-left:20px;">${i}.</td>
                    <td><img src="${team.team.crestUrl}" alt="${team.team.name}" width="30px"></td>
                    <td>${team.team.name}</td>
                    <td>${team.playedGames}</td>
                    <td>${team.won}</td>
                    <td>${team.draw}</td>
                    <td>${team.lost}</td>
                    <td>${team.points}</td>
                </tr>
                `;
                i++;

            });
            contents.innerHTML = `
                <div class="card">
                    <table class="stripped responsive-table">
                        <thead>
                            <th></th>
                            <th></th>
                            <th>Nama Tim</th>
                            <th>PG</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>P</th>
                        </thead>
                        <tbody>
                            ${teams}
                        </tbody>
                    </table>
                </div>
            `;
        }).catch(err => {
            console.error(err);
        })
}

function getListMatches() {
    title.innerHTML = "Jadwal Pertandingan Liga Primer Inggris";
    fetch(matchEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.matches);
            let matchs = "";
            let i = 1;
            resJson.matches.forEach(match => {
                let d = new Date(match.utcDate).toLocaleDateString("id");
                let scoreHomeTeam = (match.score.fullTime.homeTeam == null ? 0 : match.score.fullTime.homeTeam);
                let scoreAwayTeam = (match.score.fullTime.awayTeam == null ? 0 : match.score.fullTime.awayTeam);
                matchs += `
                <tr>
                    <td style="padding-left:20px;">${i}.</td>
                    <td>${match.homeTeam.name} vs ${match.awayTeam.name}</td>
                    <td>${d}</td>
                    <td>${scoreHomeTeam}:${scoreAwayTeam}</td>
                </tr>
                `;
                i++;

            });
            contents.innerHTML = `
                <div class="card">
                    <table class="stripped responsive-table">
                        <thead>
                            <th></th>
                            <th>Peserta</th>
                            <th>Tanggal</th>
                            <th>Skor Akhir</th>
                        </thead>
                        <tbody>
                            ${matchs}
                        </tbody>
                    </table>
                </div>
            `;
        }).catch(err => {
            console.error(err);
        })
}

function loadPage(page) {
    switch (page) {
        case "teams":
            getListTeams();
            break;
        case "standings":
            getListStandings();
            break;
        case "matches":
            getListMatches();
            break;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "teams";
    loadPage(page);
});
function selectSpecialSong(songs, songName) {
  const specialSong = songs.find(song => song.name === songName);

  if (specialSong) {
    return specialSong;
  }

  return null;
}

function getSongOfTheDay(songs) {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;

  if (day === 15 && month === 9) {
    let song = selectSpecialSong(songs, "Undertale");
    
    if (song) {
      return {
        song: song,
        message: "It is Undertale's Birthday! <br> (Undertale)" 
      };
    }
  }
  
  if (day === 14 && month === 2) {
    let song = selectSpecialSong(songs, "Pushing Buddies");
    
    if (song) {
      return {
        song: song,
        message: "Happy Valentine's day! <br> (Pushing Buddies)" 
      };
    }
  }

  if (day === 31 && month === 10) {
    let song = selectSpecialSong(songs, "With Hope Crossed On Our Hearts");
    
    if (song) {
      return {
        song: song,
        message: "It is Deltarune's Birthday! <br> (With Hope Crossed On Our Hearts)" 
      };
    }
  }

  if (day === 25 && month === 12) {
    let song = selectSpecialSong(songs, "Gingerbread House");
    
    if (song) {
      return {
        song: song,
        message: "Merry Christimas! (Gingerbread House)" 
      };
    }
  }

  if (day === 1 && month === 4) {
    let song = selectSpecialSong(songs, "Megalovania");
    
    if (song) {
      return {
        song: song,
        message: "April Fools! (Megalovania)" 
      };
    }
  }

  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diffTime = now - startOfYear;
  const dayOfYear = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  const index = dayOfYear % songs.length;
  
  return { 
    song: songs[index], 
    message: null 
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const box = document.getElementById("reveal-box");
  const songNameElement = document.getElementById("song-name");

  fetch("files/songs.json")
    .then(response => {
      if (!response.ok) throw new Error("Damn the JSON did not load :(");
      return response.json();
    })
    .then(songs => {
      const selection = getSongOfTheDay(songs);
      const song = selection.song;

      console.log("Song of Today:", song.name, "(Path:", song.path, ")");
      
      let audio = null;

      box.addEventListener("click", () => {
        audio = new Audio(song.path);
        audio.loop = true;
        audio.crossOrigin = "anonymous";

        audio
          .play()
          .then(() => {
            box.classList.remove("hidden");
            box.classList.add("hidden");
            
            if (selection.message) {
              songNameElement.innerHTML = selection.message;
            } else {
              songNameElement.innerHTML = song.name;
            }

            songNameElement.classList.add("visible");
          })
          .catch(err => {
            console.error("Failed to play erm the audio: ", err);
          });
      });
    })
    .catch(err => {
      console.error("Failed to load the errrm songs: ", err);
    });
});
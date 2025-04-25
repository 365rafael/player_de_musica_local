const fileInput = document.getElementById('fileInput');
const audio = document.getElementById('audio');
const playlist = document.getElementById('playlist');

let trackList = [];
let currentTrackIndex = 0;

fileInput.addEventListener('change', () => {
  playlist.innerHTML = "";
  trackList = Array.from(fileInput.files).map(file => ({
    file,
    url: URL.createObjectURL(file)
  }));

  trackList.forEach((trackObj, index) => {
    const li = document.createElement('li');
    li.textContent = trackObj.file.name;
    li.addEventListener('click', () => playTrack(index));
    playlist.appendChild(li);
  });

  if (trackList.length > 0) {
    playTrack(0);
  }
});

audio.addEventListener('ended', () => {
  if (currentTrackIndex < trackList.length - 1) {
    playTrack(currentTrackIndex + 1);
  }
});

function playTrack(index) {
  const items = playlist.querySelectorAll('li');
  items.forEach(item => item.classList.remove('active'));
  items[index].classList.add('active');
  currentTrackIndex = index;
  audio.src = trackList[index].url;
  audio.play();
}
const writings = [
  {
    title: "Confundido",
    date: "24 de agosto de 2025",
    content:
      "No sé pasó, o quizás si. No fui suficiente para ti? No sé que pude haber hecho mejor. Pensé que estaría contigo por mucho más tiempo pero la vida tiene sus vueltas, de un día para otro me hiciste la persona más feliz y para otro solo fue otra decepción más. No sé si por desgracia ya no tengo sueños, pero sé que estarías en todos ellos. Me ha sido difícil dejar de pensarte, hago cosas creyendo que estás ahí conmigo, hago cosas solo para sentirte cerca aunque ya no estés. Mi mente entiende que ya no eres para mí pero pase lo que pase me hiciste sentir que nunca me habían amado como tú lo hiciste, así haya sido por un ratito.",
    song: {
      title: "Cherry Waves",
      artist: "Deftones",
      file: "songs/Cherry Waves.mp3",
    },
  },
  {
    title: "Estás en mí",
    date: "26 de agosto de 2025",
    content:
      "No sé si odiarte pero estas en mis canciones favoritas, pensarte mientras escucho cada una de ellas es lindo hasta que llego a la realidad. La verdad es que no puedo odiarte, me hiciste creer en tantas cosas que no pensé que existieran en este mundo, no me puedo ni imaginar lo que hubiera sido de nosotros en un mundo paralelo donde estuviéramos juntos. Quizás el final hubiera sido el mismo, o tal vez no. Mi feed está lleno de cosas que solo me recuerdan a ti. Me puse un letrero para no volver a buscarte, se hace difícil para mí olvidarte o al menos superarte; se me hace ridículo sentir todo esto por alguien que apenas conocí, solo sentí haberte conocido en otra vida; no creo en esas cosas pero solo me pareció loco conectar de la forma en la que sentí que fue, quizás todo esto solo está en mi mente. Pensaba no escribir más de 2 veces sobre ti, pero soy incapaz de procesar todo esto sin escribir mientras escucho tu canción favorita, K?",
    song: {
      title: "K.",
      artist: "Cigarettes After Sex",
      file: "songs/K. - Cigarettes After Sex.mp3",
    },
  },
];

let currentIndex = 0;
let isPlaying = false;
let currentAudio = null;

// Variables para el swipe
let touchStartX = 0;
let touchEndX = 0;
let isSwiping = false;

// Elementos del DOM
const titleEl = document.getElementById("entry-title");
const dateEl = document.getElementById("entry-date");
const contentEl = document.getElementById("entry-content");
const songTitleEl = document.getElementById("song-title");
const songArtistEl = document.getElementById("song-artist");
const playPauseBtn = document.getElementById("play-pause");
const playIcon = document.getElementById("play-icon");
const volumeSlider = document.getElementById("volume");
const progressSlider = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const totalTimeEl = document.getElementById("total-time");
const container = document.querySelector(".container");
const card = document.querySelector(".card");
const swipeIndicator = document.getElementById("swipe-indicator");

// Función para formatear tiempo en MM:SS
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

// Función para mostrar indicador de swipe
function showSwipeIndicator() {
  if (isTouchDevice() && swipeIndicator) {
    swipeIndicator.classList.remove("hide");
    swipeIndicator.classList.add("show");

    // Ocultar después de 4 segundos con animación
    setTimeout(() => {
      swipeIndicator.classList.remove("show");
      swipeIndicator.classList.add("hide");
    }, 4000);
  }
}

// Función para detectar si es un dispositivo táctil
function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

// Función para detectar si es un dispositivo móvil
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

// Función para manejar el swipe
function handleSwipe() {
  const swipeThreshold = 50; // Mínimo de píxeles para considerar un swipe
  const swipeDistance = touchEndX - touchStartX;

  if (Math.abs(swipeDistance) > swipeThreshold) {
    if (swipeDistance > 0) {
      // Swipe hacia la derecha - entrada anterior
      currentIndex = (currentIndex - 1 + writings.length) % writings.length;
    } else {
      // Swipe hacia la izquierda - entrada siguiente
      currentIndex = (currentIndex + 1) % writings.length;
    }
    renderEntry(currentIndex);
  }
}

// Event listeners para touch/swipe
function setupSwipeEvents() {
  if (!isTouchDevice()) return;

  // Mostrar indicador de swipe al cargar
  setTimeout(showSwipeIndicator, 1000);

  // Touch start
  container.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
      isSwiping = true;

      // Añadir clase para feedback visual
      if (card) {
        card.classList.add("swiping");
      }
    },
    { passive: true }
  );

  // Touch move
  container.addEventListener(
    "touchmove",
    (e) => {
      if (!isSwiping) return;

      // Prevenir scroll vertical durante el swipe
      const touchY = e.changedTouches[0].screenY;
      const touchX = e.changedTouches[0].screenX;
      const deltaX = Math.abs(touchX - touchStartX);
      const deltaY = Math.abs(touchY - e.changedTouches[0].screenY);

      // Si el movimiento horizontal es mayor que el vertical, prevenir scroll
      if (deltaX > deltaY && deltaX > 10) {
        e.preventDefault();
      }
    },
    { passive: false }
  );

  // Touch end
  container.addEventListener(
    "touchend",
    (e) => {
      if (!isSwiping) return;

      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      isSwiping = false;

      // Remover clase de feedback visual
      if (card) {
        card.classList.remove("swiping");
      }
    },
    { passive: true }
  );

  // Touch cancel
  container.addEventListener(
    "touchcancel",
    () => {
      isSwiping = false;

      // Remover clase de feedback visual
      if (card) {
        card.classList.remove("swiping");
      }
    },
    { passive: true }
  );
}

// Función para configurar la interfaz según el dispositivo
function setupDeviceInterface() {
  const sideNavigation = document.querySelector(".side-navigation");

  if (isTouchDevice()) {
    // Dispositivo táctil: ocultar botones laterales, mostrar indicador de swipe
    if (sideNavigation) {
      sideNavigation.style.display = "none";
    }
    if (swipeIndicator) {
      swipeIndicator.style.display = "block";
    }
  } else {
    // Dispositivo no táctil: mostrar botones laterales, ocultar indicador de swipe
    if (sideNavigation) {
      sideNavigation.style.display = "block";
    }
    if (swipeIndicator) {
      swipeIndicator.style.display = "none";
    }
  }
}

// Función para actualizar el botón de play/pause
function updatePlayButton() {
  if (isPlaying) {
    playIcon.textContent = "⏸";
    playPauseBtn.classList.add("playing");
    playPauseBtn.setAttribute("aria-label", "Pausar música");
    playPauseBtn.setAttribute("aria-pressed", "true");
  } else {
    playIcon.textContent = "▶";
    playPauseBtn.classList.remove("playing");
    playPauseBtn.setAttribute("aria-label", "Reproducir música");
    playPauseBtn.setAttribute("aria-pressed", "false");
  }
}

// Función para actualizar atributos ARIA del progreso
function updateProgressAria() {
  if (currentAudio && !isNaN(currentAudio.duration)) {
    const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
    progressSlider.setAttribute("aria-valuenow", Math.round(progress));
    progressSlider.setAttribute(
      "aria-valuetext",
      `${formatTime(currentAudio.currentTime)} de ${formatTime(
        currentAudio.duration
      )}`
    );
  }
}

// Función para actualizar atributos ARIA del volumen
function updateVolumeAria() {
  const volume = volumeSlider.value;
  volumeSlider.setAttribute("aria-valuenow", volume);
  volumeSlider.setAttribute("aria-valuetext", `Volumen ${volume}%`);
}

// Función para cargar y reproducir música
function loadAndPlayMusic(song) {
  // Detener música actual si está sonando
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }

  // Crear nuevo elemento de audio
  currentAudio = new Audio();
  currentAudio.volume = volumeSlider.value / 100;
  currentAudio.preload = "metadata"; // Precargar solo metadatos para mejor rendimiento

  // Configurar el src después de crear el elemento para mejor compatibilidad
  currentAudio.src = song.file;

  // Configurar eventos del audio
  currentAudio.addEventListener("loadedmetadata", () => {
    if (!isNaN(currentAudio.duration) && currentAudio.duration > 0) {
      totalTimeEl.textContent = formatTime(currentAudio.duration);
      progressSlider.max = currentAudio.duration;
      updateProgressAria();
    } else {
      totalTimeEl.textContent = "0:00";
      progressSlider.max = 100;
    }
  });

  currentAudio.addEventListener("timeupdate", () => {
    if (!isNaN(currentAudio.duration) && currentAudio.duration > 0) {
      currentTimeEl.textContent = formatTime(currentAudio.currentTime);
      progressSlider.value = currentAudio.currentTime;
      updateProgressAria();
    }
  });

  currentAudio.addEventListener("ended", () => {
    isPlaying = false;
    updatePlayButton();
    progressSlider.value = 0;
    currentTimeEl.textContent = "0:00";
    updateProgressAria();
  });

  currentAudio.addEventListener("error", (e) => {
    songTitleEl.textContent = "Error cargando música";
    songArtistEl.textContent = "Verifica el archivo de audio";
    isPlaying = false;
    updatePlayButton();
  });

  // Intentar reproducir
  const playPromise = currentAudio.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        isPlaying = true;
        updatePlayButton();
      })
      .catch((error) => {
        songTitleEl.textContent = "No se puede reproducir";
        songArtistEl.textContent = "Haz clic para intentar";
        isPlaying = false;
        updatePlayButton();
      });
  }
}

// Función para renderizar entrada
function renderEntry(index) {
  const entry = writings[index];
  titleEl.textContent = entry.title;
  dateEl.textContent = entry.date;
  contentEl.textContent = entry.content;

  // Actualizar información de la música
  if (entry.song) {
    songTitleEl.textContent = entry.song.title;
    songArtistEl.textContent = entry.song.artist;
  } else {
    songTitleEl.textContent = "Sin música";
    songArtistEl.textContent = "Esta entrada no tiene música";
  }

  // Detener música actual al cambiar de entrada
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
    isPlaying = false;
    updatePlayButton();
  }

  // Resetear barra de progreso
  progressSlider.value = 0;
  currentTimeEl.textContent = "0:00";
  totalTimeEl.textContent = "0:00";
  updateProgressAria();
}

// Event listeners para navegación
document.getElementById("prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + writings.length) % writings.length;
  renderEntry(currentIndex);
});

document.getElementById("next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % writings.length;
  renderEntry(currentIndex);
});

// Event listener para play/pause
playPauseBtn.addEventListener("click", () => {
  const currentEntry = writings[currentIndex];

  if (!currentEntry.song) {
    alert("Esta entrada no tiene música asociada");
    return;
  }

  if (isPlaying) {
    // Pausar
    if (currentAudio) {
      currentAudio.pause();
    }
    isPlaying = false;
  } else {
    // Reproducir
    if (currentAudio) {
      currentAudio.play();
    } else {
      loadAndPlayMusic(currentEntry.song);
    }
    isPlaying = true;
  }

  updatePlayButton();
});

// Event listener para volumen
volumeSlider.addEventListener("input", (e) => {
  const volume = e.target.value / 100;
  if (currentAudio) {
    currentAudio.volume = volume;
  }
  updateVolumeAria();
});

// Event listener para barra de progreso
progressSlider.addEventListener("input", (e) => {
  if (currentAudio && !isNaN(currentAudio.duration)) {
    const newTime = e.target.value;
    currentAudio.currentTime = newTime;
    currentTimeEl.textContent = formatTime(newTime);
    updateProgressAria();
  }
});

// Event listeners para teclado
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    currentIndex = (currentIndex - 1 + writings.length) % writings.length;
    renderEntry(currentIndex);
  } else if (e.key === "ArrowRight") {
    currentIndex = (currentIndex + 1) % writings.length;
    renderEntry(currentIndex);
  } else if (e.key === " " || e.key === "Spacebar") {
    e.preventDefault();
    playPauseBtn.click();
  }
});

// Inicializar
renderEntry(currentIndex);
updateVolumeAria();
setupSwipeEvents();
setupDeviceInterface();

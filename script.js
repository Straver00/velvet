const writings = [
  {
    title: "Confundido",
    date: "24 de agosto de 2025",
    content: "No sé pasó, o quizás si. No fui suficiente para ti? No sé que pude haber hecho mejor. Pensé que estaría contigo por mucho más tiempo pero la vida tiene sus vueltas, de un día para otro me hiciste la persona más feliz y para otro solo fue otra decepción más. No sé si por desgracia ya no tengo sueños, pero sé que estarías en todos ellos. Me ha sido difícil dejar de pensarte, hago cosas creyendo que estás ahí conmigo, hago cosas solo para sentirte cerca aunque ya no estés. Mi mente entiende que ya no eres para mí pero pase lo que pase me hiciste sentir que nunca me habían amado como tú lo hiciste, así haya sido por un ratito."
  },
  {
    title: "Estás en mí",
    date: "26 de agosto de 2025",
    content: "No sé si odiarte pero estas en mis canciones favoritas, pensarte mientras escucho cada una de ellas es lindo hasta que llego a la realidad. La verdad es que no puedo odiarte, me hiciste creer en tantas cosas que no pensé que existieran en este mundo, no me puedo ni imaginar lo que hubiera sido de nosotros en un mundo paralelo donde estuviéramos juntos. Quizás el final hubiera sido el mismo, o tal vez no. Mi feed está lleno de cosas que solo me recuerdan a ti. Me puse un letrero para no volver a buscarte, se hace difícil para mí olvidarte o al menos superarte; se me hace ridículo sentir todo esto por alguien que apenas conocí, solo sentí haberte conocido en otra vida; no creo en esas cosas pero solo me pareció loco conectar de la forma en la que sentí que fue, quizás todo esto solo está en mi mente. Pensaba no escribir más de 2 veces sobre ti, pero soy incapaz de procesar todo esto sin escribir mientras escucho tu canción favorita, K?"
  }
];

let currentIndex = 0;

const titleEl = document.getElementById('entry-title');
const dateEl = document.getElementById('entry-date');
const contentEl = document.getElementById('entry-content');

function renderEntry(index) {
  const entry = writings[index];
  titleEl.textContent = entry.title;
  dateEl.textContent = entry.date;
  contentEl.textContent = entry.content;
}

document.getElementById('prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + writings.length) % writings.length;
  renderEntry(currentIndex);
});

document.getElementById('next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % writings.length;
  renderEntry(currentIndex);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    currentIndex = (currentIndex - 1 + writings.length) % writings.length;
    renderEntry(currentIndex);
  } else if (e.key === 'ArrowRight') {
    currentIndex = (currentIndex + 1) % writings.length;
    renderEntry(currentIndex);
  }
});

renderEntry(currentIndex);
